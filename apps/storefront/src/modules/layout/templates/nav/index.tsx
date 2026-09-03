import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { getT } from "@i18n/get-t"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import LocaleSwitcher from "@modules/layout/components/locale-switcher"
import CountrySwitcher from "@modules/layout/components/country-switcher"

export default async function Nav({ locale }: { locale: string }) {
  const { t } = await getT(locale)
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-16 mx-auto border-b duration-200 bg-white border-ui-border-base">
        <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full">
              <SideMenu regions={regions} locales={locales} currentLocale={currentLocale} />
            </div>
          </div>

          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase tracking-[0.2em] text-chicya-gold"
              data-testid="nav-store-link"
            >
              {t("common.brand")}
            </LocalizedClientLink>
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              <LocalizedClientLink
                className="hover:text-ui-fg-base uppercase tracking-[0.2em] text-xs"
                href="/store"
                data-testid="nav-store-link"
              >
                {t("nav.store")}
              </LocalizedClientLink>
              <LocalizedClientLink
                className="hover:text-ui-fg-base uppercase tracking-[0.2em] text-xs"
                href="/story"
                data-testid="nav-story-link"
              >
                {t("nav.story")}
              </LocalizedClientLink>
              <div className="hidden small:flex items-center gap-x-4 h-full">
                <CountrySwitcher regions={regions} />
                <LocaleSwitcher currentLocale={currentLocale} />
              </div>
              <LocalizedClientLink
                className="hover:text-ui-fg-base"
                href="/account"
                data-testid="nav-account-link"
              >
                {t("nav.account")}
              </LocalizedClientLink>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-ui-fg-base flex gap-2"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  {t("nav.cartCountEmpty")}
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
