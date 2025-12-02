import React from 'react'
import NetInfo from '@react-native-community/netinfo'

import AppContext, { type AppContextType } from './AppContext'

const AppProvider = ({ children }: { children?: React.ReactNode }): JSX.Element => {
  const [hasInternet, setHasInternet] = React.useState<boolean>(true)

  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected && state.isInternetReachable) setHasInternet(true)
      else setHasInternet(false)
    })

    return () => {
      return unsubscribe()
    }
  }, [])

  const value: AppContextType = {
    hasInternet,
    setHasInternet,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export default AppProvider
