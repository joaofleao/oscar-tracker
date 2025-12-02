import { useContext } from 'react'

import AppContext, { type AppContextType } from './AppContext'

const useApp = (): AppContextType => {
  const useAppContext = useContext(AppContext)

  if (useAppContext === null) {
    throw new Error('useApp has to be used within <AppContext.Provider>')
  }
  return useAppContext
}

export default useApp
