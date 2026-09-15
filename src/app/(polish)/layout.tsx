import type { PropsWithChildren } from 'react'
import { RootDocument } from '_app/document'

export { siteMetadata as metadata } from '_app/seo/index.server'

export default function PolishLayout({ children }: PropsWithChildren) {
  return <RootDocument locale="pl">{children}</RootDocument>
}
