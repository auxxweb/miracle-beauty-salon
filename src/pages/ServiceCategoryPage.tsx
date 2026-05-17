import { Link, Navigate, useParams } from 'react-router-dom'
import { PageMeta } from '@/components/ui/PageMeta'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { servicePages, site } from '@/data/site'

export function ServiceCategoryPage() {
  const { slug } = useParams<{ slug: string }>()
  const page = slug ? servicePages[slug] : undefined

  if (!page) {
    return <Navigate to="/services" replace />
  }

  return (
    <>
      <PageMeta title={page.title} description={page.metaDescription} />

      <section className="relative pt-28 pb-16 md:pt-36 overflow-hidden">
        <img
          src={page.image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/85 to-black" />
        <div className="relative max-w-3xl mx-auto px-5 text-center">
          <p className="text-xs tracking-[0.35em] uppercase text-gold-light mb-4">
            {site.name} · {site.location}
          </p>
          <h1 className="font-display text-4xl md:text-6xl text-gold-gradient mb-6">{page.title}</h1>
          <p className="text-muted text-lg font-light leading-relaxed">{page.intro}</p>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Button to="/contact">Book Appointment</Button>
            <Button to="/services" variant="secondary">
              All Services
            </Button>
          </div>
        </div>
      </section>

      <Section className="bg-black">
        {page.sections.map((section) => (
          <div key={section.heading} className="mb-12 last:mb-0">
            <h2 className="font-serif text-2xl text-gold-light mb-6">{section.heading}</h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {section.items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-muted text-sm border border-gold-subtle/50 rounded-sm px-4 py-3 bg-surface"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
        {page.closing && (
          <p className="mt-12 text-white/90 font-light leading-relaxed text-center max-w-2xl mx-auto italic font-serif text-lg">
            {page.closing}
          </p>
        )}
      </Section>

      <Section narrow className="bg-surface border-t border-gold-subtle text-center">
        <p className="text-muted mb-6">
          Ready to book? Call {site.phone} or schedule online.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button to="/contact">Book Now</Button>
          <Button to={`tel:${site.phoneTel}`} external>
            Call Now
          </Button>
        </div>
        <Link to="/services" className="inline-block mt-8 text-sm text-gold-light hover:text-white">
          ← Back to all services
        </Link>
      </Section>
    </>
  )
}
