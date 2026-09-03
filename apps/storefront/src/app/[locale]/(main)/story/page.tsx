import { Heading, Text } from "@medusajs/ui"
import type { Metadata } from "next"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { getT } from "@i18n/get-t"

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const { t } = await getT(params.locale)
  return {
    title: t("storyPage.metaTitle"),
    description: t("storyPage.metaDesc"),
  }
}

export default async function StoryPage(props: Props) {
  const params = await props.params
  const { t, dict } = await getT(params.locale)
  const values = dict.home.story.values as { title: string; body: string }[]

  const storyJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: t("storyPage.metaTitle"),
    url: "https://www.chicya.com/story",
    about: {
      "@type": "Organization",
      name: t("common.brand"),
      slogan: t("common.tagline"),
      url: "https://www.chicya.com",
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(storyJsonLd) }}
      />
      <section className="relative min-h-[55vh] w-full overflow-hidden bg-chicya-cream">
        <img
          src="https://assets.chicya.com/ad3-01M1BG6HKBSZ57TTRGSZ37ASG3.jpg"
          alt={t("storyPage.alt1")}
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-chicya-cream/55" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-[55vh] px-6 py-24 gap-5">
          <p className="text-xs uppercase tracking-[0.35em] text-chicya-gold">
            {t("storyPage.eyebrow")}
          </p>
          <Heading
            level="h1"
            className="text-4xl small:text-6xl text-chicya-ink font-semibold uppercase tracking-[0.18em]"
          >
            {t("storyPage.heading")}
          </Heading>
          <Text className="max-w-xl text-chicya-ink/80 text-base leading-7">
            {t("storyPage.lede")}
          </Text>
        </div>
      </section>

      <section className="w-full py-16 small:py-24 content-container">
        <div className="grid grid-cols-1 small:grid-cols-12 gap-y-12 small:gap-x-12 items-center">
          <div className="small:col-span-6">
            <div className="aspect-[4/3] overflow-hidden bg-chicya-cream">
              <img
                src="https://assets.chicya.com/ad5-01M1BG6MET05YDRGX0Y3V941XK.jpg"
                alt={t("storyPage.alt2")}
                loading="lazy"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
          <div className="small:col-span-6 flex flex-col gap-6">
            <p className="text-xs uppercase tracking-[0.35em] text-chicya-gold">
              {t("storyPage.labelTitle")}
            </p>
            <Heading
              level="h2"
              className="text-3xl small:text-4xl text-chicya-ink uppercase tracking-[0.12em]"
            >
              {t("storyPage.labelHeading")}
            </Heading>
            <Text className="text-chicya-ink/80 text-base leading-7">
              {t("storyPage.p1")}
            </Text>
            <Text className="text-chicya-ink/80 text-base leading-7">
              {t("storyPage.p2")}
            </Text>
          </div>
        </div>
      </section>

      <section className="w-full bg-chicya-cream py-16 small:py-24">
        <div className="content-container">
          <div className="flex flex-col items-center text-center gap-3 mb-12">
            <p className="text-xs uppercase tracking-[0.35em] text-chicya-gold">
              {t("storyPage.codeEyebrow")}
            </p>
            <Heading
              level="h2"
              className="text-3xl small:text-4xl text-chicya-ink uppercase tracking-[0.12em]"
            >
              {t("storyPage.codeTitle")}
            </Heading>
          </div>
          <div className="grid grid-cols-1 small:grid-cols-3 gap-x-6 gap-y-10">
            {values.map((value, i) => (
              <div
                key={value.title}
                className="border-t border-chicya-ink/15 pt-6"
              >
                <span className="block text-3xl text-chicya-gold font-light mb-4">
                  0{i + 1}
                </span>
                <Heading
                  level="h3"
                  className="text-lg text-chicya-ink uppercase tracking-[0.12em] mb-3"
                >
                  {value.title}
                </Heading>
                <Text className="text-sm text-chicya-ink/70 leading-6">
                  {value.body}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-chicya-ink py-16 small:py-20">
        <div className="content-container flex flex-col items-center text-center gap-6">
          <Heading
            level="h2"
            className="text-3xl small:text-4xl text-white uppercase tracking-[0.15em]"
          >
            {t("storyPage.ctaTitle")}
          </Heading>
          <Text className="max-w-lg text-white/70 text-base leading-7">
            {t("storyPage.ctaBody")}
          </Text>
          <LocalizedClientLink
            href="/store"
            className="inline-flex items-center justify-center px-8 py-4 bg-chicya-gold text-white uppercase tracking-[0.2em] text-sm hover:bg-chicya-ink border border-chicya-gold transition-colors duration-300"
          >
            {t("storyPage.ctaBtn")}
          </LocalizedClientLink>
        </div>
      </section>
    </>
  )
}