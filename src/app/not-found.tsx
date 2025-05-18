import { Metadata } from 'next'
import Navbar from '@/widgets/Navbar/Navbar'
import Socials from '@/widgets/Socials/Socials'

export const metadata: Metadata = {
  title: 'Not found - 404',
  robots: {
    follow: false,
    index: false,
  },
}

export default function NotFound() {
  return (
    <>
      <div>
        <div className={'fixed w-full z-10'}>
          <Navbar />
        </div>
        <div className=" w-screen h-screen flex flex-col justify-center items-center text-center">
          <h1 className="text-primary text-5xl md:text-7xl uppercase font-mono">
            404
          </h1>
          <Socials />
        </div>
      </div>
    </>
  )
}
