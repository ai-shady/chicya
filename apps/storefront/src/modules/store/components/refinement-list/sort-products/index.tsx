"use client"

import FilterRadioGroup from "@modules/common/components/filter-radio-group"
import { useT } from "@i18n/use-t"

export type SortOptions = "price_asc" | "price_desc" | "created_at"

type SortProductsProps = {
  sortBy: SortOptions
  setQueryParams: (name: string, value: SortOptions) => void
  "data-testid"?: string
}

const SortProducts = ({
  "data-testid": dataTestId,
  sortBy,
  setQueryParams,
}: SortProductsProps) => {
  const { t } = useT()

  const sortOptions = [
    {
      value: "created_at",
      label: t("storePage.latest"),
    },
    {
      value: "price_asc",
      label: t("storePage.priceLowHigh"),
    },
    {
      value: "price_desc",
      label: t("storePage.priceHighLow"),
    },
  ]

  const handleChange = (value: SortOptions) => {
    setQueryParams("sortBy", value)
  }

  return (
    <FilterRadioGroup
      title={t("storePage.sortBy")}
      items={sortOptions}
      value={sortBy}
      handleChange={handleChange}
      data-testid={dataTestId}
    />
  )
}

export default SortProducts