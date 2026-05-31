export type SheetApiResponse<T> = {
  success?: boolean
  sheet?: string
  total?: number
  data?: T[]
  message?: string
}

/** Parse `{ success, data: [...] }` or a plain array from Apps Script. */
export function extractSheetRows<T>(payload: unknown, rowGuard: (row: unknown) => row is T): T[] {
  if (Array.isArray(payload)) {
    return payload.filter(rowGuard)
  }

  if (payload && typeof payload === 'object') {
    const wrapped = payload as SheetApiResponse<T>
    if (wrapped.success === false && wrapped.message) {
      throw new Error(wrapped.message)
    }
    if (Array.isArray(wrapped.data)) {
      return wrapped.data.filter(rowGuard)
    }
  }

  throw new Error('Invalid response from Google Sheets')
}

export function liveSheetUrl(base: string): string {
  const sep = base.includes('?') ? '&' : '?'
  return `${base}${sep}_=${Date.now()}`
}
