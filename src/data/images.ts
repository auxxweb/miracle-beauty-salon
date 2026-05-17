import { assetUrl } from '@/lib/assetUrl'

/** Local salon photography — paths under /public/assets */
const p = assetUrl

export const images = {
  logo: p('/assets/logo/logo-primary.png'),
  hero: p('/assets/hero/salon-interior.png'),
  heroAlt: p('/assets/hero/salon-wide.png'),
  about: {
    storefront: p('/assets/about/storefront-day.png'),
    storefrontServices: p('/assets/about/storefront-services.png'),
    signNight: p('/assets/about/sign-night.png'),
    reception: p('/assets/about/reception.png'),
  },
  services: {
    bridalMakeup: p('/assets/services/bridal-makeup.png'),
    bridalWedding: p('/assets/services/bridal-makeup.png'),
    groomPackage: p('/assets/services/groom-package.png'),
    groomPackages: p('/assets/services/groom-package.png'),
    guestEvents: p('/assets/services/guest-events.png'),
    hairColorSpa: p('/assets/services/hair-color-spa.png'),
    facialCleanup: p('/assets/services/facial-cleanup.png'),
    haircutStyling: p('/assets/services/haircut-styling.png'),
    firstCommunion: p('/assets/services/first-communion.png'),
    nailCare: p('/assets/services/nail-care.png'),
    bridal: p('/assets/services/bridal-makeup.png'),
    mensGrooming: p('/assets/services/groom-package.png'),
    hairWash: p('/assets/services/hair-color-spa.png'),
    facial: p('/assets/services/facial-cleanup.png'),
    kidsStyling: p('/assets/services/first-communion.png'),
    pedicure: p('/assets/services/nail-care.png'),
  },
} as const

export type HeroSlide = {
  src: string
  alt: string
}

/** Hero carousel — 3 featured slides */
export const heroSlides: HeroSlide[] = [
  {
    src: images.hero,
    alt: 'Miracle Beauty Care salon interior with gold halo mirrors',
  },
  {
    src: images.services.bridalWedding,
    alt: 'Bridal makeup and wedding styling at Miracle Beauty Care',
  },
  {
    src: p('/assets/gallery/gold-mirrors.png'),
    alt: 'Gold-framed mirrors and luxury salon lighting',
  },
]

export type GalleryImage = {
  id: string
  src: string
  alt: string
  category?: 'interior' | 'services' | 'portfolio'
}

export const galleryImages: GalleryImage[] = [
  { id: 'hero-wide', src: p('/assets/hero/salon-wide.png'), alt: 'Miracle Beauty Care salon interior', category: 'interior' },
  { id: 'gold-mirrors', src: p('/assets/gallery/gold-mirrors.png'), alt: 'Gold-framed halo mirrors and styling stations', category: 'interior' },
  { id: 'salon-chairs', src: p('/assets/gallery/salon-chairs.png'), alt: 'Premium leather styling chairs', category: 'interior' },
  { id: 'interior-framed', src: p('/assets/gallery/interior-framed.png'), alt: 'Salon interior through wooden frame', category: 'interior' },
  { id: 'salon-overview', src: p('/assets/gallery/salon-overview.png'), alt: 'Full salon overview with gold mirrors', category: 'interior' },
  { id: 'stations-grey', src: p('/assets/gallery/stations-grey-wall.png'), alt: 'Styling stations with grey feature wall', category: 'interior' },
  { id: 'styling-station', src: p('/assets/gallery/styling-station.png'), alt: 'LED mirror styling station with tools', category: 'interior' },
  { id: 'waiting', src: p('/assets/gallery/waiting-area.png'), alt: 'Comfortable waiting and treatment area', category: 'interior' },
  { id: 'reception', src: p('/assets/about/reception.png'), alt: 'Reception with Miracle Beauty Care branding', category: 'interior' },
  { id: 'storefront', src: p('/assets/about/storefront-day.png'), alt: 'Miracle Beauty Care storefront in Aroor', category: 'interior' },
  { id: 'sign-night', src: p('/assets/about/sign-night.png'), alt: 'Illuminated salon sign at night — Aroor', category: 'interior' },
  { id: 'hair-wash', src: images.services.hairColorSpa, alt: 'Relaxing hair wash for a young guest', category: 'services' },
  { id: 'facial', src: images.services.facialCleanup, alt: 'Facial massage and skin treatment', category: 'services' },
  { id: 'mens-grooming', src: images.services.groomPackages, alt: "Men's haircut and beard grooming", category: 'services' },
  { id: 'kids', src: images.services.firstCommunion, alt: "Kids' blowout and styling", category: 'services' },
  { id: 'pedicure', src: images.services.nailCare, alt: 'Pedicure and hair wash stations', category: 'services' },
  { id: 'bridal', src: images.services.bridalWedding, alt: 'Bridal and groom wedding styling', category: 'services' },
  { id: 'portfolio-1', src: p('/assets/gallery/portfolio-1.png'), alt: 'Salon work portfolio', category: 'portfolio' },
  { id: 'portfolio-2', src: p('/assets/gallery/portfolio-2.png'), alt: 'Salon work portfolio', category: 'portfolio' },
  { id: 'portfolio-3', src: p('/assets/gallery/portfolio-3.png'), alt: 'Salon work portfolio', category: 'portfolio' },
  { id: 'portfolio-4', src: p('/assets/gallery/portfolio-4.png'), alt: 'Salon work portfolio', category: 'portfolio' },
  { id: 'interior-detail', src: p('/assets/gallery/interior-detail.png'), alt: 'Salon interior detail', category: 'interior' },
  { id: 'workspace', src: p('/assets/gallery/workspace.png'), alt: 'Salon workspace', category: 'interior' },
]
