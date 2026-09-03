"use client"

import { useParams } from "next/navigation"
import { Dictionary, t as translate } from "./config"
import { getDictionaryForCode } from "./dictionaries"
import { DEFAULT_LOCALE_CODE } from "./config"

export type UseT = {
  t: (key: string, vars?: Record<string, string | number>) => string
  dict: Dictionary
  localeCode: string
  localePath: string
}

export function useT(): UseT {
  const params = useParams<{ locale?: string }>()
  const localeCode =
    typeof params?.locale === "string" ? params.locale : DEFAULT_LOCALE_CODE
  const dict = getDictionaryForCode(localeCode)

  return {
    t: (key, vars) => translate(dict, key, vars),
    dict,
    localeCode,
    localePath: localeCode,
  }
}