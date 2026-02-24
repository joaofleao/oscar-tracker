import { useContext } from 'react'

import UserContext from './context'
import { type UserContextType } from './types'

const useUser = (): UserContextType => {
  const useUserContext = useContext(UserContext)

  if (useUserContext === null) {
    throw new Error('useUser has to be used within <UserContext.Provider>')
  }
  return useUserContext
}

export default useUser
