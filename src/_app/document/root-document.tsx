import { PropsWithChildren } from 'react'
import { AppProvider } from '_app/providers'
import { IBM_Plex_Mono, Manrope } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import '_app/styles/global.css'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-ibm-plex-mono',
})

export function RootDocument({
  children,
  locale,
}: PropsWithChildren<{ locale: 'pl' | 'en' }>) {
  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${manrope.variable} ${ibmPlexMono.variable} font-sans`}
    >
      <body>
        <AppProvider>{children}</AppProvider>
        <Analytics />
      </body>
    </html>
  )
}
