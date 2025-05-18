import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
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
            <Link href={path} passHref legacyBehavior>
              <NavigationMenuLink className={'text-lg'}>
                {title}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default NavbarMenu
