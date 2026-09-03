"use client"

import { useParams, usePathname, useRouter } from "next/navigation"
import { useTransition } from "react"

import { updateLocale } from "@lib/data/locale-actions"
import {
  languages,
  buildLocale,
  DEFAULT_LOCALE_CODE,
  localeToCountryCode,
  localeToLanguageCode,
} from "@i18n/config"
import { useT } from "@i18n/use-t"

const LocaleSwitcher = ({ currentLocale }: { currentLocale: string | null }) => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const { t } = useT()

  const urlLocale =
    typeof params?.locale === "string" ? params.locale : DEFAULT_LOCALE_CODE
  const current = localeToLanguageCode(currentLocale ?? urlLocale)
  const currentCountry = localeToCountryCode(urlLocale)

  const switchTo = (languageCode: string) => {
    if (languageCode === current || isPending) {
      return
    }
    startTransition(async () => {
      const newLocale = buildLocale(languageCode, currentCountry)
      await updateLocale(newLocale)
      const rest = pathname.split(`/${urlLocale}`)[1] ?? ""
      router.push(`/${newLocale}${rest}`)
    })
  }

  return (
    <div
      className="flex items-center gap-2 text-xs uppercase tracking-[0.2em]"
      data-testid="locale-switcher"
    >
      {languages.map((lang, i) => (
        <span key={lang.code} className="flex items-center gap-2">
          {i > 0 && (
            <span className="text-ui-fg-muted" aria-hidden="true">
              |
            </span>
          )}
          <button
            onClick={() => switchTo(lang.code)}
            disabled={isPending}
            className={
              lang.code === current
                ? "text-chicya-gold"
                : "text-ui-fg-subtle hover:text-ui-fg-base transition-colors"
            }
            aria-label={t("localeSwitcher.switchTo", { label: lang.label })}
          >
            {lang.label}
          </button>
        </span>
      ))}
    </div>
  )
}

export default LocaleSwitcher