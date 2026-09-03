import { Metadata } from "next"
import { notFound } from "next/navigation"

import AddressBook from "@modules/account/components/address-book"

import { getRegion } from "@lib/data/regions"
import { retrieveCustomer } from "@lib/data/customer"
import { getT } from "@i18n/get-t"
import { localeToCountryCode } from "@i18n/config"

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const { t } = await getT(params.locale)
  return {
    title: t("metadata.addressesTitle"),
    description: t("account.addressesMeta"),
  }
}

export default async function Addresses(props: Props) {
  const params = await props.params
  const locale = params.locale
  const countryCode = localeToCountryCode(locale)
  const { t } = await getT(locale)
  const customer = await retrieveCustomer()
  const region = await getRegion(countryCode)

  if (!customer || !region) {
    notFound()
  }

  return (
    <div className="w-full" data-testid="addresses-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">{t("account.addresses")}</h1>
        <p className="text-base-regular">{t("account.addressesMeta")}</p>
      </div>
      <AddressBook customer={customer} region={region} />
    </div>
  )
}
