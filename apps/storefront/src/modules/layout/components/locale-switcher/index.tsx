"use client"

import { useRouter } from "next/navigation"
import { useTransition } from "react"

import { updateLocale } from "@lib/data/locale-actions"

const LOCALES = [
  { code: "en-US", label: "EN" },
  { code: "zh-CN", label: "中文" },
]

const LocaleSwitcher = ({ currentLocale }: { currentLocale: string | null }) => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const current =
    LOCALES.find(
      (l) => l.code.toLowerCase() === currentLocale?.toLowerCase()
    )?.code ?? LOCALES[0].code

  const switchTo = (code: string) => {
    if (code === current || isPending) {
      return
    }
    startTransition(async () => {
      await updateLocale(code)
      router.refresh()
    })
  }

  return (
    <div
      className="flex items-center gap-2 text-xs uppercase tracking-[0.2em]"
      data-testid="locale-switcher"
    >
      {LOCALES.map((locale, i) => (
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
            aria-label={`Switch language to ${locale.label}`}
          >
            {locale.label}
          </button>
        </span>
      ))}
    </div>
  )
}

export default LocaleSwitcher