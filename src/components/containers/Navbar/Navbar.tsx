import SiteBranding from '../../views/SiteBranding'
import Container from '../../views/Container'
import NavbarMenu from './NavbarMenu'
import NavbarMenuMobile from './NavbarMenuMobile'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const ThemeModeSwitcher = dynamic(() => import('../ThemeModeSwitcher'), {
  ssr: false,
})

const menu = [
  {
    title: 'Artykuły',
    path: '/blog',
  },
  {
    title: 'Kontakt',
    path: '/',
  },
]

const Navbar = () => {
  return (
    <nav aria-label={'Navigation'} className={'bg-n py-2 text-n-0 text-xl'}>
      <Container>
        <div className={'flex items-center justify-between'}>
          <Link href={'/'} passHref>
            <a>
              <SiteBranding />
            </a>
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
