"use client"

import { useEffect } from "react"

import { useT } from "@i18n/use-t"

const HtmlLang = () => {
  const { localeCode } = useT()

  useEffect(() => {
    document.documentElement.lang = localeCode
  }, [localeCode])

  return null
}

export default HtmlLang