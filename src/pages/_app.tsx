import Favicon from 'components/Favicon'
import type { AppProps } from 'next/app'
import 'styles/global.css'
import useBrowserTheme from '../hooks/useBrowserTheme'
import NextNProgress from 'nextjs-progressbar'
import tailwind from '../../tailwind.config'

function MyApp({ Component, pageProps }: AppProps) {
  useBrowserTheme()

  return (
    <>
      <NextNProgress color={tailwind.theme.colors.primary.DEFAULT} />
      <Favicon />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
