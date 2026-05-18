import { useEffect, useState } from 'react'
import { ChevronUp } from 'lucide-react'
import { AnimatePresence, motion } from '@/lib/motion'

const SCROLL_THRESHOLD = 320

export function ScrollToTopFloat() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SCROLL_THRESHOLD)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          className="fixed bottom-[5.75rem] right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-gold-subtle bg-black/85 text-gold-light shadow-soft backdrop-blur-md transition-colors hover:border-gold/50 hover:bg-surface hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold/60"
          aria-label="Scroll to top"
        >
          <ChevronUp size={22} strokeWidth={2} aria-hidden />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
