type Props = {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
}: Props) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'

  return (
    <div className={`mb-12 md:mb-16 max-w-2xl ${alignClass}`}>
      {eyebrow && (
        <p className="text-gold-gradient text-xs font-medium tracking-[0.35em] uppercase mb-4">
          {eyebrow}
        </p>
      )}
      <h2 className="font-serif text-3xl md:text-5xl font-medium text-white leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-muted text-base md:text-lg font-light leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}
