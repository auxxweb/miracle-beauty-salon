import { useCallback, useEffect, useMemo, useState } from 'react'
import { peekOffers, refreshOffers, getActiveOffers } from '@/api/offers'
import { groupOffersByCategory, type SalonOffer } from '@/data/offers'

export type UseOffersResult = {
  offers: SalonOffer[]
  activeOffers: SalonOffer[]
  groups: ReturnType<typeof groupOffersByCategory>
  isLoading: boolean
  isRefreshing: boolean
  isError: boolean
  errorMessage: string | null
  isOffline: boolean
  refetch: () => void
}

export function useOffers(): UseOffersResult {
  const initial = peekOffers()
  const [offers, setOffers] = useState<SalonOffer[]>(initial ?? [])
  const [activeOffers, setActiveOffers] = useState<SalonOffer[]>(
    initial ? getActiveOffers(initial) : [],
  )
  const [isLoading, setIsLoading] = useState(!initial?.length)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isOffline, setIsOffline] = useState(false)

  const syncLive = useCallback(async () => {
    const hasCache = Boolean(peekOffers()?.length)
    if (!hasCache) setIsLoading(true)
    setIsRefreshing(hasCache)
    setIsError(false)
    setIsOffline(false)
    setErrorMessage(null)

    try {
      const result = await refreshOffers()
      if (!result.unchanged) {
        setOffers(result.items)
      }
      setActiveOffers(result.activeItems)
      setIsOffline(result.source === 'offline')
    } catch (err) {
      setOffers([])
      setActiveOffers([])
      setIsError(true)
      setErrorMessage(err instanceof Error ? err.message : 'Could not load offers')
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

  const groups = useMemo(() => groupOffersByCategory(activeOffers), [activeOffers])

  return {
    offers,
    activeOffers,
    groups,
    isLoading,
    isRefreshing,
    isError,
    errorMessage,
    isOffline,
    refetch: syncLive,
  }
}
