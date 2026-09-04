import { getLocale } from 'next-intl/server'
import { SiteNotFound } from 'features/portfolio/SiteNotFound'
import { notFoundMetadata } from 'lib/portfolio/metadata'

export async function generateMetadata() {
  return notFoundMetadata(await getLocale())
}

export default async function NotFound() {
  return <SiteNotFound locale={await getLocale()} />
}
