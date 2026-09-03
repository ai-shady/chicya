import { Metadata } from "next"

import LocalizedNotFound from "@modules/common/components/localized-not-found"

export const metadata: Metadata = {
  title: "404",
  description: "Something went wrong",
}

export default function NotFound() {
  return <LocalizedNotFound cartVariant />
}
