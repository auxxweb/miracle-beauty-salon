import { Link } from 'react-router-dom'
import { Instagram, Facebook, MapPin, Phone, Mail } from 'lucide-react'
import { footer } from '@/data/content'
import { site } from '@/data/site'
import { assets } from '@/data/assets'
import { formatSiteAddress } from '@/lib/contact'
import { GoogleMapEmbed } from '@/components/shared/GoogleMapEmbed'

const footerNav = [
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
]

export function Footer() {
  const year = new Date().getFullYear()
  const address = formatSiteAddress()

  return (
    <footer className="border-t border-gold-subtle bg-charcoal">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <img
              src={assets.logo}
              alt={site.name}
              className="h-14 w-auto mb-4 max-w-[220px]"
              onError={(e) => {
                e.currentTarget.onerror = null
                e.currentTarget.src = assets.logoFallback
              }}
            />
            <p className="text-muted text-sm leading-relaxed">{footer.tagline}</p>
            <p className="mt-2 text-white/80 text-sm font-light leading-relaxed">
              {footer.description}
            </p>
          </div>

          <div>
            <h3 className="text-xs tracking-[0.25em] uppercase text-gold-light mb-4">
              Explore
            </h3>
            <ul className="space-y-2">
              {footerNav.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-muted text-sm hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs tracking-[0.25em] uppercase text-gold-light mb-4">
              Visit Us
            </h3>
            <ul className="space-y-3 text-sm text-muted">
              <li className="flex gap-2">
                <MapPin size={16} className="text-gold shrink-0 mt-0.5" />
                <span>{address}</span>
              </li>
              <li className="flex gap-2">
                <Phone size={16} className="text-gold shrink-0" />
                <div className="flex flex-col gap-1">
                  <a href={`tel:${site.phoneTel}`} className="hover:text-white">
                    {site.phone}
                  </a>
                  <a href={`tel:${site.phoneSecondaryTel}`} className="hover:text-white">
                    {site.phoneSecondary}
                  </a>
                </div>
              </li>
              <li className="flex gap-2">
                <Mail size={16} className="text-gold shrink-0" />
                <a href={`mailto:${site.email}`} className="hover:text-white">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs tracking-[0.25em] uppercase text-gold-light mb-4">
              Hours
            </h3>
            <ul className="space-y-2 text-sm text-muted">
              {site.hours.map((h) => (
                <li key={h.days} className="flex justify-between gap-4">
                  <span>{h.days}</span>
                  <span className="text-white/90">{h.time}</span>
                </li>
              ))}
            </ul>
            <div className="flex gap-4 mt-6">
              <a
                href={site.social.instagram}
                aria-label="Instagram"
                className="text-muted hover:text-gold-light transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href={site.social.facebook}
                aria-label="Facebook"
                className="text-muted hover:text-gold-light transition-colors"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-xs tracking-[0.25em] uppercase text-gold-light mb-4">Find us</h3>
          <GoogleMapEmbed />
        </div>

        <div className="mt-12 pt-8 border-t border-gold-subtle flex flex-col sm:flex-row justify-between gap-4 text-xs text-muted tracking-wide">
          <p>© {year} {site.name}. All rights reserved.</p>
          <p className="text-white/50 max-w-md text-right">{footer.closing}</p>
        </div>
      </div>
    </footer>
  )
}
