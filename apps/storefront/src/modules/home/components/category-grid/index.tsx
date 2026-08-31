import { Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Reveal from "@modules/home/components/reveal"
import { getT } from "@i18n/get-t"

const categoryImages = [
  "https://assets.chicya.com/tee-black-front-01M1BG0BQRQ6MQHNBXGVQ1BNH5.png",
  "https://assets.chicya.com/sweatshirt-vintage-front-01M1BG0CJFS84NWN6X0TY9JHFE.png",
  "https://assets.chicya.com/sweatpants-gray-front-01M1BG0D7K9TVV04GJRX60Y00J.png",
  "https://assets.chicya.com/shorts-vintage-front-01M1BG0DQ9WPH1PP36JPVNZJ6B.png",
]

const CategoryGrid = async ({ locale }: { locale: string }) => {
  const { t, dict } = await getT(locale)
  const categories = (
    dict.home.categoryGrid.items as { name: string; alt: string }[]
  ).map((category, i) => ({ ...category, image: categoryImages[i] }))

  return (
    <section
      aria-label={t("home.categoryGrid.aria")}
      className="w-full py-16 small:py-24 content-container"
    >
      <Reveal className="flex flex-col items-center text-center mb-12 gap-3">
        <p className="text-xs uppercase tracking-[0.35em] text-chicya-gold">
          {t("home.categoryGrid.eyebrow")}
        </p>
        <Heading
          level="h2"
          className="text-3xl small:text-4xl text-chicya-ink uppercase tracking-[0.15em]"
        >
          {t("home.categoryGrid.title")}
        </Heading>
      </Reveal>

      <ul className="grid grid-cols-2 small:grid-cols-4 gap-x-4 gap-y-4 small:gap-x-6">
        {categories.map((category, i) => (
          <li key={category.name}>
            <Reveal delay={i * 90}>
              <LocalizedClientLink
                href="/store"
                className="group relative block aspect-[3/4] overflow-hidden bg-chicya-cream"
              >
                <img
                  src={category.image}
                  alt={category.alt}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0 opacity-80 transition-opacity duration-300 group-hover:opacity-95" />
                <span className="absolute bottom-0 left-0 w-full p-5 text-white">
                  <span className="block text-lg small:text-xl font-semibold uppercase tracking-[0.15em]">
                    {category.name}
                  </span>
                  <span className="mt-1 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-white/70 group-hover:text-chicya-gold transition-colors">
                    {t("home.categoryGrid.shopTheDrop")} <span aria-hidden="true">→</span>
                  </span>
                </span>
              </LocalizedClientLink>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default CategoryGrid