import { retrieveCustomer } from "@lib/data/customer"
import { Toaster } from "@medusajs/ui"
import AccountLayout from "@modules/account/templates/account-layout"

export default async function AccountPageLayout(props: {
  params: Promise<{ countryCode: string; locale: string }>
  dashboard?: React.ReactNode
  login?: React.ReactNode
}) {
  const params = await props.params
  const customer = await retrieveCustomer().catch(() => null)

  return (
    <AccountLayout customer={customer} locale={params.locale}>
      {customer ? props.dashboard : props.login}
      <Toaster />
    </AccountLayout>
  )
}
