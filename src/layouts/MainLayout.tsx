import { lazy, Suspense } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat'

const ScrollToTopFloat = lazy(() =>
  import('@/components/layout/ScrollToTopFloat').then((m) => ({ default: m.ScrollToTopFloat })),
)

export function MainLayout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Suspense fallback={null}>
        <ScrollToTopFloat />
      </Suspense>
      <WhatsAppFloat />
    </div>
  )
}
