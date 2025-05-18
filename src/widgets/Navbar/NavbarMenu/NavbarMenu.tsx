import Link from 'next/link'
import { Button } from '@/shared/ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/shared/ui/navigation-menu'

export interface INavbarMenu {
  data: { title: string; path: string }[]
}

const NavbarMenu = ({ data }: INavbarMenu) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {data.map(({ title, path }) => (
          <NavigationMenuItem
            className={'relative group text-primary font-mono font-medium'}
            key={path}
          >
            <Link href={path} passHref>
              <Button variant={'link'}>{title}</Button>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default NavbarMenu
