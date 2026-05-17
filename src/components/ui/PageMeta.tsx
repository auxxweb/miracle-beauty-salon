import { useEffect } from 'react'
import { seo } from '@/data/content'
import { site } from '@/data/site'

type Props = {
  title: string
  description?: string
}

export function PageMeta({ title, description }: Props) {
  useEffect(() => {
    const isHome = title === 'Home'
    document.title = isHome
      ? seo.defaultTitle
      : `${title} | ${site.name} · ${site.location}`
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute('content', description ?? seo.defaultDescription)
    }
  }, [title, description])

  return null
}
