import { createHashRouter, Navigate } from 'react-router-dom'
import { MainLayout } from '@/layouts/MainLayout'
import { HomePage } from '@/pages/HomePage'
import { ServicesPage } from '@/pages/ServicesPage'
import { AboutPage } from '@/pages/AboutPage'
import { GalleryPage } from '@/pages/GalleryPage'
import { ContactPage } from '@/pages/ContactPage'
import { ServiceCategoryPage } from '@/pages/ServiceCategoryPage'
import { RouteErrorPage } from '@/pages/RouteErrorPage'

export const router = createHashRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <RouteErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'services', element: <ServicesPage /> },
      { path: 'services/:slug', element: <ServiceCategoryPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'gallery', element: <GalleryPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'book', element: <Navigate to="/contact" replace /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])
