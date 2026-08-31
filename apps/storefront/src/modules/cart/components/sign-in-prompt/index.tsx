import { Button, Heading, Text } from "@medusajs/ui"
import { getT } from "@i18n/get-t"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SignInPrompt = async ({ locale }: { locale: string }) => {
  const { t } = await getT(locale)
  return (
    <div className="bg-white flex items-center justify-between">
      <div>
        <Heading level="h2" className="txt-xlarge">
          {t("cart.alreadyAccount")}
        </Heading>
        <Text className="txt-medium text-ui-fg-subtle mt-2">
          {t("cart.signInBetter")}
        </Text>
      </div>
      <div>
        <LocalizedClientLink href="/account">
          <Button variant="secondary" className="h-10" data-testid="sign-in-button">
            {t("cart.signIn")}
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default SignInPrompt
