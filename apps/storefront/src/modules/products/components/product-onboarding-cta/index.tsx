import { Button, Container, Text } from "@medusajs/ui"
import { cookies as nextCookies } from "next/headers"

import { getT } from "@i18n/get-t"

async function ProductOnboardingCta({ locale }: { locale: string }) {
  const cookies = await nextCookies()
  const { t } = await getT(locale)

  const isOnboarding = cookies.get("_medusa_onboarding")?.value === "true"

  if (!isOnboarding) {
    return null
  }

  return (
    <Container className="max-w-4xl h-full bg-ui-bg-subtle w-full p-8">
      <div className="flex flex-col gap-y-4 center">
        <Text className="text-ui-fg-base text-xl">
          {t("product.onboardTitle")}
        </Text>
        <Text className="text-ui-fg-subtle text-small-regular">
          {t("product.onboardBody")}
        </Text>
        <a href="http://localhost:7001/a/orders?onboarding_step=create_order_nextjs">
          <Button className="w-full">{t("product.onboardBtn")}</Button>
        </a>
      </div>
    </Container>
  )
}

export default ProductOnboardingCta
