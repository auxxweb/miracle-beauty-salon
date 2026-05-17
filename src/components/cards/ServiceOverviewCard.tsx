import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

type Props = {
  title: string
  summary: string
  image: string
  to: string
}

export function ServiceOverviewCard({ title, summary, image, to }: Props) {
  return (
    <Link
      to={to}
      className="group block overflow-hidden border border-gold-subtle bg-surface rounded-sm hover:border-gold/40 transition-all"
    >
      <div className="overflow-hidden bg-black/30">
        <img
          src={image}
          alt={title}
          className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.02]"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3 className="font-serif text-xl text-white group-hover:text-gold-light transition-colors">
            {title}
          </h3>
          <ArrowUpRight size={18} className="text-muted group-hover:text-gold-light shrink-0" />
        </div>
        <p className="text-muted text-sm leading-relaxed">{summary}</p>
      </div>
    </Link>
  )
}
