'use client'

import { Loader2, Menu } from 'lucide-react'
import * as React from 'react'
import { useState } from 'react'
import { INavbarMenu } from '../NavbarMenu/NavbarMenu'
import Link from 'next/link'
import { Router } from 'next/router'
import Socials from '@/widgets/Socials/Socials'
import Container from '@/shared/ui/Container/Container'
import ThemeModeSwitcher from '@/widgets/ThemeModeSwitcher/ThemeModeSwitcher'
import { Sheet, SheetContent, SheetTrigger } from '@/shared/ui/sheet'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/shared/ui/navigation-menu'

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
    <NavigationMenuItem>
      <Link href={props.href} passHref className={'w-full flex justify-end'}>
        <NavigationMenuLink
          className={'text-lg flex items-center justify-end flex-row'}
          onClick={() => {
            setLoading(true)
          }}
        >
          {isLoading && <Loader2 className="animate-spin" />}
          {props.title}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  )
}

export const NavbarMenuMobile = ({ menu }: INavbarMenuMobile) => {
  const [isOpen, setOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent>
        <Container className={'flex flex-col gap-6'}>
          <NavigationMenu
            className={'py-10 max-w-none w-full justify-end text-primary'}
          >
            <NavigationMenuList className={'flex-col items-end'}>
              {menu.map(({ title, path }) => (
                <NavbarMenuMobileItemLink
                  key={path}
                  href={path}
                  title={title}
                  setOpen={setOpen}
                />
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex justify-center">
            <Socials />
          </div>
          <div className="flex w-full items-center justify-center">
            <ThemeModeSwitcher />
          </div>
        </Container>
      </SheetContent>
    </Sheet>
  )
}
