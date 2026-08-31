import { Metadata } from "next"

import CategoryGrid from "@modules/home/components/category-grid"
import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import Marquee from "@modules/home/components/marquee"
import Newsletter from "@modules/home/components/newsletter"
import PromoBanners from "@modules/home/components/promo-banners"
import Story from "@modules/home/components/story"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { getT } from "@i18n/get-t"

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const params = await props.params
  const { t } = await getT(params.locale)

  const title = t("metadata.homeTitle")
  const description = t("metadata.homeDesc")

  return {
    title,
    description,
    keywords: ["CHICYA", "fashion", "clothing", "streetwear", "sweatshirts", "t-shirts"],
    openGraph: {
      title,
      description,
      type: "website",
    },
  }
}

export default async function Home(props: {
  params: Promise<{ countryCode: string; locale: string }>
}) {
  const params = await props.params

  const { countryCode, locale } = params

  const { t } = await getT(locale)

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "OnlineStore",
    name: t("common.brand"),
    slogan: t("common.tagline"),
    url: "https://www.chicya.com",
    logo: "https://assets.chicya.com/hero-cream-01M1BG6FHH5CQX13956ARDB5SR.jpg",
    description: t("metadata.homeDesc"),
    sameAs: [],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <Hero locale={locale} />
      <Marquee locale={locale} />
      <CategoryGrid locale={locale} />
      <PromoBanners locale={locale} />
      <div className="py-4">
        <FeaturedProducts
          countryCode={countryCode}
          locale={locale}
          region={region}
        />
      </div>
      <Story locale={locale} />
      <Newsletter />
    </>
  )
}