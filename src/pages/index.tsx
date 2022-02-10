import Socials from 'components/containers/Socials'
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
      <div className="bg-n w-screen h-screen flex flex-col justify-center items-center text-center">
        <h1 className="text-primary text-5xl md:text-7xl uppercase font-mono">
          Sebastian Siejek
        </h1>
        <Socials />
      </div>
    </>
  )
}

export default Home
