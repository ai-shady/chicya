"use client"

import { usePathname, useRouter } from "next/navigation"
import { useTransition } from "react"

import { updateLocale } from "@lib/data/locale-actions"
import { codeToLocalePath, locales } from "@i18n/config"
import { useT } from "@i18n/use-t"

const LocaleSwitcher = ({ currentLocale }: { currentLocale: string | null }) => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const pathname = usePathname()
  const { t } = useT()

  const current =
    locales.find(
      (l) => l.code.toLowerCase() === currentLocale?.toLowerCase()
    )?.code ?? locales[0].code

  const switchTo = (code: string) => {
    if (code === current || isPending) {
      return
    }
    startTransition(async () => {
      await updateLocale(code)
      const segments = pathname.split("/")
      const rest = segments.length > 3 ? "/" + segments.slice(3).join("/") : ""
      router.push(`/${segments[1]}/${codeToLocalePath(code)}${rest}`)
    })
  }

  return (
    <div
      className="flex items-center gap-2 text-xs uppercase tracking-[0.2em]"
      data-testid="locale-switcher"
    >
      {locales.map((locale, i) => (
        <span key={locale.code} className="flex items-center gap-2">
          {i > 0 && (
            <span className="text-ui-fg-muted" aria-hidden="true">
              |
            </span>
          )}
          <button
            onClick={() => switchTo(locale.code)}
            disabled={isPending}
            className={
              locale.code === current
                ? "text-chicya-gold"
                : "text-ui-fg-subtle hover:text-ui-fg-base transition-colors"
            }
            aria-label={t("localeSwitcher.switchTo", { label: locale.label })}
          >
            {locale.label}
          </button>
        </span>
      ))}
    </div>
  )
}

export default LocaleSwitcher