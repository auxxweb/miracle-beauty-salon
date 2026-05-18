import { lazy, Suspense } from 'react'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { PageMeta } from '@/components/ui/PageMeta'
import { Section } from '@/components/ui/Section'
import { GoogleMapEmbed } from '@/components/shared/GoogleMapEmbed'

const ContactForm = lazy(() =>
  import('@/components/contact/ContactForm').then((m) => ({ default: m.ContactForm })),
)
import { site } from '@/data/site'
import { formatSiteAddress } from '@/lib/contact'

export function ContactPage() {
  const address = formatSiteAddress()

  return (
    <>
      <PageMeta
        title="Contact"
        description={`Contact ${site.name}. Visit us, call, or send a message.`}
      />

      <section className="pt-28 pb-12 md:pt-36 text-center bg-black border-b border-gold-subtle px-5">
        <p className="text-xs tracking-[0.35em] uppercase text-gold-light mb-4">Contact</p>
        <h1 className="font-display text-5xl md:text-7xl text-gold-gradient mb-4">Get in touch</h1>
        <p className="text-muted max-w-xl mx-auto font-light">
          {site.name} — The Complete Family Salon & Makeup Studio in {site.location}. Call or
          WhatsApp us today to book bridal makeup, haircare, grooming, skincare, and beauty
          services.
        </p>
      </section>

      <Section className="bg-black">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="space-y-8">
            <div className="flex gap-4">
              <MapPin className="text-gold shrink-0" size={22} />
              <div>
                <h2 className="text-sm tracking-widest uppercase text-gold-light mb-1">Address</h2>
                <p className="text-muted">{address}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Phone className="text-gold shrink-0" size={22} />
              <div>
                <h2 className="text-sm tracking-widest uppercase text-gold-light mb-1">Phone</h2>
                <a href={`tel:${site.phoneTel}`} className="text-white hover:text-gold-light block">
                  {site.phone}
                </a>
                <a
                  href={`tel:${site.phoneSecondaryTel}`}
                  className="text-white hover:text-gold-light block mt-1"
                >
                  {site.phoneSecondary}
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <Mail className="text-gold shrink-0" size={22} />
              <div>
                <h2 className="text-sm tracking-widest uppercase text-gold-light mb-1">Email</h2>
                <a href={`mailto:${site.email}`} className="text-white hover:text-gold-light">
                  {site.email}
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <Clock className="text-gold shrink-0" size={22} />
              <div>
                <h2 className="text-sm tracking-widest uppercase text-gold-light mb-1">Hours</h2>
                <ul className="text-muted text-sm space-y-1">
                  {site.hours.map((h) => (
                    <li key={h.days}>
                      {h.days}: <span className="text-white/90">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <Suspense fallback={<div className="h-96 animate-pulse rounded-sm bg-surface" aria-hidden />}>
            <ContactForm />
          </Suspense>
        </div>
      </Section>

      <Section className="bg-black border-t border-gold-subtle">
        <h2 className="font-serif text-2xl text-white mb-6 text-center">Directions</h2>
        <GoogleMapEmbed className="max-w-4xl mx-auto" />
      </Section>
    </>
  )
}
