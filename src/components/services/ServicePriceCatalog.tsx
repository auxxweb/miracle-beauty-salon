import { memo, useMemo } from 'react'
import {
  formatServicePrice,
  formatServiceTimeLabel,
  type ServiceMenuItem,
} from '@/data/serviceMenu'
import { useServiceMenuContext } from '@/contexts/ServiceMenuContext'
import { AUDIENCE_FILTERS, type ServiceMenuFilter } from '@/hooks/useServiceMenu'
import { ServiceCatalogSkeleton } from '@/components/services/ServiceCatalogSkeleton'

function categorySlug(category: string) {
  return category
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function displayCategory(category: string) {
  return category === 'default' ? 'General' : category
}

const AudienceBadge = memo(function AudienceBadge({
  audience,
}: {
  audience: ServiceMenuItem['audience']
}) {
  const styles =
    audience === 'Men'
      ? 'border-sky-500/40 text-sky-200/90'
      : audience === 'Women'
        ? 'border-pink-500/40 text-pink-200/90'
        : 'border-gold-subtle text-muted'

  return (
    <span
      className={`inline-block text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-sm border ${styles}`}
    >
      {audience}
    </span>
  )
})

const ServiceTableRow = memo(function ServiceTableRow({ item }: { item: ServiceMenuItem }) {
  const time = formatServiceTimeLabel(item)
  const price = formatServicePrice(item)

  return (
    <tr className="hover:bg-white/[0.02]">
      <td className="px-4 py-3 text-white font-light">{item.serviceName}</td>
      <td className="px-4 py-3 text-muted whitespace-nowrap">{time}</td>
      <td className="px-4 py-3 text-gold-light text-right whitespace-nowrap font-medium">
        {price}
      </td>
    </tr>
  )
})

const ServiceMobileCard = memo(function ServiceMobileCard({ item }: { item: ServiceMenuItem }) {
  const time = formatServiceTimeLabel(item)
  const price = formatServicePrice(item)

  return (
    <li className="p-4 bg-surface/50 border border-gold-subtle rounded-sm">
      <p className="text-white font-light mb-2">{item.serviceName}</p>
      <div className="flex items-center justify-between gap-3 text-sm mb-2">
        <span className="text-muted">{time}</span>
        <AudienceBadge audience={item.audience} />
      </div>
      <p className="text-gold-light font-medium text-sm">{price}</p>
    </li>
  )
})

function FilterBar({
  filter,
  onFilter,
}: {
  filter: ServiceMenuFilter
  onFilter: (f: ServiceMenuFilter) => void
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {AUDIENCE_FILTERS.map((value) => (
        <button
          key={value}
          type="button"
          onClick={() => onFilter(value)}
          aria-pressed={filter === value}
          className={`px-4 py-2 text-[10px] md:text-xs tracking-[0.2em] uppercase rounded-sm border transition-colors min-h-10 ${
            filter === value
              ? 'border-gold/50 text-white bg-gold/10'
              : 'border-gold-subtle text-muted hover:text-white hover:border-gold/40'
          }`}
        >
          {value === 'All' ? 'All services' : value}
        </button>
      ))}
    </div>
  )
}

export function ServicePriceCatalog() {
  const {
    groups,
    categories,
    filter,
    setFilter,
    isLoading,
    isRefreshing,
    isError,
    errorMessage,
    isOffline,
    refetch,
    items,
  } = useServiceMenuContext()

  const categoryNav = useMemo(
    () => categories.map((cat) => ({ id: categorySlug(cat), label: displayCategory(cat) })),
    [categories],
  )

  if (isLoading) {
    return <ServiceCatalogSkeleton />
  }

  if (isError) {
    return (
      <div
        role="alert"
        className="rounded-sm border border-red-500/30 bg-red-500/10 px-6 py-10 text-center max-w-lg mx-auto"
      >
        <p className="text-white font-light mb-2">Unable to load services</p>
        <p className="text-sm text-muted mb-6">{errorMessage}</p>
        <p className="text-xs text-muted mb-6">
          Pricing is loaded from Google Sheets. Check that the sheet is published and the Apps
          Script web app is deployed with access set to Anyone.
        </p>
        <button
          type="button"
          onClick={refetch}
          className="text-xs tracking-widest uppercase text-gold-light hover:text-white underline underline-offset-4"
        >
          Try again
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-10">
      {(isRefreshing || isOffline) && (
        <p
          role="status"
          className="text-center text-[10px] tracking-widest uppercase text-muted"
          aria-live="polite"
        >
          {isRefreshing ? 'Updating prices from Google Sheets…' : 'Offline — showing last saved prices.'}
        </p>
      )}

      <FilterBar filter={filter} onFilter={setFilter} />

      {items.length === 0 ? (
        <p className="text-center text-muted py-12">No services match this filter.</p>
      ) : (
        <div className="space-y-14">
          {categoryNav.length > 0 && (
            <div className="sticky top-[4.5rem] z-20 -mx-5 px-5 py-3 bg-black/95 backdrop-blur-md border-y border-gold-subtle md:static md:mx-0 md:px-0 md:py-0 md:bg-transparent md:border-0 md:backdrop-blur-none">
              <p className="text-xs tracking-[0.25em] uppercase text-gold-light mb-3 md:text-center">
                Jump to category
              </p>
              <div className="flex gap-2 overflow-x-auto pb-1 md:flex-wrap md:justify-center md:overflow-visible">
                {categoryNav.map(({ id, label }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      document.getElementById(id)?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                      })
                    }}
                    className="shrink-0 px-3 py-2 text-[10px] md:text-xs tracking-[0.15em] uppercase rounded-sm border border-gold-subtle text-muted hover:text-white hover:border-gold/40 transition-colors min-h-10 max-w-[14rem] truncate"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {groups.map(({ category, items: categoryItems }) => (
            <section
              key={category}
              id={categorySlug(category)}
              className="scroll-mt-28"
              aria-labelledby={`cat-${categorySlug(category)}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-6 pb-4 border-b border-gold-subtle">
                <h2
                  id={`cat-${categorySlug(category)}`}
                  className="font-serif text-xl md:text-2xl text-white"
                >
                  {displayCategory(category)}
                </h2>
                <p className="text-xs text-muted tracking-wide">
                  {categoryItems.length} service{categoryItems.length === 1 ? '' : 's'}
                </p>
              </div>

              <div className="hidden md:block overflow-x-auto rounded-sm border border-gold-subtle">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="bg-surface/80 text-xs tracking-widest uppercase text-gold-light">
                      <th className="px-4 py-3 font-medium w-[50%]">Service</th>
                      <th className="px-4 py-3 font-medium w-[25%]">Avg. time</th>
                      <th className="px-4 py-3 font-medium w-[25%] text-right">Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gold-subtle/60">
                    {categoryItems.map((item, i) => (
                      <ServiceTableRow key={`${item.serviceName}-${i}`} item={item} />
                    ))}
                  </tbody>
                </table>
              </div>

              <ul className="md:hidden space-y-3">
                {categoryItems.map((item, i) => (
                  <ServiceMobileCard key={`${item.serviceName}-${i}`} item={item} />
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
