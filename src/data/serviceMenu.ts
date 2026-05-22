export type ServiceCostUnit = 'From' | 'Fixed'

export type ServiceAudience = 'Unisex' | 'Women' | 'Men'

export type ServiceMenuItem = {
  serviceName: string
  avgTimeMinutes: number
  /** Raw duration from sheet when not a plain minute number (e.g. "2 Hours"). */
  avgTimeLabel?: string
  costInr: number
  costUnit: ServiceCostUnit
  category: string
  audience: ServiceAudience
}

export type ServiceMenuCategoryGroup = {
  category: string
  items: ServiceMenuItem[]
}

export function groupServiceMenuByCategory(
  menu: ServiceMenuItem[],
  categoryOrder?: string[],
): ServiceMenuCategoryGroup[] {
  const byCategory = new Map<string, ServiceMenuItem[]>()
  for (const item of menu) {
    const list = byCategory.get(item.category) ?? []
    list.push(item)
    byCategory.set(item.category, list)
  }

  const keys = categoryOrder?.length
    ? categoryOrder.filter((c) => byCategory.has(c))
    : [...byCategory.keys()].sort((a, b) =>
        a.localeCompare(b, undefined, { sensitivity: 'base' }),
      )

  const missing = [...byCategory.keys()].filter((k) => !keys.includes(k))
  const orderedKeys = [
    ...keys,
    ...missing.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' })),
  ]

  return orderedKeys.map((category) => ({
    category,
    items: byCategory.get(category) ?? [],
  }))
}

const inrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

export function formatServicePrice(item: Pick<ServiceMenuItem, 'costInr' | 'costUnit'>): string {
  const amount = inrFormatter.format(item.costInr)
  return `${amount} ${item.costUnit}`
}

export function formatServiceDuration(minutes: number): string {
  if (minutes < 60) return `~${minutes} min`
  const hrs = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (mins === 0) return `~${hrs} hr`
  return `~${hrs} hr ${mins} min`
}

/** Compact duration for the live price list (e.g. "30 min", "2 hr"). */
export function formatServiceTimeLabel(
  item: Pick<ServiceMenuItem, 'avgTimeMinutes' | 'avgTimeLabel'>,
): string {
  if (item.avgTimeLabel) {
    const label = item.avgTimeLabel.trim()
    if (/min|hr|hour/i.test(label)) return label
    if (item.avgTimeMinutes > 0) return formatServiceTimeFromMinutes(item.avgTimeMinutes)
    return label
  }
  if (item.avgTimeMinutes > 0) return formatServiceTimeFromMinutes(item.avgTimeMinutes)
  return '—'
}

function formatServiceTimeFromMinutes(minutes: number): string {
  if (minutes < 60) return `${minutes} min`
  const hrs = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (mins === 0) return hrs === 1 ? '1 hr' : `${hrs} hr`
  return `${hrs} hr ${mins} min`
}
