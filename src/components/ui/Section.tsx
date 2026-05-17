import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  id?: string
  className?: string
  narrow?: boolean
}

export function Section({ children, id, className = '', narrow }: Props) {
  return (
    <section
      id={id}
      className={`py-16 md:py-24 px-5 md:px-8 ${className}`}
    >
      <div
        className={`mx-auto w-full ${narrow ? 'max-w-3xl' : 'max-w-6xl'}`}
      >
        {children}
      </div>
    </section>
  )
}
