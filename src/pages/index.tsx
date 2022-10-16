import type { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import Navbar from '../components/containers/Navbar'
import Socials from '../components/containers/Socials'

const Home: NextPage = () => {
  return (
    <>
      <NextSeo
        title="Sebastian Siejek"
        description="Sebastian Siejek - Software Engineer"
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
        <div className={'fixed w-full z-10'}>
          <Navbar />
        </div>
        <div className="bg-n w-screen h-screen flex flex-col justify-center items-center text-center">
          <h1
            className={'text-3xl md:text-5xl font-mono text-primary uppercase'}
          >
            Sebastian Siejek
          </h1>
          <h2 className={'text-xl md:text-3xl font-mono text-primary mb-6'}>
            Software Engineer
          </h2>
          <Socials />
        </div>
      </div>
    </>
  )
}

export default Home
