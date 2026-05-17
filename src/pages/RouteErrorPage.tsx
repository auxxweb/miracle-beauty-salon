import { isRouteErrorResponse, useRouteError, Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'

export function RouteErrorPage() {
  const error = useRouteError()
  let title = 'Something went wrong'
  let message = 'This page could not be loaded. Please try again or return home.'

  if (isRouteErrorResponse(error)) {
    title = `${error.status} ${error.statusText}`
    message = error.data?.message || message
  } else if (error instanceof Error) {
    message = error.message
  }

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-5 text-center pt-24">
      <p className="text-xs tracking-[0.35em] uppercase text-gold-light mb-3">Error</p>
      <h1 className="font-serif text-3xl text-white mb-4">{title}</h1>
      <p className="text-muted max-w-md mb-8 font-light">{message}</p>
      <div className="flex flex-wrap justify-center gap-4">
        <Button to="/">Go to Home</Button>
        <Link
          to="/contact"
          className="inline-flex items-center text-sm tracking-widest uppercase text-gold-light hover:text-white"
        >
          Contact us
        </Link>
      </div>
    </div>
  )
}
