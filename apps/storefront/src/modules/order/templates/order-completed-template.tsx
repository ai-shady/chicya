import { Heading } from "@medusajs/ui"
import { cookies as nextCookies } from "next/headers"

import { getT } from "@i18n/get-t"
import CartTotals from "@modules/common/components/cart-totals"
import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OnboardingCta from "@modules/order/components/onboarding-cta"
import OrderDetails from "@modules/order/components/order-details"
import ShippingDetails from "@modules/order/components/shipping-details"
import PaymentDetails from "@modules/order/components/payment-details"
import { HttpTypes } from "@medusajs/types"

type OrderCompletedTemplateProps = {
  order: HttpTypes.StoreOrder
  locale: string
}

export default async function OrderCompletedTemplate({
  order,
  locale,
}: OrderCompletedTemplateProps) {
  const cookies = await nextCookies()
  const { t } = await getT(locale)

  const isOnboarding = cookies.get("_medusa_onboarding")?.value === "true"

  return (
    <div className="py-6 min-h-[calc(100vh-64px)]">
      <div className="content-container flex flex-col justify-center items-center gap-y-10 max-w-4xl h-full w-full">
        {isOnboarding && <OnboardingCta orderId={order.id} />}
        <div
          className="flex flex-col gap-4 max-w-4xl h-full bg-white w-full py-10"
          data-testid="order-complete-container"
        >
          <Heading
            level="h1"
            className="flex flex-col gap-y-3 text-ui-fg-base text-3xl mb-4"
          >
            <span>{t("order.thankYou")}</span>
            <span>{t("order.orderPlaced")}</span>
          </Heading>
          <OrderDetails order={order} locale={locale} />
          <Heading level="h2" className="flex flex-row text-3xl-regular">
            {t("order.summary")}
          </Heading>
          <Items order={order} />
          <CartTotals totals={order} />
          <ShippingDetails order={order} locale={locale} />
          <PaymentDetails order={order} locale={locale} />
          <Help locale={locale} />
        </div>
      </div>
    </div>
  )
}