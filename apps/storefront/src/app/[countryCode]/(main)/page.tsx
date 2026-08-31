import { Metadata } from "next"

import CategoryGrid from "@modules/home/components/category-grid"
import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import Marquee from "@modules/home/components/marquee"
import Newsletter from "@modules/home/components/newsletter"
import PromoBanners from "@modules/home/components/promo-banners"
import Story from "@modules/home/components/story"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "CHICYA — Be bold. Be CHICYA.",
  description:
    "CHICYA is a bold fashion store. Statement silhouettes, everyday comfort. Be bold. Be CHICYA.",
  keywords: [
    "CHICYA",
    "fashion",
    "clothing",
    "streetwear",
    "sweatshirts",
    "t-shirts",
  ],
  openGraph: {
    title: "CHICYA — Be bold. Be CHICYA.",
    description:
      "CHICYA is a bold fashion store. Statement silhouettes, everyday comfort. Be bold. Be CHICYA.",
    type: "website",
  },
}

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "OnlineStore",
  name: "CHICYA",
  slogan: "Be bold. Be CHICYA.",
  url: "https://www.chicya.com",
  logo: "https://assets.chicya.com/hero-cream-01M1BG6FHH5CQX13956ARDB5SR.jpg",
  description:
    "CHICYA is a bold fashion store. Statement silhouettes, everyday comfort.",
  sameAs: [],
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <Hero />
      <Marquee />
      <CategoryGrid />
      <PromoBanners />
      <div className="py-4">
        <FeaturedProducts countryCode={countryCode} region={region} />
      </div>
      <Story />
      <Newsletter />
    </>
  )
}