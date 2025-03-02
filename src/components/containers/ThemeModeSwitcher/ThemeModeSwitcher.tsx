import useAppStore from '../../../store/app.store'
import { CiDark, CiLight } from 'react-icons/ci'
import { useRouter } from 'next/router'

const ThemeModeSwitcher = () => {
  const toggleTheme = useAppStore((state) => state.toggleTheme)
  const theme = useAppStore((state) => state.theme)
  const isDarkMode = theme === 'dark'
  const iconClasses = 'w-4 h-4 fill-n-0'
  const router = useRouter()

  if (router.pathname === '/') return null

  return (
    <button onClick={() => toggleTheme(isDarkMode ? 'light' : 'dark')}>
      {isDarkMode ? (
        <CiDark className={iconClasses} />
      ) : (
        <CiLight className={iconClasses} />
      )}
    </button>
  )
}

export default ThemeModeSwitcher
