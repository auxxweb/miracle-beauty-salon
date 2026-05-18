import { motion } from '@/lib/motion'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { whyChooseUs } from '@/data/site'

export function WhyChooseUs() {
  return (
    <Section className="bg-black border-y border-gold-subtle">
      <SectionHeading
        eyebrow="Why Choose Us"
        title="Why clients choose Miracle Beauty Care"
        subtitle="Professional expertise, premium products, and a family-friendly salon experience in Aroor."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {whyChooseUs.map((item, i) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="p-6 md:p-8 border border-gold-subtle bg-surface rounded-sm"
          >
            <h3 className="font-serif text-lg text-gold-light mb-3">{item.title}</h3>
            <p className="text-muted text-sm leading-relaxed">{item.text}</p>
          </motion.article>
        ))}
      </div>
    </Section>
  )
}
