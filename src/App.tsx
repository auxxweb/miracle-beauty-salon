import { RouterProvider } from 'react-router-dom'
import { LazyMotion, domAnimation } from '@/lib/motion'
import { ToastProvider } from '@/components/ui/Toast'
import { router } from '@/router'

export default function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </LazyMotion>
  )
}
