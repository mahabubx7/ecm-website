import * as Toast from '@radix-ui/react-toast'
import { Cross2Icon } from '@radix-ui/react-icons'
import { createContext, useContext, useState } from 'react'

interface ToastContextType {
  success: (message: string) => void
  error: (message: string) => void
}

const ToastContext = createContext<ToastContextType>({} as ToastContextType)

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [type, setType] = useState<'success' | 'error'>('success')

  const showToast = (message: string, type: 'success' | 'error') => {
    setMessage(message)
    setType(type)
    setOpen(true)
  }

  return (
    <ToastContext.Provider
      value={{
        success: (message) => showToast(message, 'success'),
        error: (message) => showToast(message, 'error')
      }}
    >
      {children}
      <Toast.Provider swipeDirection="right">
        <Toast.Root
          className={`
            fixed bottom-4 right-4 z-50
            flex items-center gap-3 px-6 py-4 rounded-lg shadow-lg
            ${type === 'success' ? 'bg-green-50 border-l-4 border-green-500' : 'bg-red-50 border-l-4 border-red-500'}
          `}
          open={open}
          onOpenChange={setOpen}
          duration={3000}
        >
          <Toast.Description className={`text-sm ${type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
            {message}
          </Toast.Description>
          <Toast.Close className="text-gray-400 hover:text-gray-500">
            <Cross2Icon />
          </Toast.Close>
        </Toast.Root>
        <Toast.Viewport />
      </Toast.Provider>
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext) 