import type { Metadata } from "next"
import { Heading, Text } from "@medusajs/ui"

import { retrieveCreatorProfile } from "@lib/data/creator"
import { getT } from "@i18n/get-t"

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { t } = await getT((await props.params).locale)
  return { title: t("creatorPage.metaTitle"), description: t("creatorPage.metaDesc") }
}

export default async function CreatorPage(props: { params: Promise<{ locale: string }> }) {
  const { t } = await getT((await props.params).locale)
  const profile = await retrieveCreatorProfile()

  if (!profile) return null

  return (
    <main>
      <section className="bg-chicya-ink px-6 py-24 text-white small:py-32">
        <div className="content-container grid grid-cols-1 items-center gap-12 small:grid-cols-12">
          <div className="small:col-span-4">
            {profile.avatar_url && <img src={profile.avatar_url} alt={profile.name} className="aspect-square w-full max-w-sm object-cover" />}
          </div>
          <div className="small:col-span-8">
            <p className="mb-5 text-xs uppercase tracking-[0.35em] text-chicya-gold">{t("creatorPage.eyebrow")}</p>
            <Heading level="h1" className="mb-5 text-4xl uppercase tracking-[0.14em] small:text-6xl">{profile.name}</Heading>
            <Text className="mb-6 max-w-2xl text-white/75">{profile.role}</Text>
            <Text className="max-w-2xl text-base leading-8 text-white/80">{profile.bio}</Text>
          </div>
        </div>
      </section>
      <section className="content-container grid grid-cols-1 gap-12 py-20 small:grid-cols-3">
        <div><p className="text-xs uppercase tracking-[0.3em] text-chicya-gold">{t("creatorPage.location")}</p><p className="mt-3">{profile.location}</p></div>
        <div><p className="text-xs uppercase tracking-[0.3em] text-chicya-gold">{t("creatorPage.company")}</p><p className="mt-3">{profile.company}</p></div>
        <div><p className="text-xs uppercase tracking-[0.3em] text-chicya-gold">{t("creatorPage.githubStats")}</p><p className="mt-3">{profile.public_repos} {t("creatorPage.repositories")} · {profile.followers} {t("creatorPage.followers")}</p></div>
      </section>
      <section className="bg-chicya-cream px-6 py-16">
        <div className="content-container flex flex-wrap gap-4">
          {profile.github_url && <a className="border border-chicya-ink px-5 py-3 text-xs uppercase tracking-[0.2em]" href={profile.github_url}>GitHub</a>}
          {profile.website_url && <a className="border border-chicya-ink px-5 py-3 text-xs uppercase tracking-[0.2em]" href={profile.website_url}>{t("creatorPage.website")}</a>}
        </div>
      </section>
    </main>
  )
}
