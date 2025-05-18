import { PropsWithChildren } from 'react'
import Navbar from '@/widgets/Navbar/Navbar'
import Socials from '@/widgets/Socials/Socials'

export default function BlogLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      <main className="py-12">{children}</main>
      <footer className={' py-12'}>
        <div className="flex items-center justify-center flex-col">
          <Socials />
          <p className={'mt-5'}>sebastiansiejek.dev</p>
        </div>
      </footer>
    </>
  )
}
