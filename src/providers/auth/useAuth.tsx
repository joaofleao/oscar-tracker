import { useContext } from 'react'

import AuthContext, { type AuthContextType } from './AuthContext'

const useAuth = (): AuthContextType => {
  const userAuthContext = useContext(AuthContext)

  if (userAuthContext === null)
    throw new Error('useAuth has to be used within <AuthContext.Provider>')
  return userAuthContext
}

export default useAuth
