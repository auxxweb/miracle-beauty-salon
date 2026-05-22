import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from '@/lib/motion'
import { ChevronDown } from 'lucide-react'
import { hero } from '@/data/content'
import { heroSlides } from '@/data/images'
import { Button } from '@/components/ui/Button'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { useIsMobile } from '@/hooks/useIsMobile'

const AUTO_INTERVAL_MS = 2000
const TRANSITION_S = 0.85
const SLIDE_IMAGE_OPACITY = 0.58

export function HeroParallax() {
  const ref = useRef<HTMLElement>(null)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reducedMotion = usePrefersReducedMotion()
  const isMobile = useIsMobile()
  const parallaxEnabled = !reducedMotion && !isMobile
  const carouselEnabled = !reducedMotion

  const slideCount = heroSlides.length

  const goTo = useCallback(
    (next: number) => {
      setIndex((next + slideCount) % slideCount)
    },
    [slideCount],
  )

  const next = useCallback(() => goTo(index + 1), [goTo, index])

  useEffect(() => {
    if (!carouselEnabled || paused || slideCount < 2) return
    const id = window.setInterval(next, AUTO_INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [carouselEnabled, paused, next, slideCount])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '32%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.55], [0.68, 0.82])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <section
      ref={ref}
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
      aria-label="Hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        className="absolute inset-0 z-0 overflow-hidden"
        style={parallaxEnabled ? { y: bgY, scale: bgScale } : undefined}
      >
        <motion.div className="absolute inset-0 h-[115%] w-full -top-[7%]">
          {heroSlides.map((slide, i) => {
            const active = !carouselEnabled ? i === 0 : i === index
            if (!carouselEnabled && i > 0) return null
            return (
              <motion.img
                key={slide.src}
                src={slide.src}
                alt={slide.alt}
                className="absolute inset-0 h-full w-full object-cover"
                initial={false}
                animate={{
                  opacity: active ? SLIDE_IMAGE_OPACITY : 0,
                  scale: active ? 1 : 1.1,
                }}
                transition={{
                  duration: carouselEnabled ? TRANSITION_S : 0,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ zIndex: active ? 1 : 0 }}
                fetchPriority={i === 0 ? 'high' : 'low'}
                aria-hidden={!active}
              />
            )
          })}
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute inset-0 z-[1] bg-gradient-to-b from-black/70 via-black/55 to-black/85 pointer-events-none"
        style={parallaxEnabled ? { opacity: overlayOpacity } : { opacity: 0.72 }}
      />
      <div className="absolute inset-0 z-[1] bg-black/20 pointer-events-none" aria-hidden />

      {carouselEnabled && slideCount > 1 && (
        <div
          className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1"
          role="tablist"
          aria-label="Hero slideshow"
        >
          {heroSlides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              role="tab"
              onClick={() => goTo(i)}
              className="min-h-11 min-w-11 flex items-center justify-center rounded-full bg-transparent border-0 cursor-pointer"
              aria-label={`Slide ${i + 1}`}
              aria-selected={i === index}
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  i === index
                    ? 'w-8 h-1.5 bg-gold-gradient'
                    : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'
                }`}
              />
            </button>
          ))}
        </div>
      )}

      <motion.div
        className="relative z-10 max-w-3xl mx-auto px-5 md:px-8 text-center pt-24 pb-28"
        style={parallaxEnabled ? { y: contentY, opacity: contentOpacity } : undefined}
        initial={isMobile ? { opacity: 0, y: 20 } : false}
        animate={isMobile ? { opacity: 1, y: 0 } : false}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mx-auto rounded-sm border border-white/10 bg-black/55 backdrop-blur-md px-6 py-8 md:px-10 md:py-9 shadow-[0_8px_48px_rgba(0,0,0,0.6)]">
          <h1 className="font-serif text-[clamp(1.15rem,3.5vw,2.5rem)] leading-snug text-white font-medium mb-5 [text-shadow:0_2px_24px_rgba(0,0,0,1)]">
            {hero.headline}
          </h1>

          <p className="text-gold-pale text-sm md:text-base leading-relaxed mb-8 max-w-2xl mx-auto [text-shadow:0_1px_16px_rgba(0,0,0,0.9)]">
            {hero.subheadline}
          </p>

          <Button
            to="/contact"
            className="w-auto mx-auto min-h-9 px-4 py-2 text-[11px] md:min-h-11 md:px-6 md:py-3 md:text-sm"
          >
            Book Appointment
          </Button>
        </div>
      </motion.div>

      <Link
        to="/services"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/80 hover:text-gold-light transition-colors animate-bounce drop-shadow-lg"
        aria-label="Scroll to services"
      >
        <ChevronDown size={28} />
      </Link>
    </section>
  )
}
