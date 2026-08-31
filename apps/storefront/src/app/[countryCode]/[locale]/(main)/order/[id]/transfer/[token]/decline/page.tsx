import { declineTransferRequest } from "@lib/data/orders"
import { Heading, Text } from "@medusajs/ui"
import TransferImage from "@modules/order/components/transfer-image"
import { getT } from "@i18n/get-t"

export default async function TransferPage(props: {
  params: Promise<{ id: string; token: string; locale: string }>
}) {
  const params = await props.params
  const { id, token, locale } = params
  const { t } = await getT(locale)

  const { success, error } = await declineTransferRequest(id, token)

  return (
    <div className="flex flex-col gap-y-4 items-start w-2/5 mx-auto mt-10 mb-20">
      <TransferImage />
      <div className="flex flex-col gap-y-6">
        {success && (
          <>
            <Heading level="h1" className="text-xl text-zinc-900">
              {t("order.transferDeclinedTitle")}
            </Heading>
            <Text className="text-zinc-600">
              {t("order.transferDeclinedBody", { id })}
            </Text>
          </>
        )}
        {!success && (
          <>
            <Text className="text-zinc-600">
              {t("order.transferDeclineError")}
            </Text>
            {error && (
              <Text className="text-red-500">
                {t("order.errorMessage", { error })}
              </Text>
            )}
          </>
        )}
      </div>
    </div>
  )
}
