import { Metadata } from "next"

import LoginTemplate from "@modules/account/templates/login-template"
import { getT } from "@i18n/get-t"

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const { t } = await getT(params.locale)
  return {
    title: t("metadata.signinTitle"),
    description: t("metadata.signinDesc"),
  }
}

export default function Login() {
  return <LoginTemplate />
}
