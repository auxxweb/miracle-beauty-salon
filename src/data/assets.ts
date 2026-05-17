import { assetUrl } from '@/lib/assetUrl'
import { images } from './images'

export const assets = {
  logo: images.logo,
  logoFallback: assetUrl('/assets/logo/logo-primary.svg'),
  hero: images.hero,
  heroOverlay: true,
} as const
