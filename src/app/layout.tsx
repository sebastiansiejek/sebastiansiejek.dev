import { PropsWithChildren } from 'react'
import { AppProvider } from '_app/providers'
import { Metadata } from 'next'
import { IBM_Plex_Mono, Manrope } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import '_app/styles/global.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || 'https://sebastiansiejek.dev'),
  title: {
    default: 'Sebastian Siejek | Software Engineer',
    template: '%s | Sebastian Siejek',
  },
  description:
    'Software Engineer tworzący aplikacje webowe, automatyzacje i sklepy internetowe od pomysłu po wdrożenie.',
  authors: [{ name: 'Sebastian Siejek', url: 'https://sebastiansiejek.dev/' }],
  creator: 'Sebastian Siejek',
  keywords: [
    'Software Engineer',
    'aplikacje webowe',
    'MVP',
    'automatyzacja procesów',
    'AI',
    'WooCommerce',
    'Next.js',
  ],
}

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-ibm-plex-mono',
})

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      lang="pl"
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
