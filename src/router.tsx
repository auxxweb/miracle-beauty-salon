import { lazy, Suspense, type ReactNode } from 'react'
import { createHashRouter, Navigate } from 'react-router-dom'
import { MainLayout } from '@/layouts/MainLayout'
import { PageLoader } from '@/components/ui/PageLoader'
import { RouteErrorPage } from '@/pages/RouteErrorPage'

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

function withSuspense(element: ReactNode) {
  return <Suspense fallback={<PageLoader />}>{element}</Suspense>
}

export const router = createHashRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <RouteErrorPage />,
    children: [
      { index: true, element: withSuspense(<HomePage />) },
      { path: 'services', element: withSuspense(<ServicesPage />) },
      { path: 'services/:slug', element: withSuspense(<ServiceCategoryPage />) },
      { path: 'about', element: withSuspense(<AboutPage />) },
      { path: 'gallery', element: withSuspense(<GalleryPage />) },
      { path: 'contact', element: withSuspense(<ContactPage />) },
      { path: 'book', element: <Navigate to="/contact" replace /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])
