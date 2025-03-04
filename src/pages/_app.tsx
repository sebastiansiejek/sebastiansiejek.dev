import Favicon from 'components/Favicon'
import type { AppProps } from 'next/app'
import 'styles/global.css'
import NextNProgress from 'nextjs-progressbar'
import { useEffect } from 'react'
import { scan } from 'react-scan'
import { ThemeProvider } from 'next-themes'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    scan({
      enabled: true,
    })
  }, [])

  return (
    <ThemeProvider themes={['light', 'dark']}>
      <NextNProgress color={'#3ceab8'} />
      <Favicon />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
