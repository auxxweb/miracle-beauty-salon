import { createContext, useContext, type ReactNode } from 'react'
import { useOffers, type UseOffersResult } from '@/hooks/useOffers'

const OffersContext = createContext<UseOffersResult | null>(null)

export function OffersProvider({ children }: { children: ReactNode }) {
  const value = useOffers()
  return <OffersContext.Provider value={value}>{children}</OffersContext.Provider>
}

export function useOffersContext(): UseOffersResult {
  const ctx = useContext(OffersContext)
  if (!ctx) {
    throw new Error('useOffersContext must be used within OffersProvider')
  }
  return ctx
}
