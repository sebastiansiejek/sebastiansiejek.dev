'use client'

import { Divide as Hamburger } from 'hamburger-react'
import { useState } from 'react'
import { INavbarMenu } from '../NavbarMenu/NavbarMenu'
import Link from 'next/link'
import clsx from 'clsx'
import { Router } from 'next/router'
import Socials from '@/widgets/Socials/Socials'
import Container from '@/shared/ui/Container/Container'
import ModalOverlay from '@/shared/ui/ModalOverlay/ModalOverlay'
import ThemeModeSwitcher from '@/widgets/ThemeModeSwitcher/ThemeModeSwitcher'
import { Button } from '@/shared/ui/button'

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
          variant={'link'}
          isLoading={isLoading}
          onClick={() => {
            setLoading(true)
          }}
        >
          {props.title}
        </Button>
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
          'transition-transform z-40 overflow-y-auto fixed top-0 right-0  w-3/4 h-full pt-2 pb-8 flex',
          {
            'translate-x-0': isOpen,
            'translate-x-full': !isOpen,
          },
        )}
      >
        <Container className={'flex flex-col'}>
          <div className="flex w-full items-center justify-between">
            <ThemeModeSwitcher />
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
