import useAppStore from '../../../store/app.store'
import DarkModeIcon from '../../../../public/images/icons/dark-mode.svg'
import LightModeIcon from '../../../../public/images/icons/light-mode.svg'

const ThemeModeSwitcher = () => {
  const toggleTheme = useAppStore((state) => state.toggleTheme)
  const theme = useAppStore((state) => state.theme)
  const isDarkMode = theme === 'dark'
  const iconClasses = 'w-6 h-6 fill-n-0'

  return (
    <button onClick={() => toggleTheme(isDarkMode ? 'light' : 'dark')}>
      {isDarkMode ? (
        <DarkModeIcon className={iconClasses} />
      ) : (
        <LightModeIcon className={iconClasses} />
      )}
    </button>
  )
}

export default ThemeModeSwitcher
