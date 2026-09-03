"use client"

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react"
import { Fragment, useState, useTransition } from "react"
import { useRouter, usePathname, useParams } from "next/navigation"

import { StateType } from "@lib/hooks/use-toggle-state"
import { updateLocale } from "@lib/data/locale-actions"
import {
  languages,
  buildLocale,
  DEFAULT_LOCALE_CODE,
  localeToCountryCode,
  localeToLanguageCode,
} from "@i18n/config"
import { useT } from "@i18n/use-t"

type LanguageOption = {
  code: string
  label: string
  name: string
}

type LanguageSelectProps = {
  toggleState: StateType
}

const LanguageSelect = ({ toggleState }: LanguageSelectProps) => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const pathname = usePathname()
  const { t } = useT()

  const { state, close } = toggleState

  const params = useParams()
  const currentLocale =
    typeof params?.locale === "string" ? params.locale : DEFAULT_LOCALE_CODE
  const currentCountry = localeToCountryCode(currentLocale)
  const currentLanguage = localeToLanguageCode(currentLocale)

  const options: LanguageOption[] = languages.map((l) => ({
    code: l.code,
    label: l.label,
    name: l.name,
  }))

  const current =
    options.find((o) => o.code === currentLanguage) ?? options[0]

  const handleChange = (option: LanguageOption) => {
    startTransition(async () => {
      const newLocale = buildLocale(option.code, currentCountry)
      await updateLocale(newLocale)
      close()
      const rest = pathname.split(`/${currentLocale}`)[1] ?? ""
      router.push(`/${newLocale}${rest}`)
    })
  }

  return (
    <div>
      <Listbox as="span" onChange={handleChange} defaultValue={current} disabled={isPending}>
        <ListboxButton className="py-1 w-full">
          <div className="txt-compact-small flex items-start gap-x-2">
            <span>{t("languageSelect.language")}</span>
            <span className="txt-compact-small">
              {isPending ? "..." : current.label}
            </span>
          </div>
        </ListboxButton>
        <div className="flex relative w-full min-w-[320px]">
          <Transition
            show={state}
            as={Fragment}
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions
              className="absolute -bottom-[calc(100%-36px)] left-0 xsmall:left-auto xsmall:right-0 max-h-[442px] overflow-y-scroll z-[900] bg-white drop-shadow-md text-small-regular uppercase text-black no-scrollbar rounded-rounded w-full"
              static
            >
              {options.map((o) => (
                <ListboxOption
                  key={o.code}
                  value={o}
                  className="py-2 hover:bg-gray-200 px-3 cursor-pointer flex items-center gap-x-2"
                >
                  <span style={{ width: "16px", height: "16px" }} />
                  {o.label}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default LanguageSelect