import { site } from '@/data/site'

type GoogleMapEmbedProps = {
  title?: string
  className?: string
}

export function GoogleMapEmbed({
  title = 'Miracle Beauty Care on Google Maps',
  className = '',
}: GoogleMapEmbedProps) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-sm border border-gold-subtle aspect-video ${className}`}
    >
      <iframe
        src={site.mapsEmbedSrc}
        width="600"
        height="450"
        className="absolute inset-0 h-full w-full border-0"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
      />
    </div>
  )
}
