import { PropsWithChildren } from 'react'
import { Metadata } from 'next'
import { Inconsolata, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AppProvider } from '@/providers/AppProvider/AppProvider'
import '@/styles/global.css'
import { Newsletter } from '@/widgets/Newsletter/Newsletter'

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
      className={`${inter.variable} ${inconsolata.variable} font-sans`}
    >
      <Analytics />
      <body>
        <AppProvider>
          {children}
          <div className={'bg-foreground text-primary-foreground'}>
            <Newsletter />
          </div>
        </AppProvider>
      </body>
    </html>
  )
}
