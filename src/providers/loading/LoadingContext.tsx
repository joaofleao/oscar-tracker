import { createContext } from 'react'

export interface LoadingContextType {
  text: string
  isActive: boolean
  stop: () => void
  start: (loading: string) => void
}

const LoadingContext = createContext<LoadingContextType | null>(null)
LoadingContext.displayName = 'LoadingContext'

export default LoadingContext
