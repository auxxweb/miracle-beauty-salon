import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { motion } from '@/lib/motion'
import { HeroParallax } from '@/components/home/HeroParallax'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ServiceOverviewCard } from '@/components/cards/ServiceOverviewCard'
import { TestimonialCard } from '@/components/cards/TestimonialCard'
import { BookingCTA } from '@/components/shared/BookingCTA'
import { PageMeta } from '@/components/ui/PageMeta'
import { Button } from '@/components/ui/Button'
import { images } from '@/data/images'
import { featuredPopular } from '@/data/content'
import {
  about,
  brandIntro,
  seo,
  serviceOverviews,
  testimonials,
  galleryImages,
  site,
} from '@/data/site'

const WhyChooseUs = lazy(() =>
  import('@/components/home/WhyChooseUs').then((m) => ({ default: m.WhyChooseUs })),
)
const FAQ = lazy(() => import('@/components/home/FAQ').then((m) => ({ default: m.FAQ })))

export function HomePage() {
  return (
    <>
      <PageMeta title="Home" description={seo.defaultDescription} />
      <HeroParallax />

      <Section id="intro" className="bg-surface border-b border-gold-subtle">
        <p className="max-w-3xl mx-auto text-center text-muted text-base md:text-lg font-light leading-relaxed">
          {brandIntro}
        </p>
      </Section>

      <Section id="services-overview" className="bg-black">
        <SectionHeading
          eyebrow="Our Services"
          title="Complete beauty & salon services in Aroor"
          subtitle="Bridal makeup, haircare, facials, grooming, nail care, and family salon services under one roof."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 items-start">
          {serviceOverviews.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <ServiceOverviewCard
                title={item.title}
                summary={item.summary}
                image={item.image}
                to={item.to}
              />
            </motion.div>
          ))}
        </div>
      </Section>

      <Section className="bg-surface">
        <SectionHeading
          eyebrow="Popular Services"
          title="Featured at Miracle Beauty Care"
          subtitle="Our most requested treatments for weddings, self-care, and family grooming."
        />
        <div className="grid sm:grid-cols-2 gap-4 md:gap-6 items-start">
          {featuredPopular.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <ServiceOverviewCard
                title={item.title}
                summary={item.summary}
                image={item.image}
                to={item.to}
              />
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button to="/services" variant="secondary">
            View All Services & Pricing
          </Button>
        </div>
      </Section>

      <Suspense fallback={null}>
        <WhyChooseUs />
      </Suspense>

      <Section className="bg-surface">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <SectionHeading
              eyebrow="About Us"
              title={about.title}
              subtitle={about.paragraphs[0]}
              align="left"
            />
            <p className="text-muted text-sm leading-relaxed mb-6">{about.paragraphs[1]}</p>
            <Button to="/about" variant="ghost" className="!px-0">
              Read our full story →
            </Button>
          </div>
          <div className="relative aspect-[4/5] max-h-[520px] overflow-hidden rounded-sm border border-gold-subtle">
            <OptimizedImage
              src={images.about.reception}
              alt="Miracle Beauty Care reception"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <p className="absolute bottom-6 left-6 right-6 font-serif text-xl text-white italic">
              &ldquo;{site.taglineAlt}&rdquo;
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-black">
        <SectionHeading
          eyebrow="Gallery"
          title="The Miracle Beauty Care experience"
          subtitle="Step inside our salon in Aroor — premium interiors, expert services, and real results."
        />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {galleryImages.slice(0, 6).map((img, i) => (
            <Link
              key={img.id}
              to="/gallery"
              className={`relative overflow-hidden rounded-sm border border-gold-subtle group ${
                i === 0
                  ? 'col-span-2 row-span-2 aspect-square md:aspect-auto min-h-[200px]'
                  : 'aspect-square'
              }`}
            >
              <OptimizedImage
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Button to="/gallery" variant="secondary">
            View Gallery
          </Button>
        </div>
      </Section>

      <Section className="bg-surface">
        <SectionHeading
          eyebrow="Testimonials"
          title="What our clients say"
          subtitle="Trusted by families, brides, and grooms across Aroor."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <TestimonialCard quote={t.quote} author={t.author} role={t.role} />
            </motion.div>
          ))}
        </div>
      </Section>

      <Suspense fallback={null}>
        <FAQ />
      </Suspense>

      <Section narrow className="bg-black border-t border-gold-subtle">
        <div className="text-center">
          <h2 className="font-serif text-2xl text-white mb-2">Visit us in {site.location}</h2>
          <p className="text-muted text-sm mb-6">{site.tagline}</p>
          <ul className="space-y-2 text-muted text-sm">
            {site.hours.map((h) => (
              <li key={h.days}>
                <span className="text-white/80">{h.days}</span> — {h.time}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Button to="/contact">Contact & Directions</Button>
            <Button to={`tel:${site.phoneTel}`} external variant="secondary">
              Call Now
            </Button>
          </div>
        </div>
      </Section>

      <BookingCTA />
    </>
  )
}
