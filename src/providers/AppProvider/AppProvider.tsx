'use client'

import { ThemeProvider } from 'next-themes'
import NextNProgress from 'nextjs-progressbar'
import { PropsWithChildren } from 'react'

export const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider themes={['light', 'dark']}>
      <NextNProgress color={'#3ceab8'} />
      {children}
    </ThemeProvider>
  )
}
