import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { faq } from '@/data/site'

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <Section id="faq" className="bg-surface">
      <SectionHeading
        eyebrow="FAQ"
        title="Frequently asked questions"
        subtitle="Quick answers about appointments, bridal services, and our family salon in Aroor."
      />
      <div className="max-w-2xl mx-auto space-y-3">
        {faq.map((item, i) => (
          <motion.div
            key={item.q}
            className="border border-gold-subtle rounded-sm bg-black/40 overflow-hidden"
          >
            <button
              type="button"
              className="w-full flex items-center justify-between gap-4 p-5 text-left min-h-11"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
            >
              <span className="text-white font-medium text-sm md:text-base">{item.q}</span>
              <ChevronDown
                size={18}
                className={`text-gold shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`}
              />
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="px-5 pb-5 text-muted text-sm leading-relaxed">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
