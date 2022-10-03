import type { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import Navbar from '../components/containers/Navbar'
import Socials from '../components/containers/Socials'

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
      <div>
        <div className={'fixed w-full'}>
          <Navbar />
        </div>
        <div className="bg-n w-screen h-screen flex flex-col justify-center items-center text-center">
          <Socials />
        </div>
      </div>
    </>
  )
}

export default Home
