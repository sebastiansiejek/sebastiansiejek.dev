import FullPageTemplate from 'components/views/templates/FullPageTemplate'
import type { NextPage } from 'next'
import { NextSeo } from 'next-seo'

const Home: NextPage = () => {
  return (
    <>
      <NextSeo
        title="Sebastian Siejek"
        description="Sebastian Siejek - Web Developer"
        canonical="https://sebastiansiejek.dev"
        additionalMetaTags={[
          { name: 'author', content: 'Sebastian Siejek' },
          {
            name: 'keywords',
            content:
              'web, developer, software, engineer, javascript, react, nextjs, php, wordpress, empressia',
          },
        ]}
      />
      <FullPageTemplate title="Sebastian Siejek" />
    </>
  )
}

export default Home
