import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { cta } from '@/data/content'
import { site } from '@/data/site'

export function BookingCTA() {
  return (
    <Section className="bg-surface border-y border-gold-subtle">
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-xs tracking-[0.35em] uppercase text-gold-light mb-4">
          {site.location}
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">{cta.title}</h2>
        <p className="text-muted mb-8 font-light">{cta.subtitle}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap">
          <Button to="/contact">Book Now</Button>
          <Button to={`tel:${site.phoneTel}`} external variant="secondary">
            Call Now
          </Button>
          <Button
            to={`https://wa.me/${site.phoneRaw}?text=${site.whatsapp.message}`}
            external
            variant="secondary"
          >
            WhatsApp Us
          </Button>
        </div>
      </div>
    </Section>
  )
}
