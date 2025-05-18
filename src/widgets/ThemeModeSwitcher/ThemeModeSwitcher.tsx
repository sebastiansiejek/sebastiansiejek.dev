'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useIsMounted } from '@/shared/hooks/useIsMounted/useIsMounted'

const ThemeModeSwitcher = () => {
  const { setTheme, resolvedTheme } = useTheme()
  const isDarkTheme = resolvedTheme === 'dark'
  const isMounted = useIsMounted()

  if (!isMounted) return null

  return (
    <button
      onClick={() => setTheme(isDarkTheme ? 'light' : 'dark')}
      className={'transition cursor-pointer hover:opacity-80'}
    >
      {isDarkTheme && <Sun className={'w-4 h-4'} />}
      {!isDarkTheme && <Moon className={'w-4 h-4'} />}
    </button>
  )
}

export default ThemeModeSwitcher
