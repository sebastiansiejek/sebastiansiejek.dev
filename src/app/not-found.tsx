import { SiteNotFound } from 'features/portfolio/SiteNotFound'
import { notFoundMetadata } from 'lib/portfolio/metadata'

export function generateMetadata() {
  return notFoundMetadata('pl')
}

export default function NotFound() {
  return <SiteNotFound locale="pl" />
}
