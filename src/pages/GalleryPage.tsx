import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { PageMeta } from '@/components/ui/PageMeta'
import { Section } from '@/components/ui/Section'
import { galleryImages, site } from '@/data/site'

export function GalleryPage() {
  const [lightbox, setLightbox] = useState<(typeof galleryImages)[0] | null>(null)

  return (
    <>
      <PageMeta
        title="Gallery"
        description={`View the ${site.name} experience — salon atmosphere, treatments, and results.`}
      />

      <section className="pt-28 pb-12 md:pt-36 px-5 text-center bg-black">
        <p className="text-xs tracking-[0.35em] uppercase text-gold-light mb-4">Gallery</p>
        <h1 className="font-display text-5xl md:text-7xl text-gold-gradient">Moments</h1>
      </section>

      <Section className="bg-black !pt-0">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {galleryImages.map((img, i) => (
            <motion.button
              key={img.id}
              type="button"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="block w-full break-inside-avoid overflow-hidden rounded-sm border border-gold-subtle group cursor-zoom-in"
              onClick={() => setLightbox(img)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                loading="lazy"
              />
            </motion.button>
          ))}
        </div>
      </Section>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Image preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              type="button"
              className="absolute top-6 right-6 text-white p-2"
              aria-label="Close"
              onClick={() => setLightbox(null)}
            >
              <X size={28} />
            </button>
            <motion.img
              src={lightbox.src}
              alt={lightbox.alt}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="max-h-[85vh] max-w-full object-contain rounded-sm"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
