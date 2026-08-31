import { Text } from "@medusajs/ui"
import { getT } from "@i18n/get-t"

const MedusaCTA = async ({ locale }: { locale: string }) => {
  const { t } = await getT(locale)

  return (
    <Text className="txt-compact-small-plus items-center">
      {t("common.tagline")}
    </Text>
  )
}

export default MedusaCTA