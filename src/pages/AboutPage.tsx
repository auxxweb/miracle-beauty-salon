import { PageMeta } from '@/components/ui/PageMeta'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { TeamCard } from '@/components/cards/TeamCard'
import { BookingCTA } from '@/components/shared/BookingCTA'
import { WhyChooseUs } from '@/components/home/WhyChooseUs'
import { images } from '@/data/images'
import { about, brandIntro, seo, team, site, trustBadges } from '@/data/site'

export function AboutPage() {
  return (
    <>
      <PageMeta title="About" description={seo.defaultDescription} />

      <section className="relative pt-28 pb-20 md:pt-36 overflow-hidden">
        <img
          src={images.about.storefront}
          alt="Miracle Beauty Care storefront in Aroor"
          className="absolute inset-0 w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black" />
        <div className="relative max-w-3xl mx-auto px-5 text-center">
          <p className="text-xs tracking-[0.35em] uppercase text-gold-light mb-4">About</p>
          <h1 className="font-display text-5xl md:text-7xl text-gold-gradient mb-6">
            {about.title}
          </h1>
          <p className="text-muted text-lg font-light leading-relaxed">{brandIntro}</p>
        </div>
      </section>

      <Section className="bg-surface">
        <div className="max-w-3xl mx-auto space-y-6 text-muted font-light leading-relaxed">
          {about.paragraphs.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>
        <div className="mt-12">
          <h2 className="font-serif text-2xl text-gold-light text-center mb-8">
            What we offer
          </h2>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
            {about.offerings.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-muted border border-gold-subtle rounded-sm px-4 py-3 bg-black/40"
              >
                <span className="text-gold mt-0.5" aria-hidden>
                  ✦
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <p className="max-w-2xl mx-auto text-center mt-12 text-white/90 italic font-serif text-lg">
          {about.closing}
        </p>
      </Section>

      <WhyChooseUs />

      <Section className="bg-black">
        <SectionHeading
          eyebrow="Trust"
          title="Why families trust us in Aroor"
          subtitle="Professional beauty care with hygiene, premium products, and personalized attention."
        />
        <ul className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {trustBadges.map((badge) => (
            <li
              key={badge}
              className="text-xs tracking-widest uppercase px-4 py-2 border border-gold-subtle text-muted rounded-sm"
            >
              {badge}
            </li>
          ))}
        </ul>
      </Section>

      <Section className="bg-surface">
        <SectionHeading
          eyebrow="Visit Us"
          title={`Our salon in ${site.location}`}
          subtitle="Find us easily — look for the gold Miracle Beauty Care sign."
        />
        <div className="grid md:grid-cols-2 gap-4 mb-16">
          <img
            src={images.about.storefrontServices}
            alt="Storefront with services listed"
            className="w-full aspect-[4/3] object-cover rounded-sm border border-gold-subtle"
            loading="lazy"
          />
          <img
            src={images.about.signNight}
            alt="Salon sign illuminated at night"
            className="w-full aspect-[4/3] object-cover rounded-sm border border-gold-subtle"
            loading="lazy"
          />
        </div>
        <SectionHeading
          eyebrow="Team"
          title="Meet our experts"
          subtitle="Skilled professionals dedicated to your confidence and comfort."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member) => (
            <TeamCard
              key={member.id}
              name={member.name}
              role={member.role}
              bio={member.bio}
              image={member.image}
            />
          ))}
        </div>
      </Section>

      <BookingCTA />
    </>
  )
}
