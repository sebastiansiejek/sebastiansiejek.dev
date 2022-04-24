import PageTemplate from 'components/views/templates/PageTemplate'
import { NextSeo } from 'next-seo'

export default function Custom404() {
  return (
    <>
      <NextSeo title="404" nofollow noindex />
      <PageTemplate title="404" />
    </>
  )
}
