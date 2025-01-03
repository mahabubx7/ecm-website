import { useEffect } from 'react'
import { Theme } from '@radix-ui/themes'
import { useThemeStore } from './store/theme-store'
import AppRoutes from './routes'
import '@radix-ui/themes/styles.css'
import './index.css'

function App() {
  const theme = useThemeStore((state) => state.theme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <Theme appearance={theme} accentColor="blue" radius="medium">
      <AppRoutes />
    </Theme>
  )
}

export default App
