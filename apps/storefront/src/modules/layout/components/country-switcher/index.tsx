"use client"

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react"
import { useMemo } from "react"
import ReactCountryFlag from "react-country-flag"

import { useParams, usePathname } from "next/navigation"
import { updateRegion } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import { useT } from "@i18n/use-t"
import {
  buildLocale,
  DEFAULT_LOCALE_CODE,
  localeToCountryCode,
  localeToLanguageCode,
} from "@i18n/config"

type CountryOption = {
  country: string
  region: string
  label: string
}

type CountrySwitcherProps = {
  regions: HttpTypes.StoreRegion[]
}

const CountrySwitcher = ({ regions }: CountrySwitcherProps) => {
  const { t } = useT()
  const params = useParams()
  const locale =
    typeof params?.locale === "string" ? params.locale : DEFAULT_LOCALE_CODE
  const languageCode = localeToLanguageCode(locale)
  const pathname = usePathname()
  const rest = pathname.split(`/${locale}`)[1] ?? ""

  const options = useMemo<CountryOption[]>(() => {
    return (
      regions
        ?.flatMap((r) =>
          (r.countries ?? []).map((c) => ({
            country: c.iso_2 ?? "",
            region: r.id,
            label: c.display_name ?? "",
          }))
        )
        .sort((a, b) => (a.label ?? "").localeCompare(b.label ?? "")) ?? []
    )
  }, [regions])

  const current =
    options.find((o) => o.country === localeToCountryCode(locale)) ??
    options[0]

  const handleChange = (option: CountryOption) => {
    updateRegion(buildLocale(languageCode, option.country), rest)
  }

  return (
    <div className="relative">
      <Listbox as="div" onChange={handleChange} defaultValue={current}>
        <ListboxButton
          className="flex items-center gap-1.5 py-1 text-xs uppercase tracking-[0.2em] text-ui-fg-subtle hover:text-ui-fg-base transition-colors"
          aria-label={t("nav.shippingTo")}
          data-testid="country-switcher"
        >
          {current && (
            <ReactCountryFlag
              svg
              style={{ width: "16px", height: "16px" }}
              countryCode={current.country ?? ""}
            />
          )}
          <span>{current?.country?.toUpperCase()}</span>
        </ListboxButton>
        <ListboxOptions
          className="max-h-[300px] overflow-y-auto z-[900] bg-white drop-shadow-md text-small-regular text-black rounded-rounded border border-ui-border-base min-w-[240px]"
          anchor="bottom end"
        >
          {options.map((o) => (
            <ListboxOption
              key={o.country || o.region}
              value={o}
              className="py-2 px-3 hover:bg-gray-100 cursor-pointer flex items-center gap-x-2"
            >
              <ReactCountryFlag
                svg
                style={{ width: "16px", height: "16px" }}
                countryCode={o.country ?? ""}
              />
              <span>{o.label}</span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  )
}

export default CountrySwitcher