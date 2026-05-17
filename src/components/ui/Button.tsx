import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

const variants: Record<Variant, string> = {
  primary:
    'bg-gold-gradient text-black font-semibold hover:opacity-90 shadow-gold',
  secondary:
    'border border-gold-subtle text-gold-light bg-transparent hover:bg-white/5',
  ghost: 'text-muted hover:text-white bg-transparent',
}

type BaseProps = {
  children: ReactNode
  variant?: Variant
  className?: string
}

type ButtonProps = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { to?: undefined }

type LinkProps = BaseProps & {
  to: string
  external?: boolean
}

export function Button(props: ButtonProps | LinkProps) {
  const {
    children,
    variant = 'primary',
    className = '',
    ...rest
  } = props
  const to = 'to' in props ? props.to : undefined
  const external = 'external' in props ? props.external : undefined
  const linkRest = { ...rest }
  if ('to' in linkRest) delete (linkRest as { to?: string }).to
  if ('external' in linkRest) delete (linkRest as { external?: boolean }).external
  const base = `inline-flex items-center justify-center gap-2 min-h-11 px-6 py-3 text-sm tracking-widest uppercase transition-all duration-200 rounded-sm ${variants[variant]} ${className}`

  if (to) {
    if (external || to.startsWith('http')) {
      return (
        <a href={to} className={base} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      )
    }
    return (
      <Link to={to} className={base}>
        {children}
      </Link>
    )
  }

  const { type = 'button', ...buttonProps } = linkRest as ButtonProps & { type?: 'button' | 'submit' }

  return (
    <button type={type} className={base} {...buttonProps}>
      {children}
    </button>
  )
}
