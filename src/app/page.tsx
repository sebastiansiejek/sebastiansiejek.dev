import Socials from '@/widgets/Socials/Socials'
import Navbar from '@/widgets/Navbar/Navbar'

export default function HomePage() {
  return (
    <div>
      <div className={'fixed w-full z-10'}>
        <Navbar />
      </div>
      <div className="bg-n w-screen h-screen flex flex-col justify-center items-center text-center">
        <h1 className={'text-3xl md:text-5xl font-mono text-primary uppercase'}>
          Sebastian Siejek
        </h1>
        <h2 className={'text-xl md:text-3xl font-mono text-primary mb-6'}>
          Software Engineer
        </h2>
        <Socials />
      </div>
    </div>
  )
}
