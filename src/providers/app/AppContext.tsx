import { createContext } from 'react'

export interface AppContextType {
  hasInternet: boolean
  setHasInternet: (hasInternet: boolean) => void
}

const AppContext = createContext<AppContextType | null>(null)
AppContext.displayName = 'AppContext'

export default AppContext
