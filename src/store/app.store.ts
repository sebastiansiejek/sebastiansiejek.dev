import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface AppStore {
  theme: 'light' | 'dark' | ''
  toggleTheme: (by: AppStore['theme']) => void
}

const useAppStore = create<AppStore>()(
  devtools(
    persist(
      (set) => ({
        theme: '',
        toggleTheme: (by) => {
          document.documentElement.classList.toggle('dark')
          return set(() => ({ theme: by }))
        },
      }),
      {
        name: 'app-store',
      },
    ),
  ),
)

export default useAppStore
