import Socials from '../../../containers/Socials'
import Navbar from '../../../containers/Navbar'
import { ReactNode } from 'react'

interface IPageTemplate {
  children: ReactNode
}

const PageTemplate = ({ children }: IPageTemplate) => {
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

export default PageTemplate
