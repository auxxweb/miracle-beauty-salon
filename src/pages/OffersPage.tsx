import { PageMeta } from '@/components/ui/PageMeta'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { BookingCTA } from '@/components/shared/BookingCTA'
import { Button } from '@/components/ui/Button'
import { OfferCard } from '@/components/offers/OfferCard'
import { OffersProvider, useOffersContext } from '@/contexts/OffersContext'
import { images } from '@/data/images'
import { site } from '@/data/site'

function OffersPageContent() {
  const { groups, activeOffers, isLoading, isError, errorMessage, isRefreshing, isOffline, refetch } =
    useOffersContext()

  return (
    <>
      <PageMeta
        title="Offers"
        description="Current salon offers and package deals at Miracle Beauty Care, Aroor — gents, ladies, bridal, and family packages."
      />

      <section className="relative pt-28 pb-12 md:pt-36 md:pb-16 px-5 md:px-8 overflow-hidden border-b border-gold-subtle">
        <img
          src={images.services.groomPackage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black" />
        <div className="relative max-w-6xl mx-auto text-center">
          <p className="text-xs tracking-[0.35em] uppercase text-gold-light mb-4">Our Offers</p>
          <h1 className="font-display text-5xl md:text-7xl text-gold-gradient mb-4">Salon Offers</h1>
          <p className="text-muted max-w-2xl mx-auto font-light leading-relaxed mb-6">
            Live packages and deals for women, men, and families at Miracle Beauty Care in{' '}
            {site.location}.
          </p>
          <Button to="/contact">Book an offer</Button>
        </div>
      </section>

      <Section className="bg-black !pt-12">
        {isRefreshing && activeOffers.length > 0 && (
          <p className="text-center text-[10px] tracking-widest uppercase text-muted mb-8">
            {isOffline ? 'Offline — showing last saved offers.' : 'Updating offers from Google Sheets…'}
          </p>
        )}

        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-white/5 border border-gold-subtle/30 rounded-sm" />
            ))}
          </div>
        ) : isError ? (
          <div
            role="alert"
            className="rounded-sm border border-red-500/30 bg-red-500/10 px-6 py-10 text-center max-w-lg mx-auto"
          >
            <p className="text-white font-light mb-2">Unable to load offers</p>
            <p className="text-sm text-muted mb-6">{errorMessage}</p>
            <button
              type="button"
              onClick={refetch}
              className="text-xs tracking-widest uppercase text-gold-light hover:text-white underline underline-offset-4"
            >
              Try again
            </button>
          </div>
        ) : (
          <div className="space-y-14">
            {groups.map(({ category, offers }) => (
              <div key={category}>
                <SectionHeading
                  eyebrow={offers[0]?.offerType ?? 'Offer'}
                  title={category}
                  subtitle={`${offers.length} active package${offers.length === 1 ? '' : 's'}`}
                  align="left"
                />
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {offers.map((offer) => (
                    <OfferCard key={`${offer.displayOrder}-${offer.offerName}`} offer={offer} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>

      <BookingCTA />
    </>
  )
}

export function OffersPage() {
  return (
    <OffersProvider>
      <OffersPageContent />
    </OffersProvider>
  )
}
