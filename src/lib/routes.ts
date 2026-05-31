/** Central route paths for React Router (hash-based on GitHub Pages). */
export const routes = {
  home: '/',
  offers: '/offers',
  services: '/services',
  service: (slug: string) => `/services/${slug}`,
  about: '/about',
  gallery: '/gallery',
  contact: '/contact',
  book: '/book',
} as const
