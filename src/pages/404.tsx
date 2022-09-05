import FullPageTemplate from 'components/views/templates/FullPageTemplate'
import { NextSeo } from 'next-seo'

export default function Custom404() {
  return (
    <>
      <NextSeo title="404" nofollow noindex />
      <FullPageTemplate title="404" />
    </>
  )
}
