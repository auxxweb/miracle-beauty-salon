import { Link } from 'react-router-dom'
import { Clock, ArrowUpRight } from 'lucide-react'
import type { Service } from '@/data/site'

type Props = { service: Service }

export function ServiceCard({ service }: Props) {
  const detailTo = service.slug ? `/services/${service.slug}` : '/contact'

  return (
    <Link
      to={detailTo}
      className="group block overflow-hidden bg-surface border border-gold-subtle rounded-sm hover:border-gold/40 hover:-translate-y-0.5 transition-all duration-300"
    >
      {service.image && (
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>
      )}
      <div className="p-6 md:p-8">
        <div className="flex justify-between items-start gap-4 mb-4">
          <span className="text-[10px] tracking-[0.3em] uppercase text-gold-light">
            {service.category}
          </span>
          <ArrowUpRight
            size={18}
            className="text-muted group-hover:text-gold-light transition-colors shrink-0"
          />
        </div>
        <h3 className="font-serif text-xl md:text-2xl text-white mb-2">{service.name}</h3>
        <p className="text-muted text-sm leading-relaxed mb-6">{service.description}</p>
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-1.5 text-muted">
            <Clock size={14} className="text-gold" />
            {service.duration}
          </span>
          <span className="text-gold-light font-medium tracking-wide">
            from {service.priceFrom}
          </span>
        </div>
      </div>
    </Link>
  )
}
