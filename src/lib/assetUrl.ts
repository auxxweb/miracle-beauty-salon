/**
 * Resolve a public-folder path for the current Vite base URL.
 */
export function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL
  const normalized = path.startsWith('/') ? path.slice(1) : path
  return `${base}${normalized}`
}
