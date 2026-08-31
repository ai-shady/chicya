"use client"

import { resetOnboardingState } from "@lib/data/onboarding"
import { Button, Container, Text } from "@medusajs/ui"
import { useT } from "@i18n/use-t"

const OnboardingCta = ({ orderId }: { orderId: string }) => {
  const { t } = useT()

  return (
    <Container className="max-w-4xl h-full bg-ui-bg-subtle w-full">
      <div className="flex flex-col gap-y-4 center p-4 md:items-center">
        <Text className="text-ui-fg-base text-xl">
          {t("product.onboardTitle")}
        </Text>
        <Text className="text-ui-fg-subtle text-small-regular">
          {t("product.onboardBody")}
        </Text>
        <Button
          className="w-fit"
          size="xlarge"
          onClick={() => resetOnboardingState(orderId)}
        >
          {t("product.onboardBtn")}
        </Button>
      </div>
    </Container>
  )
}

export default OnboardingCta
