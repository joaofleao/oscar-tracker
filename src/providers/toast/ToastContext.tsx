import { createContext } from 'react'
import { Animated } from 'react-native'

export interface ToastContextType {
  showToast: (title: string, description: string, type: 'success' | 'error') => void
  title: string
  description: string
  type: 'success' | 'error'
  position: Animated.Value
  toastVisible: boolean
}

const ToastContext = createContext<ToastContextType | null>(null)
ToastContext.displayName = 'ToastContext'

export default ToastContext
