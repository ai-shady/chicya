import en from "./en"
import zh from "./zh"
import { Dictionary } from "./config"

const dictionaries: Record<string, Dictionary> = {
  en: en,
  zh: zh,
}

function languageKey(code: string | undefined | null): string {
  return (code ?? "en").split("-")[0].toLowerCase()
}

export function getDictionary(locale: string): Dictionary {
  return dictionaries[languageKey(locale)] ?? en
}

export function getDictionaryForCode(
  code: string | undefined | null
): Dictionary {
  return dictionaries[languageKey(code)] ?? en
}

export default dictionaries