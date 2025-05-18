import Link from 'next/link'
import NavbarMenu from '@/widgets/Navbar/NavbarMenu/NavbarMenu'
import NavbarMenuMobile from '@/widgets/Navbar/NavbarMenuMobile/NavbarMenuMobile'
import ThemeModeSwitcher from '@/widgets/ThemeModeSwitcher/ThemeModeSwitcher'
import SiteBranding from '@/shared/ui/SiteBranding/SiteBranding'
import Container from '@/shared/ui/Container/Container'

const menu = [
  {
    title: 'Blog',
    path: '/blog',
  },
  {
    title: 'Contact',
    path: '/',
  },
]

const Navbar = () => {
  return (
    <nav aria-label={'Navigation'} className={'bg-n py-2 text-n-0 text-xl'}>
      <Container>
        <div className={'flex items-center justify-between'}>
          <Link href={'/'} passHref>
            <SiteBranding />
          </Link>
          <div className="ml-10 hidden lg:flex items-center">
            <NavbarMenu data={menu} />
            <div className="flex items-center justify-center ml-4">
              <ThemeModeSwitcher />
            </div>
          </div>
          <NavbarMenuMobile menu={menu} />
        </div>
      </Container>
    </nav>
  )
}

export default Navbar
