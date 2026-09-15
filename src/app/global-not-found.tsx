import { notFoundMetadata, siteMetadata } from '_app/seo/index.server'
import { NotFoundPage } from '_pages/not-found'
import { RootDocument } from '_app/document'

export async function generateMetadata() {
  return { ...siteMetadata, ...(await notFoundMetadata('pl')) }
}

export default function GlobalNotFound() {
  return (
    <RootDocument locale="pl">
      <NotFoundPage locale="pl" />
    </RootDocument>
  )
}
