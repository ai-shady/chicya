import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"
import { useT } from "@i18n/use-t"

type LineItemOptionsProps = {
  variant: HttpTypes.StoreProductVariant | undefined
  "data-testid"?: string
  "data-value"?: HttpTypes.StoreProductVariant
}

const LineItemOptions = ({
  variant,
  "data-testid": dataTestid,
  "data-value": dataValue,
}: LineItemOptionsProps) => {
  const { t } = useT()

  return (
    <Text
      data-testid={dataTestid}
      data-value={dataValue}
      className="inline-block txt-medium text-ui-fg-subtle w-full overflow-hidden text-ellipsis"
    >
      {t("common.lineItemVariant", { title: variant?.title })}
    </Text>
  )
}

export default LineItemOptions
