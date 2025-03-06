import { PropsWithChildren } from 'react'
import Navbar from 'components/containers/Navbar'
import Socials from 'components/containers/Socials'

export default function BlogLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      <main className="py-12">{children}</main>
      <footer className={'bg-n py-12 text-n-0'}>
        <div className="flex items-center justify-center flex-col">
          <Socials />
          <p className={'mt-5'}>sebastiansiejek.dev</p>
        </div>
      </footer>
    </>
  )
}
