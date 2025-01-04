import { Theme } from '@radix-ui/themes'
import { ToastProvider } from '~/components/common/Toast'
import AppRoutes from '~/routes'
import '@radix-ui/themes/styles.css'

function App() {
  return (
    <Theme>
      <ToastProvider>
        <AppRoutes />
      </ToastProvider>
    </Theme>
  )
}

export default App
