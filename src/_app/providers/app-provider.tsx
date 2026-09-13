'use client'

import { ThemeProvider } from 'next-themes'
import NextNProgress from 'nextjs-progressbar'
import { PropsWithChildren } from 'react'

export const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="system"
      disableTransitionOnChange
      enableColorScheme
      enableSystem
      themes={['light', 'dark']}
    >
      <NextNProgress color="var(--primary)" />
      {children}
    </ThemeProvider>
  )
}
