"use client"

import { useT } from "@i18n/use-t"
import InteractiveLink from "@modules/common/components/interactive-link"

const LocalizedNotFound = ({ cartVariant = false }: { cartVariant?: boolean }) => {
  const { t } = useT()

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] gap-4 text-center px-6">
      <h1 className="text-2xl-semi text-ui-fg-base">
        {t("common.pageNotFound")}
      </h1>
      <p className="text-small-regular text-ui-fg-base">
        {cartVariant ? t("metadata.cart404Body") : t("common.pageNotFoundDesc")}
      </p>
      <InteractiveLink href="/">{t("common.goToFrontpage")}</InteractiveLink>
    </div>
  )
}

export default LocalizedNotFound