import { retrieveOrder } from "@lib/data/orders"
import OrderDetailsTemplate from "@modules/order/templates/order-details-template"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getT } from "@i18n/get-t"

type Props = {
  params: Promise<{ id: string; countryCode: string; locale: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const order = await retrieveOrder(params.id).catch(() => null)
  const { t } = await getT(params.locale)

  if (!order) {
    notFound()
  }

  return {
    title: t("metadata.orderDetailTitle", { displayId: order.display_id }),
    description: t("metadata.orderDetailDesc"),
  }
}

export default async function OrderDetailPage(props: Props) {
  const params = await props.params
  const order = await retrieveOrder(params.id).catch(() => null)

  if (!order) {
    notFound()
  }

  return <OrderDetailsTemplate order={order} />
}
