import { notFoundMetadata } from '_app/seo/index.server'
import { NotFoundPage } from '_pages/not-found'

export function generateMetadata() {
  return notFoundMetadata('pl')
}

export default function NotFound() {
  return <NotFoundPage locale="pl" />
}
