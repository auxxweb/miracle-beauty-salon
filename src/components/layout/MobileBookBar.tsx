import { Link } from 'react-router-dom'
import { Calendar } from 'lucide-react'

export function MobileBookBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden p-3 bg-black/95 border-t border-gold-subtle backdrop-blur-md safe-area-pb">
      <Link
        to="/contact"
        className="flex items-center justify-center gap-2 w-full min-h-12 bg-gold-gradient text-black font-semibold text-sm tracking-widest uppercase rounded-sm"
      >
        <Calendar size={18} />
        Book Now
      </Link>
    </div>
  )
}
