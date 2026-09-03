import { Metadata } from "next"
import { notFound } from "next/navigation"

import { getCategoryByHandle, listCategories } from "@lib/data/categories"
import CategoryTemplate from "@modules/categories/templates"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { getT } from "@i18n/get-t"
import { locales, localeToCountryCode } from "@i18n/config"

type Props = {
  params: Promise<{ category: string[]; locale: string }>
  searchParams: Promise<{
    sortBy?: SortOptions
    page?: string
  }>
}

export async function generateStaticParams() {
  const product_categories = await listCategories()

  if (!product_categories) {
    return []
  }

  const categoryHandles = product_categories.map(
    (category: any) => category.handle
  )

  return locales.flatMap((locale) =>
    categoryHandles.flatMap((handle: any) => ({
      locale: locale.code,
      category: [handle],
    }))
  )
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const { t } = await getT(params.locale)
  try {
    const productCategory = await getCategoryByHandle(params.category)

    const title = productCategory.name + " | " + t("common.brand")

    const description =
      productCategory.description ?? t("metadata.categoriesDesc", { title })

    return {
      title: `${title}`,
      description,
      alternates: {
        canonical: `${params.category.join("/")}`,
      },
    }
  } catch (error) {
    notFound()
  }
}

export default async function CategoryPage(props: Props) {
  const searchParams = await props.searchParams
  const params = await props.params
  const { sortBy, page } = searchParams

  const productCategory = await getCategoryByHandle(params.category)

  if (!productCategory) {
    notFound()
  }

  return (
    <CategoryTemplate
      category={productCategory}
      sortBy={sortBy}
      page={page}
      countryCode={localeToCountryCode(params.locale)}
    />
  )
}
