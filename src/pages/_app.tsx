import Favicon from 'components/Favicon'
import type { AppProps } from 'next/app'
import 'styles/global.css'
import useBrowserTheme from '../hooks/useBrowserTheme'
import NextNProgress from 'nextjs-progressbar'

function MyApp({ Component, pageProps }: AppProps) {
  useBrowserTheme()

  return (
    <>
      <NextNProgress color={'#3ceab8'} />
      <Favicon />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
