import { Metadata } from "next"

import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"
import { getT } from "@i18n/get-t"
import { localeToCountryCode } from "@i18n/config"

type Params = {
  searchParams: Promise<{
    sortBy?: SortOptions
    page?: string
  }>
  params: Promise<{
    locale: string
  }>
}

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params
  const { t } = await getT(params.locale)
  return {
    title: t("storePage.metaTitle"),
    description: t("storePage.metaDesc"),
  }
}

export default async function StorePage(props: Params) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { sortBy, page } = searchParams

  return (
    <StoreTemplate
      sortBy={sortBy}
      page={page}
      countryCode={localeToCountryCode(params.locale)}
      locale={params.locale}
    />
  )
}
