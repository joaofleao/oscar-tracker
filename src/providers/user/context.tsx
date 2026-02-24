import { createContext } from 'react'

import type { UserContextType } from './types'

const UserContext = createContext<UserContextType | null>(null)
UserContext.displayName = 'UserContext'
export default UserContext
