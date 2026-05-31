import { useOffersContext } from '@/contexts/OffersContext'
import { OfferCard } from '@/components/offers/OfferCard'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'

const HOME_PREVIEW_COUNT = 4

function OffersSkeleton() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 animate-pulse" aria-busy="true">
      {Array.from({ length: HOME_PREVIEW_COUNT }).map((_, i) => (
        <div key={i} className="border border-gold-subtle/40 rounded-sm overflow-hidden">
          <div className="aspect-[4/3] bg-white/5" />
          <div className="p-4 space-y-3">
            <div className="h-3 w-20 bg-white/5 rounded" />
            <div className="h-5 w-full bg-white/10 rounded" />
            <div className="h-10 w-full bg-white/5 rounded" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function OffersSection() {
  const { activeOffers, isLoading, isError, isRefreshing } = useOffersContext()
  const preview = activeOffers.slice(0, HOME_PREVIEW_COUNT)

  if (isError || (!isLoading && preview.length === 0)) {
    return null
  }

  return (
    <Section id="offers" className="bg-black border-b border-gold-subtle">
      <SectionHeading eyebrow="Our Offers" title="Limited-time salon packages" />

      {isRefreshing && preview.length > 0 && (
        <p className="text-center text-[10px] tracking-widest uppercase text-muted mb-6" aria-live="polite">
          Updating offers…
        </p>
      )}

      {isLoading ? (
        <OffersSkeleton />
      ) : (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {preview.map((offer) => (
              <OfferCard key={`${offer.displayOrder}-${offer.offerName}`} offer={offer} compact />
            ))}
          </div>

          {activeOffers.length > HOME_PREVIEW_COUNT && (
            <div className="text-center mt-10">
              <Button to="/offers" variant="secondary">
                View all offers
              </Button>
            </div>
          )}
        </>
      )}
    </Section>
  )
}
