import Link from 'next/link'
import { Button } from '@/shared/ui/button'

export interface INavbarMenu {
  data: { title: string; path: string }[]
}

const NavbarMenu = ({ data }: INavbarMenu) => {
  return (
    <ul className={'flex gap-6'}>
      {data.map(({ title, path }) => (
        <li
          className={'relative group text-primary font-mono font-medium'}
          key={path}
        >
          <Link href={path} passHref>
            <Button variant={'link'}>{title}</Button>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default NavbarMenu
