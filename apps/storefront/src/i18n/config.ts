export type Dictionary = {
  [key: string]: string | Dictionary | string[]
}

export type Language = {
  code: string
  label: string
  name: string
  dictCode: string
}

export type Country = {
  code: string
  name: string
}

export type Locale = {
  code: string
  languageCode: string
  countryCode: string
  label: string
  name: string
}

export const languages: Language[] = [
  { code: "en", label: "EN", name: "English", dictCode: "en-US" },
  { code: "zh", label: "中文", name: "中文", dictCode: "zh-CN" },
]

export const countries: Country[] = [
  { code: "us", name: "United States" },
  { code: "cn", name: "China" },
  { code: "de", name: "Germany" },
  { code: "dk", name: "Denmark" },
  { code: "es", name: "Spain" },
  { code: "fr", name: "France" },
  { code: "gb", name: "United Kingdom" },
  { code: "it", name: "Italy" },
  { code: "se", name: "Sweden" },
]

export const DEFAULT_LANGUAGE_CODE = "en"
export const DEFAULT_COUNTRY_CODE = "us"
export const DEFAULT_LOCALE_CODE = "en-US"
export const DEFAULT_LOCALE_PATH = "en-US"

const LOCALE_REGEX = /^([a-z]{2,3})-([A-Z]{2})$/

export function buildLocale(
  languageCode: string,
  countryCode: string
): string {
  return `${languageCode}-${countryCode.toUpperCase()}`
}

export function getDefaultLanguageByCountry(
  countryCode: string | undefined | null
): string {
  const code = (countryCode ?? "").toLowerCase()
  if (code === "cn") return "zh"
  return DEFAULT_LANGUAGE_CODE
}

export function getDefaultLocaleForCountry(
  countryCode: string | undefined | null
): string {
  return buildLocale(
    getDefaultLanguageByCountry(countryCode),
    countryCode ?? DEFAULT_COUNTRY_CODE
  )
}

export function getLanguageByCode(
  code: string | undefined | null
): Language | undefined {
  if (!code) return undefined
  return languages.find((l) => l.code === code.toLowerCase())
}

export function getCountryByCode(
  code: string | undefined | null
): Country | undefined {
  if (!code) return undefined
  return countries.find((c) => c.code === code.toLowerCase())
}

export function parseLocale(
  locale: string | undefined | null
): { languageCode: string; countryCode: string } | null {
  if (!locale) return null
  const m = LOCALE_REGEX.exec(locale)
  if (!m) return null
  const languageCode = m[1].toLowerCase()
  const countryCode = m[2].toLowerCase()
  if (!languages.some((l) => l.code === languageCode)) return null
  if (!countries.some((c) => c.code === countryCode)) return null
  return { languageCode, countryCode }
}

export function isValidLocale(locale: string | undefined | null): boolean {
  return parseLocale(locale) !== null
}

export function localeToLanguageCode(
  locale: string | undefined | null
): string {
  return parseLocale(locale)?.languageCode ?? DEFAULT_LANGUAGE_CODE
}

export function localeToCountryCode(
  locale: string | undefined | null
): string {
  return parseLocale(locale)?.countryCode ?? DEFAULT_COUNTRY_CODE
}

export const locales: Locale[] = countries.flatMap((country) =>
  languages.map((lang) => ({
    code: buildLocale(lang.code, country.code),
    languageCode: lang.code,
    countryCode: country.code,
    label: lang.label,
    name: `${lang.name} (${country.name})`,
  }))
)

export const localeCodes = locales.map((l) => l.code)
export const localePaths = locales.map((l) => l.code)

// Backwards-compatible aliases (path === code for BCP 47 locales)
export function isValidLocalePath(path: string | undefined): boolean {
  return isValidLocale(path)
}

export function localePathToCode(path: string): string {
  return isValidLocale(path) ? path! : DEFAULT_LOCALE_CODE
}

export function codeToLocalePath(code: string): string {
  return isValidLocale(code) ? code! : DEFAULT_LOCALE_CODE
}

export function isValidLocaleCode(
  code: string | undefined | null
): boolean {
  return isValidLocale(code)
}

export function normalizeLocaleCode(
  code: string | undefined | null
): string {
  return isValidLocale(code) ? code! : DEFAULT_LOCALE_CODE
}

export function getLocaleByPath(path: string): Locale | undefined {
  return locales.find((l) => l.code === path)
}

export function getLocaleByCode(code: string): Locale | undefined {
  return locales.find((l) => l.code === code)
}

export function t(
  dictionary: Dictionary,
  key: string,
  vars?: Record<string, string | number>
): string {
  let value: unknown = dictionary
  const parts = key.split(".")

  for (const part of parts) {
    if (value && typeof value === "object") {
      value = (value as Record<string, unknown>)[part]
    } else {
      return key
    }
  }

  if (typeof value !== "string") {
    return key
  }

  if (!vars) {
    return value
  }

  return value.replace(/\{(\w+)\}/g, (match, name) => {
    const replacement = vars[name]
    return replacement !== undefined ? String(replacement) : match
  })
}