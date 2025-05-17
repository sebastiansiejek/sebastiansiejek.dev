import { PropsWithChildren } from 'react'
import { AppProvider } from 'providers/AppProvider/AppProvider'
import { Metadata } from 'next'
import { Inconsolata, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import 'styles/global.css'

export const metadata: Metadata = {
  title: 'Sebastian Siejek',
  description: 'Sebastian Siejek - Software Engineer',
  authors: [{ name: 'Sebastian Siejek', url: 'https://sebastiansiejek.dev/' }],
  keywords:
    'web, developer, software, engineer, javascript, react, nextjs, php, wordpress, empressia',
  alternates: {
    canonical: 'https://sebastiansiejek.dev/',
  },
}

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const inconsolata = Inconsolata({
  subsets: ['latin'],
  variable: '--font-inconsolata',
})

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      lang="pl"
      suppressHydrationWarning
      className={`${inter.variable} font-sans`}
    >
      <Analytics />
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
