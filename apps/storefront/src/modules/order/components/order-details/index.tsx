import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"
import { getT } from "@i18n/get-t"

type OrderDetailsProps = {
  order: HttpTypes.StoreOrder
  showStatus?: boolean
  locale: string
}

const OrderDetails = ({ order, showStatus, locale }: OrderDetailsProps) => {
  const { t } = getT(locale)

  const formatStatus = (str: string) => {
    const formatted = str.split("_").join(" ")

    return formatted.slice(0, 1).toUpperCase() + formatted.slice(1)
  }

  return (
    <div>
      <Text>
        <span
          className="text-ui-fg-medium-plus font-semibold"
          data-testid="order-email"
        >
          {t("order.confirmationSent", { email: order.email })}
        </span>
      </Text>
      <Text className="mt-2">
        {t("order.orderDate")}{" "}
        <span data-testid="order-date">
          {new Date(order.created_at).toDateString()}
        </span>
      </Text>
      <Text className="mt-2 text-ui-fg-interactive">
        {t("order.orderNumberLabel")}{" "}
        <span data-testid="order-id">{order.display_id}</span>
      </Text>

      <div className="flex items-center text-compact-small gap-x-4 mt-4">
        {showStatus && (
          <>
            <Text>
              {t("order.orderStatus")}{" "}
              <span className="text-ui-fg-subtle " data-testid="order-status">
                {formatStatus(order.fulfillment_status)}
              </span>
            </Text>
            <Text>
              {t("order.paymentStatus")}{" "}
              <span
                className="text-ui-fg-subtle "
                sata-testid="order-payment-status"
              >
                {formatStatus(order.payment_status)}
              </span>
            </Text>
          </>
        )}
      </div>
    </div>
  )
}

export default OrderDetails
