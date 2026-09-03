import { Heading, Text } from "@medusajs/ui"
import TransferActions from "@modules/order/components/transfer-actions"
import TransferImage from "@modules/order/components/transfer-image"
import { getT } from "@i18n/get-t"

export default async function TransferPage(props: {
  params: Promise<{ id: string; token: string; locale: string }>
}) {
  const params = await props.params
  const { id, token, locale } = params
  const { t } = await getT(locale)

  return (
    <div className="flex flex-col gap-y-4 items-start w-2/5 mx-auto mt-10 mb-20">
      <TransferImage />
      <div className="flex flex-col gap-y-6">
        <Heading level="h1" className="text-xl text-zinc-900">
          {t("order.transferRequestFor", { id })}
        </Heading>
        <Text className="text-zinc-600">
          {t("order.transferRequestBody1", { id })}
        </Text>
        <div className="w-full h-px bg-zinc-200" />
        <Text className="text-zinc-600">
          {t("order.transferRequestBody2")}
        </Text>
        <Text className="text-zinc-600">
          {t("order.transferRequestBody3")}
        </Text>
        <div className="w-full h-px bg-zinc-200" />
        <TransferActions id={id} token={token} />
      </div>
    </div>
  )
}
