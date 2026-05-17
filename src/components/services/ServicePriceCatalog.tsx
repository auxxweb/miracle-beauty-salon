import { useMemo } from 'react'
import {
  groupServiceMenuByCategory,
  serviceMenuCategories,
  formatServiceDuration,
  formatServicePrice,
  type ServiceMenuItem,
} from '@/data/serviceMenu'

function categorySlug(category: string) {
  return category
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function displayCategory(category: string) {
  return category === 'default' ? 'General' : category
}

function serviceDescription(item: ServiceMenuItem) {
  return `Approx. ${formatServiceDuration(item.avgTimeMinutes).replace(/^~/, '')} · ${item.audience}`
}

function AudienceBadge({ audience }: { audience: ServiceMenuItem['audience'] }) {
  const styles =
    audience === 'Men'
      ? 'border-sky-500/40 text-sky-200/90'
      : audience === 'Women'
        ? 'border-pink-500/40 text-pink-200/90'
        : 'border-gold-subtle text-muted'

  return (
    <span className={`inline-block text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-sm border ${styles}`}>
      {audience}
    </span>
  )
}

export function ServicePriceCatalog() {
  const groups = useMemo(() => groupServiceMenuByCategory(), [])

  return (
    <div className="space-y-14">
      <div className="sticky top-[4.5rem] z-20 -mx-5 px-5 py-3 bg-black/95 backdrop-blur-md border-y border-gold-subtle md:static md:mx-0 md:px-0 md:py-0 md:bg-transparent md:border-0 md:backdrop-blur-none">
        <p className="text-xs tracking-[0.25em] uppercase text-gold-light mb-3 md:text-center">
          Jump to category
        </p>
        <div className="flex gap-2 overflow-x-auto pb-1 md:flex-wrap md:justify-center md:overflow-visible">
          {serviceMenuCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                document
                  .getElementById(categorySlug(cat))
                  ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
              className="shrink-0 px-3 py-2 text-[10px] md:text-xs tracking-[0.15em] uppercase rounded-sm border border-gold-subtle text-muted hover:text-white hover:border-gold/40 transition-colors min-h-10 max-w-[14rem] truncate"
            >
              {displayCategory(cat)}
            </button>
          ))}
        </div>
      </div>

      {groups.map(({ category, items }) => (
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
            <p className="text-xs text-muted tracking-wide">{items.length} services</p>
          </div>

          <div className="hidden md:block overflow-x-auto rounded-sm border border-gold-subtle">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-surface/80 text-xs tracking-widest uppercase text-gold-light">
                  <th className="px-4 py-3 font-medium w-[45%]">Service</th>
                  <th className="px-4 py-3 font-medium w-[35%]">Description</th>
                  <th className="px-4 py-3 font-medium w-[20%] text-right">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold-subtle/60">
                {items.map((item, i) => (
                  <tr key={`${item.serviceName}-${i}`} className="hover:bg-white/[0.02]">
                    <td className="px-4 py-3 text-white font-light">{item.serviceName}</td>
                    <td className="px-4 py-3 text-muted">
                      <p className="mb-1.5">{serviceDescription(item)}</p>
                      <AudienceBadge audience={item.audience} />
                    </td>
                    <td className="px-4 py-3 text-gold-light text-right whitespace-nowrap font-medium">
                      {formatServicePrice(item)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="md:hidden space-y-3">
            {items.map((item, i) => (
              <li
                key={`${item.serviceName}-${i}`}
                className="p-4 bg-surface/50 border border-gold-subtle rounded-sm"
              >
                <p className="text-white font-light mb-2">{item.serviceName}</p>
                <p className="text-xs text-muted mb-3">{serviceDescription(item)}</p>
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-muted">{formatServiceDuration(item.avgTimeMinutes)}</span>
                  <span className="text-gold-light font-medium">{formatServicePrice(item)}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
