import { HttpTypes } from "@medusajs/types"
import { NextRequest, NextResponse } from "next/server"

import {
  DEFAULT_COUNTRY_CODE,
  DEFAULT_LANGUAGE_CODE,
  DEFAULT_LOCALE_CODE,
  buildLocale,
  isValidLocale,
} from "@i18n/config"

const BACKEND_URL = process.env.MEDUSA_BACKEND_URL
const PUBLISHABLE_API_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
const DEFAULT_REGION = process.env.NEXT_PUBLIC_DEFAULT_REGION || DEFAULT_COUNTRY_CODE

const regionMapCache = {
  regionMap: new Map<string, HttpTypes.StoreRegion>(),
  regionMapUpdated: Date.now(),
}

async function getRegionMap(cacheId: string) {
  const { regionMap, regionMapUpdated } = regionMapCache

  if (!BACKEND_URL) {
    throw new Error(
      "Middleware.ts: Error fetching regions. Did you set up regions in your Medusa Admin and define a MEDUSA_BACKEND_URL environment variable? Note that the variable is no longer named NEXT_PUBLIC_MEDUSA_BACKEND_URL."
    )
  }

  if (
    !regionMap.keys().next().value ||
    regionMapUpdated < Date.now() - 3600 * 1000
  ) {
    // Fetch regions from Medusa. We can't use the JS client here because middleware is running on Edge and the client needs a Node environment.
    const { regions } = await fetch(`${BACKEND_URL}/store/regions`, {
      headers: {
        "x-publishable-api-key": PUBLISHABLE_API_KEY!,
      },
      next: {
        revalidate: 3600,
        tags: [`regions-${cacheId}`],
      },
      cache: "force-cache",
    }).then(async (response) => {
      const json = await response.json()

      if (!response.ok) {
        throw new Error(json.message)
      }

      return json
    })

    if (!regions?.length) {
      throw new Error(
        "No regions found. Please set up regions in your Medusa Admin."
      )
    }

    // Create a map of country codes to regions.
    regions.forEach((region: HttpTypes.StoreRegion) => {
      region.countries?.forEach((c) => {
        regionMapCache.regionMap.set(c.iso_2 ?? "", region)
      })
    })

    regionMapCache.regionMapUpdated = Date.now()
  }

  return regionMapCache.regionMap
}

/**
 * Fetches regions from Medusa and sets the region cookie.
 * @param request
 * @param response
 */
async function getCountryCode(
  request: NextRequest,
  regionMap: Map<string, HttpTypes.StoreRegion | number>
) {
  try {
    let countryCode

    const vercelCountryCode = request.headers
      .get("x-vercel-ip-country")
      ?.toLowerCase()

    if (vercelCountryCode && regionMap.has(vercelCountryCode)) {
      countryCode = vercelCountryCode
    } else if (regionMap.has(DEFAULT_REGION)) {
      countryCode = DEFAULT_REGION
    } else if (regionMap.keys().next().value) {
      countryCode = regionMap.keys().next().value
    }

    return countryCode
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(
        "Middleware.ts: Error getting the country code. Did you set up regions in your Medusa Admin and define a MEDUSA_BACKEND_URL environment variable? Note that the variable is no longer named NEXT_PUBLIC_MEDUSA_BACKEND_URL."
      )
    }
  }
}

/**
 * Resolves the BCP 47 locale. Priority:
 * 1. Valid locale already in the URL
 * 2. Valid _medusa_locale cookie
 * 3. Default locale built from the visitor's region
 */
function resolveLocale(
  urlLocale: string | undefined,
  localeCookie: string | undefined,
  countryCode: string | undefined
): string {
  if (isValidLocale(urlLocale)) {
    return urlLocale!
  }
  if (isValidLocale(localeCookie)) {
    return localeCookie!
  }
  return buildLocale(DEFAULT_LANGUAGE_CODE, countryCode ?? DEFAULT_COUNTRY_CODE)
}

/**
 * Middleware to handle locale (BCP 47) selection.
 * URL scheme: /{locale}/... where locale drives both language and Medusa region (currency).
 */
export async function middleware(request: NextRequest) {
  let redirectUrl = request.nextUrl.href

  let response = NextResponse.redirect(redirectUrl, 307)

  let cacheIdCookie = request.cookies.get("_medusa_cache_id")

  let cacheId = cacheIdCookie?.value || crypto.randomUUID()

  const regionMap = await getRegionMap(cacheId)

  const countryCode = regionMap && (await getCountryCode(request, regionMap))

  const segments = request.nextUrl.pathname.split("/")
  const urlLocale = segments[1]

  // static asset passthrough
  if (request.nextUrl.pathname.includes(".")) {
    return NextResponse.next()
  }

  const resolvedLocale = resolveLocale(
    urlLocale,
    request.cookies.get("_medusa_locale")?.value,
    countryCode
  )

  const rest =
    segments.length > 2 ? "/" + segments.slice(2).join("/") : ""
  const queryString = request.nextUrl.search ? request.nextUrl.search : ""

  // URL is canonical: /{locale}/...
  if (isValidLocale(urlLocale)) {
    const localeCookie = request.cookies.get("_medusa_locale")?.value

    response = NextResponse.next()

    if (!cacheIdCookie) {
      response.cookies.set("_medusa_cache_id", cacheId, {
        maxAge: 60 * 60 * 24,
      })
    }
    if (localeCookie !== urlLocale) {
      response.cookies.set("_medusa_locale", urlLocale!, {
        maxAge: 60 * 60 * 24 * 365,
        httpOnly: false,
        sameSite: "strict",
      })
    }
    return response
  }

  // Needs redirect: build canonical URL
  if (countryCode) {
    const targetPath = `/${resolvedLocale}${rest}`
    redirectUrl = `${request.nextUrl.origin}${targetPath}${queryString}`
    response = NextResponse.redirect(`${redirectUrl}`, 307)
    response.cookies.set("_medusa_cache_id", cacheId, {
      maxAge: 60 * 60 * 24,
    })
    response.cookies.set("_medusa_locale", resolvedLocale, {
      maxAge: 60 * 60 * 24 * 365,
      httpOnly: false,
      sameSite: "strict",
    })
  } else {
    // Handle case where no valid country code exists (empty regions)
    return new NextResponse(
      "No valid regions configured. Please set up regions with countries in your Medusa Admin.",
      { status: 500 }
    )
  }

  return response
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|assets|png|svg|jpg|jpeg|gif|webp).*)",
  ],
}