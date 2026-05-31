import { GOOGLE_SHEETS_OFFERS_API_URL } from '@/config/forms'
import { extractSheetRows, liveSheetUrl } from '@/api/sheetResponse'
import {
  fingerprintOffers,
  isOfferActive,
  sortOffers,
  type SalonOffer,
} from '@/data/offers'

export type SheetOfferRow = {
  offer_type: string
  offer_category: string
  offer_name: string
  offer_price: string | number
  additional_note: string
  image_url: string
  display_order: string | number
  status: string
}

const STORAGE_KEY = 'mbs-offers-v1'

type StoredPayload = {
  items: SalonOffer[]
  fingerprint: string
}

let memoryItems: SalonOffer[] | null = null
let memoryFingerprint: string | null = null
let inflightLive: Promise<SalonOffer[]> | null = null

function parsePrice(value: string | number): number {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  const n = Number(String(value).replace(/[^\d.]/g, ''))
  return Number.isFinite(n) ? n : 0
}

function parseOrder(value: string | number): number {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  const n = Number(String(value).trim())
  return Number.isFinite(n) ? n : 9999
}

export function mapSheetRowToOffer(row: SheetOfferRow): SalonOffer | null {
  const offerName = row.offer_name?.trim()
  if (!offerName) return null

  return {
    offerType: row.offer_type?.trim() || 'Offer',
    offerCategory: row.offer_category?.trim() || 'General',
    offerName,
    offerPrice: parsePrice(row.offer_price),
    additionalNote: row.additional_note?.trim() || '',
    imageUrl: row.image_url?.trim() || '',
    displayOrder: parseOrder(row.display_order),
    status: row.status?.trim() || 'Active',
  }
}

function isSheetOfferRow(row: unknown): row is SheetOfferRow {
  return Boolean(row && typeof row === 'object' && 'offer_name' in row)
}

function readStorage(): StoredPayload | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as StoredPayload
    if (!parsed?.fingerprint || !Array.isArray(parsed.items)) return null
    return parsed
  } catch {
    return null
  }
}

function persist(items: SalonOffer[]): void {
  const fingerprint = fingerprintOffers(items)
  memoryItems = items
  memoryFingerprint = fingerprint
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ items, fingerprint }))
  } catch {
    /* private mode */
  }
}

export function peekOffers(): SalonOffer[] | null {
  if (memoryItems?.length) return memoryItems
  const stored = readStorage()
  if (stored) {
    memoryItems = stored.items
    memoryFingerprint = stored.fingerprint
    return stored.items
  }
  return null
}

export function getActiveOffers(offers: SalonOffer[]): SalonOffer[] {
  return sortOffers(offers.filter(isOfferActive))
}

async function fetchLive(): Promise<SalonOffer[]> {
  const response = await fetch(liveSheetUrl(GOOGLE_SHEETS_OFFERS_API_URL), {
    method: 'GET',
    cache: 'no-store',
    headers: { Accept: 'application/json' },
  })

  if (!response.ok) {
    throw new Error(`Offers API returned ${response.status}`)
  }

  const payload: unknown = await response.json()
  const rows = extractSheetRows(payload, isSheetOfferRow)

  const items = rows
    .map(mapSheetRowToOffer)
    .filter((item): item is SalonOffer => item != null)

  if (items.length === 0) {
    throw new Error('No offers returned from Google Sheets')
  }

  return items
}

export function fetchLiveOffers(): Promise<SalonOffer[]> {
  if (!inflightLive) {
    inflightLive = fetchLive()
      .then((items) => {
        const nextPrint = fingerprintOffers(items)
        if (nextPrint !== memoryFingerprint) {
          persist(items)
        }
        return items
      })
      .finally(() => {
        inflightLive = null
      })
  }
  return inflightLive
}

export type RefreshOffersResult = {
  items: SalonOffer[]
  activeItems: SalonOffer[]
  unchanged: boolean
  source: 'live' | 'offline'
}

export async function refreshOffers(): Promise<RefreshOffersResult> {
  const previousPrint = memoryFingerprint ?? readStorage()?.fingerprint ?? null

  try {
    const items = await fetchLiveOffers()
    const nextPrint = fingerprintOffers(items)
    const activeItems = getActiveOffers(items)
    return {
      items,
      activeItems,
      unchanged: previousPrint === nextPrint,
      source: 'live',
    }
  } catch (error) {
    const cached = peekOffers()
    if (cached) {
      return {
        items: cached,
        activeItems: getActiveOffers(cached),
        unchanged: true,
        source: 'offline',
      }
    }
    const message =
      error instanceof Error ? error.message : 'Could not load offers from Google Sheets'
    throw new Error(message)
  }
}
