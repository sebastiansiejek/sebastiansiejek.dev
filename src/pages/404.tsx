import { NextSeo } from 'next-seo'
import Navbar from '../components/containers/Navbar'
import Socials from '../components/containers/Socials'

export default function Custom404() {
  return (
    <>
      <NextSeo title="404" nofollow noindex />
      <div>
        <div className={'fixed w-full z-10'}>
          <Navbar />
        </div>
        <div className="bg-n w-screen h-screen flex flex-col justify-center items-center text-center">
          <h1 className="text-primary text-5xl md:text-7xl uppercase font-mono">
            404
          </h1>
          <Socials />
        </div>
      </div>
    </>
  )
}
