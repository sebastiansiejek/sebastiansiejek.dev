import { Divide as Hamburger } from 'hamburger-react'
import { useState } from 'react'
import Container from '../../../views/Container'
import { INavbarMenu } from '../NavbarMenu/NavbarMenu'
import Link from 'next/link'
import Button from '../../../views/Button'
import clsx from 'clsx'
import Socials from '../../Socials'
import ModalOverlay from '../../../views/ModalOverlay/ModalOverlay'
import dynamic from 'next/dynamic'
import { Router } from 'next/router'

const ThemeModeSwitcher = dynamic(() => import('../../ThemeModeSwitcher'), {
  ssr: false,
})

interface INavbarMenuMobile {
  menu: INavbarMenu['data']
}

function NavbarMenuMobileItemLink(props: {
  href: string
  title: string
  setOpen: (isOpen: boolean) => void
}) {
  const [isLoading, setLoading] = useState(false)

  Router.events.on('routeChangeComplete', () => {
    props.setOpen(false)
    setLoading(false)
  })

  return (
    <li
      className={
        'relative group text-primary font-mono flex font-medium w-full'
      }
    >
      <Link href={props.href} passHref className={'w-full flex justify-end'}>
        <Button
          title={props.title}
          variant={'link'}
          isFullWidth
          isLoading={isLoading}
          onClick={() => {
            setLoading(true)
          }}
        />
      </Link>
    </li>
  )
}

const NavbarMenuMobile = ({ menu }: INavbarMenuMobile) => {
  const [isOpen, setOpen] = useState(false)

  return (
    <div className={'lg:hidden'}>
      <ModalOverlay isOpen={isOpen} toggle={() => setOpen(!isOpen)} />
      <Hamburger toggle={setOpen} toggled={isOpen} />
      <div
        className={clsx(
          'transition-transform z-40 overflow-y-auto fixed top-0 right-0 bg-n w-3/4 h-full pt-2 pb-8 flex',
          {
            'translate-x-0': isOpen,
            'translate-x-full': !isOpen,
          },
        )}
      >
        <Container className={'flex flex-col'}>
          <div className="flex w-full items-center justify-between ">
            {/*<ThemeModeSwitcher />*/}
            <div className="ml-auto">
              <Hamburger toggle={() => setOpen(!isOpen)} toggled={isOpen} />
            </div>
          </div>
          <nav className={'py-10'}>
            <ul className={'flex items-end flex-col w-full gap-6'}>
              {menu.map(({ title, path }) => (
                <NavbarMenuMobileItemLink
                  key={path}
                  href={path}
                  title={title}
                  setOpen={setOpen}
                />
              ))}
            </ul>
          </nav>
          <div className="flex justify-center mt-auto">
            <Socials />
          </div>
        </Container>
      </div>
    </div>
  )
}

export default NavbarMenuMobile
