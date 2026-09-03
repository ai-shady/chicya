import { Metadata } from "next"
import { notFound } from "next/navigation"

import { getCollectionByHandle, listCollections } from "@lib/data/collections"
import { StoreCollection } from "@medusajs/types"
import CollectionTemplate from "@modules/collections/templates"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { getT } from "@i18n/get-t"
import { locales, localeToCountryCode } from "@i18n/config"

type Props = {
  params: Promise<{ handle: string; locale: string }>
  searchParams: Promise<{
    page?: string
    sortBy?: SortOptions
  }>
}

export const PRODUCT_LIMIT = 12

export async function generateStaticParams() {
  const { collections } = await listCollections({
    fields: "*products",
  })

  if (!collections) {
    return []
  }

  const collectionHandles = collections.map(
    (collection: StoreCollection) => collection.handle
  )

  return locales.flatMap((locale) =>
    collectionHandles.flatMap((handle: string | undefined) => ({
      locale: locale.code,
      handle,
    }))
  )
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const { t } = await getT(params.locale)
  const collection = await getCollectionByHandle(params.handle)

  if (!collection) {
    notFound()
  }

  const metadata = {
    title: `${collection.title} | ${t("common.brand")}`,
    description: t("metadata.collectionsDesc", { title: collection.title }),
  } as Metadata

  return metadata
}

export default async function CollectionPage(props: Props) {
  const searchParams = await props.searchParams
  const params = await props.params
  const { sortBy, page } = searchParams

  const collection = await getCollectionByHandle(params.handle).then(
    (collection: StoreCollection) => collection
  )

  if (!collection) {
    notFound()
  }

  return (
    <CollectionTemplate
      collection={collection}
      page={page}
      sortBy={sortBy}
      countryCode={localeToCountryCode(params.locale)}
    />
  )
}
