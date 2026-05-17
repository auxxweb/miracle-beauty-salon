import { images } from './images'

export const seo = {
  defaultTitle:
    'Miracle Beauty Care – Best Family Salon & Makeup Studio in Aroor',
  defaultDescription:
    'Miracle Beauty Care is a trusted family salon and makeup studio in Aroor offering bridal makeup, hair styling, facials, grooming, nail care, hair spa, skincare, and complete beauty services for women, men, and families.',
  keywords: [
    'Best salon in Aroor',
    'Beauty parlour in Aroor',
    'Bridal makeup in Aroor',
    'Family salon in Aroor',
    'Makeup studio in Aroor',
    'Hair spa in Aroor',
    'Groom packages in Aroor',
  ],
} as const

export const hero = {
  eyebrow: 'The Complete Family Salon & Makeup Studio',
  headline: 'The Complete Family Salon & Makeup Studio · Aroor',
  subheadline:
    'From bridal transformations and professional makeup to hair styling, facials, grooming, nail care, and advanced hair treatments — Miracle Beauty Care delivers premium salon experiences for women, men, and families in Aroor.',
  description:
    'From bridal transformations and professional makeup to hair styling, facials, grooming, nail care, and advanced hair treatments — Miracle Beauty Care delivers premium salon experiences for women, men, and families in Aroor.',
  ctas: [
    { label: 'Book Appointment', to: '/contact', variant: 'primary' as const },
    { label: 'Explore Services', to: '/services', variant: 'secondary' as const },
    { label: 'Bridal Consultation', to: '/services/bridal', variant: 'secondary' as const },
  ],
}

export const brandIntro =
  'Welcome to Miracle Beauty Care, the trusted family salon and makeup studio in Aroor offering complete beauty, grooming, bridal, hair, skincare, and makeover services for women, men, and kids. At Miracle Beauty Care, beauty is not just about appearance — it is about confidence, elegance, and self-care.'

export const about = {
  title: 'About Miracle Beauty Care',
  paragraphs: [
    'Miracle Beauty Care is one of the most trusted salons in Aroor, known for delivering professional beauty and grooming services with quality products, experienced stylists, and personalized care.',
    'We believe every customer deserves confidence, comfort, and a premium salon experience. Whether you are preparing for a wedding, party, family function, photoshoot, office event, or simply looking for self-care, our expert team is here to help you look and feel your best.',
    'We combine beauty expertise, hygiene, modern techniques, and customer satisfaction to create stunning results for every client.',
  ],
  offerings: [
    'Bridal & Groom Makeup Packages',
    'Haircuts & Hair Styling',
    'Hair Coloring & Hair Spa',
    'Advanced Hair Treatments',
    'Facials & Cleanup Services',
    'Nail Care, Pedicure & Manicure',
    'Saree Draping & Guest Styling',
    'Kids & First Communion Makeup Packages',
    'Unisex Grooming Services',
  ],
  closing:
    'At Miracle Beauty Care, we believe beauty is confidence, elegance, and self-expression. Our mission is to provide professional beauty experiences that make every client feel special, refreshed, and confident.',
}

export const whyChooseUs = [
  {
    title: 'Professional Beauty Experts',
    text: 'Experienced beauticians and stylists focused on quality and perfection.',
  },
  {
    title: 'Premium Products',
    text: 'We use trusted beauty and skincare products for safe and effective results.',
  },
  {
    title: 'Bridal Makeup Specialists',
    text: 'Customized bridal and event makeup services designed to match your style.',
  },
  {
    title: 'Family-Friendly Salon',
    text: 'Professional services for women, men, brides, grooms, and kids.',
  },
  {
    title: 'Hygienic & Comfortable Environment',
    text: 'Clean, safe, relaxing, and customer-friendly salon experience.',
  },
  {
    title: 'Affordable Premium Services',
    text: 'Luxury beauty care services at reasonable pricing.',
  },
]

export const trustBadges = [
  'Professional Beauty Experts',
  'Bridal Makeup Specialists',
  'Hygienic Salon Environment',
  'Premium Beauty Products',
  'Family-Friendly Salon',
  'Personalized Beauty Care',
  'Modern Styling Techniques',
  'Trusted by Customers in Aroor',
]

export const serviceOverviews = [
  {
    id: 'bridal',
    title: 'Bridal Makeup & Wedding Packages',
    summary:
      'Transform your wedding day look with elegant bridal makeup, hairstyling, saree draping, skin preparation, and complete bridal beauty packages.',
    image: images.services.bridalMakeup,
    to: '/services/bridal',
  },
  {
    id: 'communion',
    title: 'First Communion Packages',
    summary:
      'Special grooming and makeup packages for boys and girls designed for memorable communion celebrations.',
    image: images.services.firstCommunion,
    to: '/services/first-communion',
  },
  {
    id: 'nails',
    title: 'Nail Care Services',
    summary:
      'Nail polishing, nail shaping, manicure, and pedicure services for clean, stylish, and beautiful nails.',
    image: images.services.nailCare,
    to: '/services/nails',
  },
  {
    id: 'events',
    title: 'Guest Makeup & Event Styling',
    summary:
      'Party makeup, guest makeup, hairstyling, saree draping, and complete event-ready beauty transformations.',
    image: images.services.guestEvents,
    to: '/services/events',
  },
  {
    id: 'facial',
    title: 'Facial & Cleanup Services',
    summary:
      'Refresh your skin with professional facials, cleanup services, glow treatments, and skincare solutions for healthy radiant skin.',
    image: images.services.facialCleanup,
    to: '/services/facial',
  },
  {
    id: 'groom',
    title: 'Groom Packages',
    summary:
      'Professional grooming for grooms including hairstyling, facial grooming, cleanup, makeup, beard styling, and premium wedding preparation.',
    image: images.services.groomPackage,
    to: '/services/groom',
  },
]

export type ServicePageContent = {
  slug: string
  title: string
  metaDescription: string
  intro: string
  image: string
  sections: { heading: string; items: string[] }[]
  closing?: string
}

export const servicePages: Record<string, ServicePageContent> = {
  bridal: {
    slug: 'bridal',
    title: 'Bridal Makeup in Aroor',
    metaDescription:
      'Professional bridal makeup, HD bridal looks, engagement & reception makeup, hairstyling, and saree draping at Miracle Beauty Care, Aroor.',
    intro:
      'Make your special day unforgettable with professional bridal makeup services at Miracle Beauty Care. We create elegant bridal looks that enhance your natural beauty while perfectly matching your outfit, wedding theme, and personal style.',
    image: images.services.bridalMakeup,
    sections: [
      {
        heading: 'Our Bridal Services Include',
        items: [
          'HD Bridal Makeup',
          'Traditional Bridal Makeup',
          'Engagement Makeup',
          'Reception Makeup',
          'Hairstyling',
          'Saree Draping',
          'Skin Preparation',
          'Bridal Hair Setting',
          'Bridal Glow Treatments',
          'Bridal Consultation',
        ],
      },
    ],
    closing:
      'Our bridal team focuses on every detail to ensure you feel confident, beautiful, and stress-free on your wedding day.',
  },
  groom: {
    slug: 'groom',
    title: 'Groom Packages & Grooming Services',
    metaDescription:
      'Groom makeup, beard styling, hair styling, facials, and complete groom preparation packages in Aroor at Miracle Beauty Care.',
    intro:
      'Miracle Beauty Care offers professional groom packages designed to help every groom look stylish, fresh, and confident for weddings and special occasions.',
    image: images.services.groomPackage,
    sections: [
      {
        heading: 'Groom Services Include',
        items: [
          'Groom Makeup',
          'Facial & Cleanup',
          'Beard Styling',
          'Hair Styling',
          'Hair Coloring',
          'Skin Glow Treatments',
          'Hair Spa',
          'Groom Styling Packages',
        ],
      },
    ],
  },
  hair: {
    slug: 'hair',
    title: 'Professional Hair Services in Aroor',
    metaDescription:
      'Haircuts, coloring, highlights, hair spa, smoothening, and advanced hair treatments for women and men at Miracle Beauty Care, Aroor.',
    intro:
      'From trendy haircuts to advanced hair treatments, Miracle Beauty Care offers complete haircare solutions for women and men.',
    image: images.services.haircutStyling,
    sections: [
      {
        heading: 'Hair Services',
        items: [
          'Hair Cutting',
          'Layer Cut',
          'U Cut',
          'Feather Cut',
          'Hair Smoothening',
          'Hair Straightening',
          'Hair Curling',
          'Blow Dry',
          'Hair Ironing',
          'Hair Wash & Conditioning',
          'Hair Coloring',
          'Root Touch-Up',
          'Global Coloring',
          'Highlights',
          'Hair Spa',
          'Dandruff Treatments',
          'Hair Fall Treatments',
          'Keratin & Nourishing Treatments',
        ],
      },
    ],
    closing:
      'Healthy hair starts with professional care. We use quality products and modern techniques to protect and improve your hair health.',
  },
  facial: {
    slug: 'facial',
    title: 'Facial & Skincare Treatments',
    metaDescription:
      'Glow facials, cleanup, tan removal, hydrating facials, and premium skincare at Miracle Beauty Care, Aroor.',
    intro:
      'Healthy skin creates natural confidence. Our skincare treatments are designed to cleanse, refresh, nourish, and brighten your skin.',
    image: images.services.facialCleanup,
    sections: [
      {
        heading: 'Skin Services',
        items: [
          'Cleanup Services',
          'Glow Facials',
          'Tan Removal Treatments',
          'Hydrating Facials',
          'Skin Brightening',
          'Detan Treatments',
          'Anti-Dullness Care',
          'Groom Facials',
          'Premium Facial Packages',
        ],
      },
      {
        heading: 'Benefits',
        items: [
          'Deep Cleansing',
          'Instant Glow',
          'Skin Rejuvenation',
          'Improved Hydration',
          'Relaxation & Freshness',
        ],
      },
    ],
  },
  nails: {
    slug: 'nails',
    title: 'Nail Care, Pedicure & Manicure',
    metaDescription:
      'Manicure, pedicure, nail polishing, and hand & foot care at Miracle Beauty Care, Aroor.',
    intro:
      'Keep your hands and feet beautiful, healthy, and polished with our professional nail care services.',
    image: images.services.nailCare,
    sections: [
      {
        heading: 'Nail & Foot Care Services',
        items: [
          'Nail Polishing',
          'Nail Cutting & Filing',
          'Manicure',
          'Pedicure',
          'Hand Care',
          'Foot Care',
          'Nail Shaping',
        ],
      },
    ],
  },
  'first-communion': {
    slug: 'first-communion',
    title: 'First Communion Makeup & Styling Packages',
    metaDescription:
      'First Communion grooming and makeup packages for boys and girls at Miracle Beauty Care, Aroor.',
    intro:
      'Celebrate special moments beautifully with our First Communion grooming and makeup packages for boys and girls.',
    image: images.services.firstCommunion,
    sections: [
      {
        heading: 'Services Include',
        items: [
          'Makeup',
          'Hairstyling',
          'Grooming',
          'Skin Preparation',
          'Customized Styling',
        ],
      },
    ],
    closing:
      'We create elegant, age-appropriate looks that make children feel confident and comfortable on their special day.',
  },
  events: {
    slug: 'events',
    title: 'Guest Makeup & Event Styling',
    metaDescription:
      'Party makeup, guest makeup, saree draping, and event hairstyling in Aroor at Miracle Beauty Care.',
    intro:
      'Look event-ready with professional party makeup, guest styling, and complete beauty transformations for every celebration.',
    image: images.services.guestEvents,
    sections: [
      {
        heading: 'Event Services',
        items: [
          'Party Makeup',
          'Guest Makeup',
          'Hairstyling',
          'Saree Draping',
          'Photoshoot Makeup',
          'Family Function Styling',
        ],
      },
    ],
  },
}

export const featuredPopular = [
  {
    id: 'popular-bridal',
    title: 'Bridal Makeup',
    summary:
      'Elegant bridal looks with professional makeup artistry, hairstyling, saree draping, and personalized beauty preparation.',
    image: images.services.bridalMakeup,
    to: '/services/bridal',
  },
  {
    id: 'popular-groom',
    title: 'Groom Packages',
    summary:
      'Complete groom preparation including cleanup, grooming, hairstyling, beard styling, and wedding-ready skin care.',
    image: images.services.groomPackage,
    to: '/services/groom',
  },
  {
    id: 'popular-hair-color',
    title: 'Hair Coloring & Hair Spa',
    summary:
      'Global color, highlights, root touch-up, deep conditioning, and nourishing hair spa treatments.',
    image: images.services.hairColorSpa,
    to: '/services/hair',
  },
  {
    id: 'popular-haircut',
    title: 'Haircut & Hairstyling',
    summary:
      'Modern cuts, blow dry, curls, straightening, and occasion-ready styling for women and men.',
    image: images.services.haircutStyling,
    to: '/services/hair',
  },
]

export const testimonials = [
  {
    id: '1',
    quote:
      'Absolutely loved the bridal makeup and hairstyling. The team was professional, friendly, and made my wedding day stress-free.',
    author: 'Bridal Client',
    role: 'Wedding day',
  },
  {
    id: '2',
    quote:
      'One of the best salons in Aroor. Clean atmosphere, good service, and excellent staff behavior.',
    author: 'Regular Guest',
    role: 'Family salon',
  },
  {
    id: '3',
    quote:
      'Highly recommended for hair spa and facials. The results were amazing and worth every visit.',
    author: 'Hair & Skin Client',
    role: 'Hair spa & facial',
  },
  {
    id: '4',
    quote:
      'Perfect place for family grooming and bridal services. Very professional experience.',
    author: 'Family Client',
    role: 'Bridal & grooming',
  },
]

export const faq = [
  {
    q: 'Do I need an appointment?',
    a: 'Appointments are recommended for faster service and better scheduling. Walk-ins may be accommodated based on availability.',
  },
  {
    q: 'Do you offer bridal consultation?',
    a: 'Yes, we provide bridal consultations and customized bridal packages tailored to your wedding style and preferences.',
  },
  {
    q: 'Do you provide services for men?',
    a: 'Yes, we offer complete grooming and haircare services for men, including groom packages and beard styling.',
  },
  {
    q: 'What beauty services do you provide?',
    a: 'We offer bridal makeup, haircuts, hairstyling, hair coloring, facials, cleanup, manicure, pedicure, hair spa, skincare, and makeover services.',
  },
  {
    q: 'Do you offer family salon services?',
    a: 'Yes, Miracle Beauty Care is a complete family salon serving women, men, brides, grooms, and children.',
  },
]

export const cta = {
  title: 'Ready for Your Beauty Transformation?',
  subtitle:
    'Book your appointment today at Miracle Beauty Care and experience professional salon services in Aroor.',
  buttons: [
    { label: 'Book Now', to: '/contact' },
    { label: 'Call Now', href: 'tel:+918075720017' },
    { label: 'WhatsApp Us', href: 'https://wa.me/918075720017' },
  ],
}

export const footer = {
  tagline: 'The Complete Family Salon & Makeup Studio in Aroor.',
  description:
    'Professional bridal makeup, haircare, facials, grooming, skincare, and beauty services for women, men, and families.',
  closing:
    'Book your appointment today and experience premium beauty care with expert professionals.',
}

export const whatsapp = {
  number: '918075720017',
  message: encodeURIComponent(
    'Hi Miracle Beauty Care, I would like to book an appointment in Aroor.',
  ),
}
