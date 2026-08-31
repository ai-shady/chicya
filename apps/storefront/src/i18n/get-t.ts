import { Dictionary, t as translate } from "./config"
import { getDictionaryForCode } from "./dictionaries"

export type TFunc = (
  key: string,
  vars?: Record<string, string | number>
) => string

export function getT(localeCode: string): { t: TFunc; dict: Dictionary } {
  const dict = getDictionaryForCode(localeCode)
  return {
    t: (key, vars) => translate(dict, key, vars),
    dict,
  }
}