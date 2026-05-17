import { images } from './images'
import {
  about,
  brandIntro,
  faq,
  featuredPopular,
  footer,
  seo,
  serviceOverviews,
  servicePages,
  testimonials,
  trustBadges,
  whyChooseUs,
} from './content'

export { galleryImages } from './images'
export {
  about,
  brandIntro,
  faq,
  featuredPopular,
  footer,
  seo,
  serviceOverviews,
  servicePages,
  testimonials,
  trustBadges,
  whyChooseUs,
}

export const site = {
  name: 'Miracle Beauty Care',
  shortName: 'Miracle',
  tagline: 'The Complete Family Salon & Makeup Studio',
  taglineAlt: 'Where Beauty Meets Confidence',
  location: 'Aroor',
  description: brandIntro,

  phone: '080757 20017',
  phoneSecondary: '+91 8075 668 843',
  phoneTel: '+918075720017',
  phoneSecondaryTel: '+918075668843',
  phoneRaw: '918075720017',
  email: 'miraclebeautycare@gmail.com',
  address: {
    line1: 'V8G3+MM5, NH 66, Panvel - Kochi - Kanyakumari Hwy',
    line2: 'Aroor gram panchayat',
    city: 'Kochi',
    region: 'Kerala',
    zip: '688534',
    country: 'India',
  },
  mapsEmbedSrc:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.6862706195275!2d76.3041241!3d9.876666299999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0871000a64ed75%3A0x85d880911c264c19!2sMiracle%20Beauty%20Care%20(The%20Complete%20Family%20Salon%20%26%20Makeup%20Studio)%20Aroor!5e0!3m2!1sen!2sin!4v1779043436056!5m2!1sen!2sin',
  whatsapp: {
    message: encodeURIComponent(
      'Hi Miracle Beauty Care, I would like to book an appointment in Aroor.',
    ),
  },
  hours: [{ days: 'Monday – Sunday', time: '9:00 AM – 9:00 PM' }],
  social: {
    instagram: 'https://instagram.com/',
    facebook: 'https://facebook.com/',
  },
  bookingUrl: '/contact',
  trustPoints: trustBadges.slice(0, 4),
  seo,
} as const

export type Service = {
  id: string
  name: string
  description: string
  duration: string
  priceFrom: string
  category: string
  image?: string
  slug?: string
}

export const serviceCategories = [
  'All',
  'Bridal',
  'Groom',
  'Hair',
  'Skin',
  'Nails',
  'Events',
] as const

export const services: Service[] = [
  {
    id: 'bridal-makeup',
    name: 'Bridal Makeup',
    description:
      'HD & traditional bridal makeup, engagement, reception, hairstyling, saree draping, and bridal consultation.',
    duration: 'By consultation',
    priceFrom: 'Custom',
    category: 'Bridal',
    image: images.services.bridalWedding,
    slug: 'bridal',
  },
  {
    id: 'groom-package',
    name: 'Groom Packages',
    description:
      'Groom makeup, beard styling, hair styling, facials, hair spa, and complete wedding preparation.',
    duration: 'By consultation',
    priceFrom: 'Custom',
    category: 'Groom',
    image: images.services.groomPackages,
    slug: 'groom',
  },
  {
    id: 'haircut',
    name: 'Haircut & Hairstyling',
    description:
      'Layer cut, feather cut, blow dry, curls, straightening, and occasion-ready styling.',
    duration: '45–90 min',
    priceFrom: '₹299',
    category: 'Hair',
    image: images.services.haircutStyling,
    slug: 'hair',
  },
  {
    id: 'hair-color-spa',
    name: 'Hair Coloring & Hair Spa',
    description:
      'Global color, highlights, root touch-up, hair spa, keratin, and nourishing treatments.',
    duration: '1–3 hrs',
    priceFrom: '₹699',
    category: 'Hair',
    image: images.services.hairColorSpa,
    slug: 'hair',
  },
  {
    id: 'hydra-facial',
    name: 'Facial & Cleanup Services',
    description:
      'Glow facials, cleanup, tan removal, hydrating facials, and premium skincare packages.',
    duration: '45–90 min',
    priceFrom: '₹499',
    category: 'Skin',
    image: images.services.facialCleanup,
    slug: 'facial',
  },
  {
    id: 'manicure-pedicure',
    name: 'Manicure, Pedicure & Foot Spa',
    description:
      'Nail polishing, shaping, manicure, pedicure, and relaxing hand & foot care.',
    duration: '45–75 min',
    priceFrom: '₹399',
    category: 'Nails',
    image: images.services.nailCare,
    slug: 'nails',
  },
  {
    id: 'guest-makeup',
    name: 'Guest Makeup & Event Styling',
    description:
      'Party makeup, guest styling, saree draping, and photoshoot-ready transformations.',
    duration: '60–120 min',
    priceFrom: '₹999',
    category: 'Events',
    image: images.services.guestEvents,
    slug: 'events',
  },
  {
    id: 'first-communion',
    name: 'First Communion Packages',
    description:
      'Age-appropriate makeup, hairstyling, and grooming for boys and girls.',
    duration: 'By consultation',
    priceFrom: 'Custom',
    category: 'Bridal',
    image: images.services.firstCommunion,
    slug: 'first-communion',
  },
  {
    id: 'hair-wash',
    name: 'Hair Wash & Conditioning',
    description:
      'Relaxing shampoo, conditioning, and scalp care for the whole family.',
    duration: '30–45 min',
    priceFrom: '₹199',
    category: 'Hair',
    image: images.services.hairWash,
    slug: 'hair',
  },
]

export const team = [
  {
    id: '1',
    name: 'Hair & Grooming Team',
    role: 'Professional Stylists',
    bio: 'Expert cuts, coloring, beard styling, and groom preparation with modern techniques.',
    image: images.services.haircutStyling,
  },
  {
    id: '2',
    name: 'Skin & Beauty Team',
    role: 'Facial Specialists',
    bio: 'Glow facials, cleanup, tan removal, and everyday skincare tailored to you.',
    image: images.services.facialCleanup,
  },
  {
    id: '3',
    name: 'Bridal & Events Team',
    role: 'Bridal Makeup Artists',
    bio: 'HD bridal makeup, reception looks, saree draping, and event styling.',
    image: images.services.bridalWedding,
  },
]
