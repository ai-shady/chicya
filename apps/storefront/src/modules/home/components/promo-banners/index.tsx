import { Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Reveal from "@modules/home/components/reveal"

const banners = [
  {
    image: "https://assets.chicya.com/ad3-01M1BG6HKBSZ57TTRGSZ37ASG3.jpg",
    alt: "Cream knit sweater styling",
    eyebrow: "New season drop",
    title: "Soft knits, bold color",
    cta: "Shop Sweatshirts",
    href: "/store",
  },
  {
    image: "https://assets.chicya.com/ad5-01M1BG6MET05YDRGX0Y3V941XK.jpg",
    alt: "Beige knitwear in the city",
    eyebrow: "Shop the edit",
    title: "City walks, warm layers",
    cta: "Shop Shirts",
    href: "/store",
  },
]

const PromoBanners = () => {
  return (
    <section
      aria-label="Featured promotions"
      className="w-full pb-16 small:pb-24 content-container"
    >
      <div className="grid grid-cols-1 small:grid-cols-2 gap-x-6 gap-y-6">
        {banners.map((banner, i) => (
          <Reveal key={banner.title} delay={i * 120}>
            <LocalizedClientLink
              href={banner.href}
              className="group relative block aspect-[4/5] small:aspect-[4/4.4] overflow-hidden bg-chicya-cream"
            >
              <img
                src={banner.image}
                alt={banner.alt}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 p-7 small:p-10 max-w-md">
                <p className="text-xs uppercase tracking-[0.3em] text-chicya-gold mb-3">
                  {banner.eyebrow}
                </p>
                <Heading
                  level="h3"
                  className="text-2xl small:text-3xl text-white font-semibold uppercase tracking-[0.1em] mb-4"
                >
                  {banner.title}
                </Heading>
                <span className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.25em] text-white border-b border-white/50 pb-1 group-hover:border-chicya-gold group-hover:text-chicya-gold transition-colors">
                  {banner.cta} <span aria-hidden="true">→</span>
                </span>
              </div>
            </LocalizedClientLink>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export default PromoBanners