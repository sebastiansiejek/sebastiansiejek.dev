import Socials from 'components/containers/Socials'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <div className="bg-n w-screen h-screen flex flex-col justify-center items-center text-center">
      <h1 className="text-primary text-5xl md:text-7xl uppercase font-mono">
        Sebastian Siejek
      </h1>
      <Socials />
    </div>
  )
}

export default Home
