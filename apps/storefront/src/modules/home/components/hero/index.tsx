import { Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { getT } from "@i18n/get-t"

const HERO_IMAGE =
  "https://assets.chicya.com/hero-cream-01M1BG6FHH5CQX13956ARDB5SR.jpg"

const Hero = async ({ locale }: { locale: string }) => {
  const { t } = await getT(locale)

  return (
    <section
      aria-label={t("home.hero.aria")}
      className="relative min-h-[88vh] w-full overflow-hidden bg-chicya-cream"
    >
      <img
        src={HERO_IMAGE}
        alt={t("home.hero.alt")}
        loading="eager"
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover object-center animate-chicya-kenburns"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-chicya-cream/40 via-chicya-cream/30 to-chicya-cream" />

      <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-[88vh] px-6 py-24 gap-7">
        <p
          className="uppercase tracking-[0.35em] text-sm text-chicya-gold font-medium"
          style={{ animation: "chicya-fade-up 0.9s ease both" }}
        >
          {t("home.hero.kicker")}
        </p>
        <Heading
          level="h1"
          className="text-5xl small:text-7xl leading-none text-chicya-ink font-semibold uppercase tracking-[0.18em]"
          style={{ animation: "chicya-fade-up 1.1s 0.15s ease both" }}
        >
          {t("home.hero.heading")}
        </Heading>
        <Heading
          level="h2"
          className="text-2xl small:text-3xl text-chicya-gold font-normal italic tracking-wide"
          style={{ animation: "chicya-fade-up 1.1s 0.3s ease both" }}
        >
          {t("home.hero.tagline")}
        </Heading>

        <div
          className="flex flex-col small:flex-row items-center gap-4 mt-4"
          style={{ animation: "chicya-fade-up 1.1s 0.45s ease both" }}
        >
          <LocalizedClientLink
            href="/store"
            className="inline-flex items-center justify-center px-8 py-4 bg-chicya-ink text-white uppercase tracking-[0.2em] text-sm hover:bg-chicya-gold transition-colors duration-300"
          >
            {t("home.hero.shopNow")}
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/store"
            className="inline-flex items-center justify-center px-8 py-4 border border-chicya-ink text-chicya-ink uppercase tracking-[0.2em] text-sm hover:border-chicya-gold hover:text-chicya-gold transition-colors duration-300"
          >
            {t("home.hero.exploreCollections")}
          </LocalizedClientLink>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-chicya-ink/60"
        style={{ animation: "chicya-fade-in 1.5s 1s ease both" }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">{t("home.hero.scroll")}</span>
        <span className="block h-8 w-px bg-chicya-ink/40 animate-pulse" />
      </div>
    </section>
  )
}

export default Hero