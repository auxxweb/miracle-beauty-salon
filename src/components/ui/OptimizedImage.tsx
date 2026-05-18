import type { ImgHTMLAttributes } from 'react'

type OptimizedImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  fetchPriority?: 'high' | 'low' | 'auto'
}

export function OptimizedImage({
  loading = 'lazy',
  decoding = 'async',
  fetchPriority,
  ...props
}: OptimizedImageProps) {
  return <img loading={loading} decoding={decoding} fetchPriority={fetchPriority} {...props} />
}
