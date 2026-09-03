"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import React from "react"
import { DEFAULT_LOCALE_CODE } from "@i18n/config"

/**
 * Use this component to create a Next.js `<Link />` that persists the current locale (BCP 47) in the url,
 * without having to explicitly pass it as a prop.
 */
const LocalizedClientLink = ({
  children,
  href,
  ...props
}: {
  children?: React.ReactNode
  href: string
  className?: string
  onClick?: () => void
  passHref?: true
  [x: string]: any
}) => {
  const params = useParams()
  const locale = typeof params?.locale === "string" ? params.locale : DEFAULT_LOCALE_CODE

  return (
    <Link href={`/${locale}${href}`} {...props}>
      {children}
    </Link>
  )
}

export default LocalizedClientLink
