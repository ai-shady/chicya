"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import React from "react"

/**
 * Use this component to create a Next.js `<Link />` that persists the current country code and locale in the url,
 * without having to explicitly pass them as props.
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
  const { countryCode, locale } = useParams()
  const localePath = typeof locale === "string" ? locale : "en"

  return (
    <Link href={`/${countryCode}/${localePath}${href}`} {...props}>
      {children}
    </Link>
  )
}

export default LocalizedClientLink
