import { useEffect, useRef, useState } from 'react'
import { site } from '@/data/site'

type GoogleMapEmbedProps = {
  title?: string
  className?: string
}

export function GoogleMapEmbed({
  title = 'Miracle Beauty Care on Google Maps',
  className = '',
}: GoogleMapEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const node = containerRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden rounded-sm border border-gold-subtle aspect-video bg-surface ${className}`}
    >
      {shouldLoad ? (
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
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-muted text-sm">
          Loading map…
        </div>
      )}
    </div>
  )
}
