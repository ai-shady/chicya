import { Heading, Text } from "@medusajs/ui"

import { getT } from "@i18n/get-t"
import InteractiveLink from "@modules/common/components/interactive-link"

const EmptyCartMessage = async ({ locale }: { locale: string }) => {
  const { t } = await getT(locale)
  return (
    <div className="py-48 px-2 flex flex-col justify-center items-start" data-testid="empty-cart-message">
      <Heading
        level="h1"
        className="flex flex-row text-3xl-regular gap-x-2 items-baseline"
      >
        {t("cart.emptyTitle")}
      </Heading>
      <Text className="text-base-regular mt-4 mb-6 max-w-[32rem]">
        {t("cart.emptyDesc")}
      </Text>
      <div>
        <InteractiveLink href="/store">{t("common.exploreProducts")}</InteractiveLink>
      </div>
    </div>
  )
}

export default EmptyCartMessage
