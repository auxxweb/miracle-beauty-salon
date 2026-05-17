import { lazy, Suspense } from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ToastProvider } from '@/components/ui/Toast'
import { MainLayout } from '@/layouts/MainLayout'

const HomePage = lazy(() =>
  import('@/pages/HomePage').then((m) => ({ default: m.HomePage })),
)
const ServicesPage = lazy(() =>
  import('@/pages/ServicesPage').then((m) => ({ default: m.ServicesPage })),
)
const AboutPage = lazy(() =>
  import('@/pages/AboutPage').then((m) => ({ default: m.AboutPage })),
)
const GalleryPage = lazy(() =>
  import('@/pages/GalleryPage').then((m) => ({ default: m.GalleryPage })),
)
const ContactPage = lazy(() =>
  import('@/pages/ContactPage').then((m) => ({ default: m.ContactPage })),
)
const ServiceCategoryPage = lazy(() =>
  import('@/pages/ServiceCategoryPage').then((m) => ({ default: m.ServiceCategoryPage })),
)

function PageLoader() {
  return (
    <div
      className="flex min-h-[50vh] items-center justify-center"
      role="status"
      aria-label="Loading page"
    >
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-gold/25 border-t-gold" />
    </div>
  )
}

export default function App() {
  return (
    <HashRouter>
      <ToastProvider>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="services" element={<ServicesPage />} />
              <Route path="services/:slug" element={<ServiceCategoryPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="gallery" element={<GalleryPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="book" element={<Navigate to="/contact" replace />} />
            </Route>
          </Routes>
        </Suspense>
      </ToastProvider>
    </HashRouter>
  )
}
