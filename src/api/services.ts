import { GOOGLE_SHEETS_SERVICES_API_URL } from '@/config/forms'
import { extractSheetRows, liveSheetUrl } from '@/api/sheetResponse'
import type { ServiceAudience, ServiceCostUnit, ServiceMenuItem } from '@/data/serviceMenu'

const STORAGE_KEY = 'mbs-service-menu-v2'

export type SheetServiceRow = {
  service_name: string
  avg_time: string
  cost: string
  cost_unit: string
  category_service_name: string
  category_service_type: string
}

type StoredPayload = {
  items: ServiceMenuItem[]
  fingerprint: string
}

let memoryItems: ServiceMenuItem[] | null = null
let memoryFingerprint: string | null = null
let inflightLive: Promise<ServiceMenuItem[]> | null = null

function parseCost(value: string): number {
  const n = Number(String(value).replace(/[^\d.]/g, ''))
  return Number.isFinite(n) ? n : 0
}

function parseMinutes(value: string): number {
  const trimmed = String(value).trim()
  if (!trimmed) return 0
  const asNumber = Number(trimmed)
  if (Number.isFinite(asNumber) && asNumber > 0) return Math.round(asNumber)
  const hourMatch = trimmed.match(/(\d+(?:\.\d+)?)\s*h(?:ou)?r/i)
  if (hourMatch) return Math.round(Number(hourMatch[1]) * 60)
  const minMatch = trimmed.match(/(\d+)\s*min/i)
  if (minMatch) return Number(minMatch[1])
  return 0
}

function normalizeCostUnit(value: string): ServiceCostUnit {
  return String(value).trim().toLowerCase() === 'fixed' ? 'Fixed' : 'From'
}

function normalizeAudience(value: string): ServiceAudience {
  const v = String(value).trim().toLowerCase()
  if (v === 'men' || v === 'man' || v === 'male') return 'Men'
  if (v === 'women' || v === 'woman' || v === 'female') return 'Women'
  return 'Unisex'
}

export function mapSheetRowToMenuItem(row: SheetServiceRow): ServiceMenuItem | null {
  const serviceName = row.service_name?.trim()
  if (!serviceName) return null

  const category = row.category_service_name?.trim() || 'General'

  return {
    serviceName,
    avgTimeMinutes: parseMinutes(row.avg_time),
    avgTimeLabel: row.avg_time?.trim() || '',
    costInr: parseCost(row.cost),
    costUnit: normalizeCostUnit(row.cost_unit),
    category: category === 'default' ? 'General' : category,
    audience: normalizeAudience(row.category_service_type),
  }
}

/** Compact fingerprint — skip re-renders when sheet data unchanged. */
export function fingerprintServices(items: ServiceMenuItem[]): string {
  let hash = items.length
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    hash =
      (hash * 31 +
        item.costInr +
        item.avgTimeMinutes +
        item.serviceName.length +
        item.category.length) >>>
      0
  }
  return `${items.length}:${hash}`
}

function isSheetRow(row: unknown): row is SheetServiceRow {
  return Boolean(row && typeof row === 'object' && 'service_name' in row)
}

function readStorage(): StoredPayload | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as StoredPayload
    if (!parsed?.fingerprint || !Array.isArray(parsed.items) || parsed.items.length === 0) {
      return null
    }
    return parsed
  } catch {
    return null
  }
}

function persist(items: ServiceMenuItem[]): void {
  const fingerprint = fingerprintServices(items)
  memoryItems = items
  memoryFingerprint = fingerprint
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ items, fingerprint }))
  } catch {
    /* private mode / quota */
  }
}

/** Instant read — memory, then last successful sheet snapshot (no expiry). */
export function peekServices(): ServiceMenuItem[] | null {
  if (memoryItems?.length) return memoryItems
  const stored = readStorage()
  if (stored) {
    memoryItems = stored.items
    memoryFingerprint = stored.fingerprint
    return stored.items
  }
  return null
}

function liveApiUrl(): string {
  return liveSheetUrl(GOOGLE_SHEETS_SERVICES_API_URL)
}

async function fetchLive(): Promise<ServiceMenuItem[]> {
  const response = await fetch(liveApiUrl(), {
    method: 'GET',
    cache: 'no-store',
    headers: { Accept: 'application/json' },
  })

  if (!response.ok) {
    throw new Error(`Services API returned ${response.status}`)
  }

  const payload: unknown = await response.json()
  const rows = extractSheetRows(payload, isSheetRow)

  const items = rows
    .map(mapSheetRowToMenuItem)
    .filter((item): item is ServiceMenuItem => item != null)

  if (items.length === 0) {
    throw new Error('No services returned from Google Sheets')
  }

  return items
}

/**
 * Always fetches live sheet data. Reuses one in-flight request per page load.
 */
export function fetchLiveServices(): Promise<ServiceMenuItem[]> {
  if (!inflightLive) {
    inflightLive = fetchLive()
      .then((items) => {
        const nextPrint = fingerprintServices(items)
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

export type RefreshServicesResult = {
  items: ServiceMenuItem[]
  /** True when returned items match the previous snapshot (no UI churn). */
  unchanged: boolean
  source: 'live' | 'offline'
}

/**
 * Stale-while-revalidate: show peekServices() immediately, then call this for live data.
 */
export async function refreshServices(): Promise<RefreshServicesResult> {
  const previousPrint = memoryFingerprint ?? readStorage()?.fingerprint ?? null

  try {
    const items = await fetchLiveServices()
    const nextPrint = fingerprintServices(items)
    return {
      items,
      unchanged: previousPrint === nextPrint,
      source: 'live',
    }
  } catch (error) {
    const cached = peekServices()
    if (cached) {
      return { items: cached, unchanged: true, source: 'offline' }
    }
    const message =
      error instanceof Error ? error.message : 'Could not load services from Google Sheets'
    throw new Error(message)
  }
}

export function getCategoryOrder(items: ServiceMenuItem[]): string[] {
  const seen = new Set<string>()
  const order: string[] = []
  for (const item of items) {
    if (!seen.has(item.category)) {
      seen.add(item.category)
      order.push(item.category)
    }
  }
  return order
}
