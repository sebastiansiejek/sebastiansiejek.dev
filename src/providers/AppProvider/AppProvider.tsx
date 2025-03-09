'use client'

import { ThemeProvider } from 'next-themes'
import NextNProgress from 'nextjs-progressbar'
import { PropsWithChildren, useEffect } from 'react'
import { scan } from 'react-scan'

export const AppProvider = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    scan({
      enabled: true,
    })
  }, [])

  return (
    <ThemeProvider themes={['light', 'dark']}>
      <NextNProgress color={'#3ceab8'} />
      {children}
    </ThemeProvider>
  )
}
