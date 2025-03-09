'use client'

import { CiDark, CiLight } from 'react-icons/ci'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'

const ThemeModeSwitcher = () => {
  const { setTheme, resolvedTheme } = useTheme()
  const pathname = usePathname()

  if (pathname === '/') return null

  const iconClasses = 'w-4 h-4 fill-n-0'
  const isDarkTheme = resolvedTheme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDarkTheme ? 'light' : 'dark')}
      className={'transition cursor-pointer hover:opacity-80'}
    >
      {isDarkTheme ? (
        <CiLight className={iconClasses} />
      ) : (
        <CiDark className={iconClasses} />
      )}
    </button>
  )
}

export default ThemeModeSwitcher
