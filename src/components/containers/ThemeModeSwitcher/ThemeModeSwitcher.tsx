'use client'

import { CiDark, CiLight } from 'react-icons/ci'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'

const ThemeModeSwitcher = () => {
  const iconClasses = 'w-4 h-4 fill-n-0'
  const { setTheme, resolvedTheme } = useTheme()
  const isDarkMode = resolvedTheme === 'dark'
  const pathname = usePathname()

  if (pathname === '/') return null

  return (
    <button
      onClick={() => setTheme(isDarkMode ? 'light' : 'dark')}
      className={'transition cursor-pointer hover:opacity-80'}
    >
      {isDarkMode ? (
        <CiLight className={iconClasses} />
      ) : (
        <CiDark className={iconClasses} />
      )}
    </button>
  )
}

export default ThemeModeSwitcher
