import { useCallback, useEffect, useMemo, useState } from 'react'
import { peekServices, refreshServices, getCategoryOrder } from '@/api/services'
import {
  groupServiceMenuByCategory,
  type ServiceAudience,
  type ServiceMenuCategoryGroup,
  type ServiceMenuItem,
} from '@/data/serviceMenu'

export type ServiceMenuFilter = 'All' | ServiceAudience

export type UseServiceMenuResult = {
  items: ServiceMenuItem[]
  groups: ServiceMenuCategoryGroup[]
  categories: string[]
  filter: ServiceMenuFilter
  setFilter: (filter: ServiceMenuFilter) => void
  /** True only when there is nothing to show yet (first visit, no cache). */
  isLoading: boolean
  /** Background fetch to Google Sheets in progress. */
  isRefreshing: boolean
  isError: boolean
  errorMessage: string | null
  isOffline: boolean
  refetch: () => void
}

const AUDIENCE_FILTERS: ServiceMenuFilter[] = ['All', 'Unisex', 'Women', 'Men']

export { AUDIENCE_FILTERS }

export function useServiceMenu(): UseServiceMenuResult {
  const initial = peekServices()
  const [items, setItems] = useState<ServiceMenuItem[]>(initial ?? [])
  const [filter, setFilter] = useState<ServiceMenuFilter>('All')
  const [isLoading, setIsLoading] = useState(!initial?.length)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isOffline, setIsOffline] = useState(false)

  const syncLive = useCallback(async () => {
    const hasCache = Boolean(peekServices()?.length)
    if (!hasCache) setIsLoading(true)
    setIsRefreshing(hasCache)
    setIsError(false)
    setIsOffline(false)
    setErrorMessage(null)

    try {
      const result = await refreshServices()
      if (!result.unchanged) {
        setItems(result.items)
      }
      setIsOffline(result.source === 'offline')
    } catch (err) {
      setItems([])
      setIsError(true)
      setErrorMessage(
        err instanceof Error ? err.message : 'Could not load services from Google Sheets',
      )
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }, [])

  useEffect(() => {
    syncLive()
  }, [syncLive])

  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === 'visible') syncLive()
    }
    document.addEventListener('visibilitychange', onVisible)
    return () => document.removeEventListener('visibilitychange', onVisible)
  }, [syncLive])

  const filteredItems = useMemo(() => {
    if (filter === 'All') return items
    return items.filter((item) => item.audience === filter)
  }, [items, filter])

  const categories = useMemo(() => getCategoryOrder(filteredItems), [filteredItems])

  const groups = useMemo(
    () => groupServiceMenuByCategory(filteredItems, categories),
    [filteredItems, categories],
  )

  return {
    items: filteredItems,
    groups,
    categories,
    filter,
    setFilter,
    isLoading,
    isRefreshing,
    isError,
    errorMessage,
    isOffline,
    refetch: syncLive,
  }
}
