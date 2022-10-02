import { useEffect } from 'react'
import useAppStore from '../store/app.store'

const useBrowserTheme = () => {
  const theme = useAppStore((state) => state.theme)
  const toggleTheme = useAppStore((state) => state.toggleTheme)

  useEffect(() => {
    const preferTheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light'

    if (!theme) toggleTheme(preferTheme)
    if (theme) toggleTheme(theme)

    if (theme === 'dark' || preferTheme === 'dark')
      document.documentElement.classList.add(theme || preferTheme)
  }, [])
}

export default useBrowserTheme
