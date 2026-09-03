import { Metadata } from "next"

import Overview from "@modules/account/components/overview"
import { notFound } from "next/navigation"
import { retrieveCustomer } from "@lib/data/customer"
import { listOrders } from "@lib/data/orders"
import { getT } from "@i18n/get-t"

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const { t } = await getT(params.locale)
  return {
    title: t("metadata.accountTitle"),
    description: t("account.overviewMeta"),
  }
}

export default async function OverviewTemplate(props: Props) {
  const params = await props.params
  const customer = await retrieveCustomer().catch(() => null)
  const orders = (await listOrders().catch(() => null)) || null

  if (!customer) {
    notFound()
  }

  return (
    <Overview customer={customer} orders={orders} locale={params.locale} />
  )
}
