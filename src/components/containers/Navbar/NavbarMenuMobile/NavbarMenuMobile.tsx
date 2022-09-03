import { Divide as Hamburger } from 'hamburger-react'
import { useState } from 'react'
import Container from '../../../views/Container'
import { INavbarMenu } from '../NavbarMenu/NavbarMenu'
import Link from 'next/link'
import Button from '../../../views/Button'
import clsx from 'clsx'
import Socials from '../../Socials'

interface INavbarMenuMobile {
  menu: INavbarMenu['data']
}

const NavbarMenuMobile = ({ menu }: INavbarMenuMobile) => {
  const [isOpen, setOpen] = useState(false)

  return (
    <div className={'lg:hidden'}>
      <Hamburger toggle={setOpen} toggled={isOpen} />
      <div
        className={clsx(
          'transition-transform overflow-y-auto fixed top-0 right-0 bg-n w-3/4 h-full py-8 flex',
          {
            'translate-x-0': isOpen,
            'translate-x-full': !isOpen,
          },
        )}
      >
        <Container className={'flex flex-col'}>
          <div className="flex w-full justify-end ">
            <Hamburger toggle={() => setOpen(!isOpen)} toggled={isOpen} />
          </div>
          <nav className={'py-10'}>
            <ul className={'flex items-end flex-col w-full gap-6'}>
              {menu.map(({ title, path }) => (
                <li
                  className={
                    'relative group text-primary font-mono flex font-medium w-full'
                  }
                  key={path}
                >
                  <Link href={path} passHref>
                    <a className={'w-full flex'}>
                      <Button title={title} variant={'outline'} isFullWidth />
                    </a>
                  </Link>
                </li>
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
