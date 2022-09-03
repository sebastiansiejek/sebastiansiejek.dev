import SiteBranding from '../../views/SiteBranding'
import Container from '../../views/Container'
import NavbarMenu from './NavbarMenu'
import NavbarMenuMobile from './NavbarMenuMobile'

const menu = [
  {
    title: 'O mnie',
    path: '/',
  },
  {
    title: 'Artykuły',
    path: '/blog',
  },
]

const Navbar = () => {
  return (
    <nav aria-label={'Navigation'} className={'bg-n py-8 text-n-0 text-xl'}>
      <Container>
        <div className={'flex items-center justify-between'}>
          <SiteBranding />
          <div className="ml-10 hidden lg:block">
            <NavbarMenu data={menu} />
          </div>
          <NavbarMenuMobile menu={menu} />
        </div>
      </Container>
    </nav>
  )
}

export default Navbar
