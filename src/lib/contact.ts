import { site } from '@/data/site'

type SiteAddress = (typeof site)['address']

export function formatSiteAddress(address: SiteAddress = site.address): string {
  return [address.line1, address.line2, address.city, address.region, address.zip, address.country]
    .filter(Boolean)
    .join(', ')
}
