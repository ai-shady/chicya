export type Dictionary = {
  [key: string]: string | Dictionary | string[]
}

export type Locale = {
  code: string
  path: string
  label: string
  name: string
}

export const locales: Locale[] = [
  { code: "en-US", path: "en", label: "EN", name: "English" },
  { code: "zh-CN", path: "zh", label: "中文", name: "中文" },
]

export const DEFAULT_LOCALE_CODE = "en-US"
export const DEFAULT_LOCALE_PATH = "en"

export const localeCodes = locales.map((l) => l.code)
export const localePaths = locales.map((l) => l.path)

export function isValidLocalePath(path: string | undefined): boolean {
  return !!path && localePaths.includes(path)
}

export function localePathToCode(path: string): string {
  return (
    locales.find((l) => l.path === path)?.code ?? DEFAULT_LOCALE_CODE
  )
}

export function codeToLocalePath(code: string): string {
  return (
    locales.find((l) => l.code === code)?.path ?? DEFAULT_LOCALE_PATH
  )
}

export function isValidLocaleCode(code: string | undefined | null): boolean {
  return !!code && localeCodes.includes(code)
}

export function normalizeLocaleCode(code: string | undefined | null): string {
  return isValidLocaleCode(code) ? code! : DEFAULT_LOCALE_CODE
}

export function getLocaleByPath(path: string): Locale | undefined {
  return locales.find((l) => l.path === path)
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