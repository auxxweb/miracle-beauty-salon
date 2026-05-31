import { site } from '@/data/site'

export type SalonOffer = {
  offerType: string
  offerCategory: string
  offerName: string
  offerPrice: number
  additionalNote: string
  imageUrl: string
  displayOrder: number
  status: string
}

export type OfferCategoryGroup = {
  category: string
  offers: SalonOffer[]
}

const priceFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

export function formatOfferPrice(price: number): string {
  return priceFormatter.format(price)
}

/** WhatsApp deep link to book a specific offer. */
export function offerWhatsAppUrl(offer: Pick<SalonOffer, 'offerType' | 'offerName'>): string {
  const text = encodeURIComponent(
    `Hi, I would like to book ${offer.offerType} — ${offer.offerName}.`,
  )
  return `https://wa.me/${site.phoneRaw}?text=${text}`
}

function isHttpUrl(value: string): boolean {
  return /^https?:\/\/.+/i.test(value.trim())
}

/** Returns image_url from Google Sheets when it is a valid http(s) link. */
export function getOfferImageUrl(offer: Pick<SalonOffer, 'imageUrl'>): string | null {
  const url = offer.imageUrl?.trim() ?? ''
  if (url && isHttpUrl(url)) {
    return url
  }
  return null
}

export function isOfferActive(offer: SalonOffer): boolean {
  return offer.status.trim().toLowerCase() === 'active'
}

export function sortOffers(offers: SalonOffer[]): SalonOffer[] {
  return [...offers].sort((a, b) => a.displayOrder - b.displayOrder || a.offerName.localeCompare(b.offerName))
}

export function fingerprintOffers(items: SalonOffer[]): string {
  let hash = items.length
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    hash = (hash * 31 + item.offerPrice + item.displayOrder + item.offerName.length) >>> 0
  }
  return `${items.length}:${hash}`
}

export function groupOffersByCategory(offers: SalonOffer[]): OfferCategoryGroup[] {
  const byCategory = new Map<string, SalonOffer[]>()
  for (const offer of offers) {
    const key = offer.offerCategory.trim() || 'General'
    const list = byCategory.get(key) ?? []
    list.push(offer)
    byCategory.set(key, list)
  }

  return [...byCategory.entries()]
    .sort(([a], [b]) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
    .map(([category, categoryOffers]) => ({
      category,
      offers: sortOffers(categoryOffers),
    }))
}
