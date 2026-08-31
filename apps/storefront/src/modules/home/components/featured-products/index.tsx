import { Heading, Text } from "@medusajs/ui"
import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductPreview from "@modules/products/components/product-preview"
import Reveal from "@modules/home/components/reveal"

export default async function FeaturedProducts({
  countryCode,
  region,
}: {
  countryCode: string
  region: HttpTypes.StoreRegion
}) {
  const {
    response: { products },
  } = await listProducts({
    countryCode,
    queryParams: {
      limit: 4,
      fields: "*variants.calculated_price",
    },
  })

  if (!products?.length) {
    return null
  }

  return (
    <section
      aria-label="Featured products"
      className="w-full py-16 small:py-24 content-container"
    >
      <Reveal className="flex flex-col items-center text-center mb-12 gap-3">
        <p className="text-xs uppercase tracking-[0.35em] text-chicya-gold">
          Featured
        </p>
        <Heading
          level="h2"
          className="text-3xl small:text-4xl text-chicya-ink uppercase tracking-[0.15em]"
        >
          The essentials
        </Heading>
      </Reveal>

      <ul className="grid grid-cols-2 small:grid-cols-4 gap-x-4 gap-y-12 small:gap-x-6 small:gap-y-16">
        {products.map((product, i) => (
          <li key={product.id}>
            <Reveal delay={i * 90}>
              <ProductPreview product={product} region={region} isFeatured />
            </Reveal>
          </li>
        ))}
      </ul>

      <Reveal className="flex justify-center mt-12">
        <LocalizedClientLink
          href="/store"
          className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.25em] text-chicya-ink border-b border-chicya-ink pb-1 hover:border-chicya-gold hover:text-chicya-gold transition-colors"
        >
          View all products <span aria-hidden="true">→</span>
        </LocalizedClientLink>
      </Reveal>
    </section>
  )
}