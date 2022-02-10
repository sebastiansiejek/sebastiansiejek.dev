import Favicon from 'components/Favicon'
import type { AppProps } from 'next/app'
import 'styles/global.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Favicon />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
