import { PageMeta } from '@/components/ui/PageMeta'
import { Section } from '@/components/ui/Section'
import { ServicePriceCatalog } from '@/components/services/ServicePriceCatalog'
import { BookingCTA } from '@/components/shared/BookingCTA'
import { Button } from '@/components/ui/Button'
import { images } from '@/data/images'
import { site } from '@/data/site'
import { serviceMenuItems } from '@/data/serviceMenu'

export function ServicesPage() {
  return (
    <>
      <PageMeta
        title="Services"
        description="Full salon price list — bridal makeup, hair, facials, grooming, nails, and family services at Miracle Beauty Care, Aroor."
      />

      <section className="relative pt-28 pb-12 md:pt-36 md:pb-16 px-5 md:px-8 overflow-hidden border-b border-gold-subtle">
        <img
          src={images.hero}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-25"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black" />
        <div className="relative max-w-6xl mx-auto text-center">
          <p className="text-xs tracking-[0.35em] uppercase text-gold-light mb-4">Services</p>
          <h1 className="font-display text-5xl md:text-7xl text-gold-gradient mb-4">
            Services & Pricing
          </h1>
          <p className="text-muted max-w-2xl mx-auto font-light leading-relaxed mb-6">
            Browse our full menu by category — service name, duration, and pricing for women, men,
            and families in {site.location}.
          </p>
          <Button to="/contact">Book Appointment</Button>
        </div>
      </section>

      <Section className="bg-black !pt-12">
        <p className="text-center text-muted text-sm max-w-2xl mx-auto mb-10 font-light">
          Prices marked <span className="text-gold-light">From</span> may vary by hair length and
          product choice. <span className="text-white/80">{serviceMenuItems.length}</span> services
          across our salon menu.
        </p>
        <ServicePriceCatalog />
      </Section>

      <BookingCTA />
    </>
  )
}
