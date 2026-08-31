"use client"

import { Badge } from "@medusajs/ui"
import { useT } from "@i18n/use-t"

const PaymentTest = ({ className }: { className?: string }) => {
  const { t } = useT()
  return (
    <Badge color="orange" className={className}>
      <span className="font-semibold">{t("checkout.attention")}</span>{" "}
      {t("checkout.testingOnly")}
    </Badge>
  )
}

export default PaymentTest