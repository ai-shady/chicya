import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <div className="flex flex-col w-full">
      <div className="w-full bg-chicya-cream border-b border-ui-border-base">
        <div className="content-container py-12 small:py-16 flex flex-col items-center text-center gap-3">
          <p className="text-xs uppercase tracking-[0.35em] text-chicya-gold">
            The full collection
          </p>
          <h1
            className="text-3xl small:text-5xl text-chicya-ink uppercase tracking-[0.15em]"
            data-testid="store-page-title"
          >
            All products
          </h1>
          <p className="text-sm text-chicya-ink/70">
            Statement silhouettes. Everyday comfort. Be bold. Be CHICYA.
          </p>
        </div>
      </div>
      <div
        className="flex flex-col small:flex-row small:items-start py-6 content-container"
        data-testid="category-container"
      >
        <RefinementList sortBy={sort} />
        <div className="w-full">
          <Suspense fallback={<SkeletonProductGrid />}>
            <PaginatedProducts
              sortBy={sort}
              page={pageNumber}
              countryCode={countryCode}
            />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default StoreTemplate
