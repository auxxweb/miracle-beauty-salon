import { Quote } from 'lucide-react'

type Props = {
  quote: string
  author: string
  role: string
}

export function TestimonialCard({ quote, author, role }: Props) {
  return (
    <blockquote className="p-8 md:p-10 bg-surface border border-gold-subtle rounded-sm h-full flex flex-col">
      <Quote size={28} className="text-gold/60 mb-6 shrink-0" aria-hidden />
      <p className="text-white/90 font-light leading-relaxed flex-1 italic font-serif text-lg">
        &ldquo;{quote}&rdquo;
      </p>
      <footer className="mt-8 pt-6 border-t border-gold-subtle">
        <cite className="not-italic">
          <span className="block text-sm font-medium text-gold-light tracking-wide">
            {author}
          </span>
          <span className="block text-xs text-muted mt-1 uppercase tracking-widest">
            {role}
          </span>
        </cite>
      </footer>
    </blockquote>
  )
}
