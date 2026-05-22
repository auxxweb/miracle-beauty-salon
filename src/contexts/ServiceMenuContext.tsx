import { createContext, useContext, type ReactNode } from 'react'
import { useServiceMenu, type UseServiceMenuResult } from '@/hooks/useServiceMenu'

const ServiceMenuContext = createContext<UseServiceMenuResult | null>(null)

export function ServiceMenuProvider({ children }: { children: ReactNode }) {
  const value = useServiceMenu()
  return <ServiceMenuContext.Provider value={value}>{children}</ServiceMenuContext.Provider>
}

export function useServiceMenuContext(): UseServiceMenuResult {
  const ctx = useContext(ServiceMenuContext)
  if (!ctx) {
    throw new Error('useServiceMenuContext must be used within ServiceMenuProvider')
  }
  return ctx
}
