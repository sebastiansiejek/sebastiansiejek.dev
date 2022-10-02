import Favicon from 'components/Favicon'
import type { AppProps } from 'next/app'
import 'styles/global.css'
import useBrowserTheme from '../hooks/useBrowserTheme'

function MyApp({ Component, pageProps }: AppProps) {
  useBrowserTheme()

  return (
    <>
      <Favicon />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
