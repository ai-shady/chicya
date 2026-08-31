import en from "./en"
import zh from "./zh"
import { Dictionary, isValidLocaleCode } from "./config"

const dictionaries: Record<string, Dictionary> = {
  "en-US": en,
  "zh-CN": zh,
}

export function getDictionary(locale: string): Dictionary {
  return dictionaries[locale] ?? en
}

export function getDictionaryForCode(code: string | undefined | null): Dictionary {
  return isValidLocaleCode(code) ? dictionaries[code!]! : en
}

export default dictionaries