import { getLocale } from "@lib/data/locale-actions"
import { getLanguageByCode, DEFAULT_LOCALE_CODE } from "@i18n/config"

export async function getLocaleHeader() {
  const locale = await getLocale()
  // The backend translation module only knows en-US / zh-CN. Always send the
  // language's dictionary locale (BCP 47 URL locales like "en-DE" are mapped
  // back to their language so translated content resolves correctly).
  const language = getLanguageByCode(locale?.split("-")[0])
  return {
    "x-medusa-locale": language?.dictCode ?? DEFAULT_LOCALE_CODE,
  } as const
}