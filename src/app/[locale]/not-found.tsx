import { getLocale } from 'next-intl/server'
import { notFoundMetadata } from '_app/seo/index.server'
import { NotFoundPage } from '_pages/not-found'

export async function generateMetadata() {
  return notFoundMetadata(await getLocale())
}

export default async function NotFound() {
  return <NotFoundPage locale={await getLocale()} />
}
