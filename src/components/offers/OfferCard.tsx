import { memo, useEffect, useState } from 'react'
import { ImageOff, Tag } from 'lucide-react'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { Button } from '@/components/ui/Button'
import {
  formatOfferPrice,
  getOfferImageUrl,
  offerWhatsAppUrl,
  type SalonOffer,
} from '@/data/offers'

type OfferCardProps = {
  offer: SalonOffer
  compact?: boolean
}

function OfferImagePlaceholder({ compact }: { compact: boolean }) {
  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center gap-2 bg-black/70 border-b border-gold-subtle/20 ${compact ? 'min-h-[140px]' : 'min-h-[160px]'}`}
      aria-hidden
    >
      <ImageOff size={compact ? 28 : 32} className="text-white/25" strokeWidth={1.25} />
      <span className="text-[10px] tracking-[0.25em] uppercase text-muted">No image</span>
    </div>
  )
}

export const OfferCard = memo(function OfferCard({ offer, compact = false }: OfferCardProps) {
  const sheetImage = getOfferImageUrl(offer)
  const [imageSrc, setImageSrc] = useState<string | null>(sheetImage)
  const [imageFailed, setImageFailed] = useState(false)
  const whatsappHref = offerWhatsAppUrl(offer)
  const showImage = Boolean(imageSrc) && !imageFailed

  useEffect(() => {
    setImageSrc(getOfferImageUrl(offer))
    setImageFailed(false)
  }, [offer.imageUrl, offer.offerName])

  return (
    <article className="group flex flex-col h-full overflow-hidden border border-gold-subtle bg-surface rounded-sm hover:border-gold/40 transition-colors">
      <div className={`relative overflow-hidden bg-black/40 ${compact ? 'aspect-[4/3]' : 'aspect-[16/10]'}`}>
        {showImage ? (
          <OptimizedImage
            src={imageSrc!}
            alt={offer.offerName}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <OfferImagePlaceholder compact={compact} />
        )}
        {showImage && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
        )}
        <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2 py-1 text-[10px] tracking-wider uppercase rounded-sm border border-gold/40 bg-black/70 text-gold-light">
          <Tag size={12} aria-hidden />
          {offer.offerType}
        </span>
      </div>

      <div className={`flex flex-col flex-1 ${compact ? 'p-4' : 'p-5 md:p-6'}`}>
        <p className="text-[10px] tracking-[0.2em] uppercase text-muted mb-2">{offer.offerCategory}</p>
        <h3 className="font-serif text-lg md:text-xl text-white mb-2 leading-snug">{offer.offerName}</h3>
        <p className="font-serif text-xl md:text-2xl text-gold-light mb-3">{formatOfferPrice(offer.offerPrice)}</p>
        {offer.additionalNote ? (
          <p className="text-muted text-sm leading-relaxed mb-4 flex-1">{offer.additionalNote}</p>
        ) : (
          <div className="flex-1" />
        )}
        <Button
          to={whatsappHref}
          external
          variant="secondary"
          className="mt-auto w-full !min-h-10 !px-4 !py-2 !text-[11px]"
        >
          Book this offer
        </Button>
      </div>
    </article>
  )
})
