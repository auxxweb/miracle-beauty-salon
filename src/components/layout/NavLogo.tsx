import { Link } from 'react-router-dom'
import { site } from '@/data/site'

type Props = {
  onClick?: () => void
  className?: string
}

/** Original nav branding: gold script Miracle + Beauty Care (visible on dark header). */
export function NavLogo({ onClick, className = '' }: Props) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className={`inline-flex flex-col items-start justify-center leading-none shrink-0 group py-0.5 ${className}`}
      aria-label={`${site.name} — Home`}
    >
      <span className="font-display text-[1.85rem] md:text-[2.35rem] text-gold-gradient transition-opacity group-hover:opacity-90">
        Miracle
      </span>
      <span className="text-[10px] md:text-[11px] tracking-[0.42em] uppercase text-gold-light font-medium mt-1 md:mt-1.5">
        Beauty Care
      </span>
    </Link>
  )
}
