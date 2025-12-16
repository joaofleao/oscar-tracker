import { createContext } from 'react'

import type { LanguageType, PreferencesType, UserType } from '@types'

export interface UserContextType {
  setUid: (uid: string) => void

  user: UserType
  setUser: (user: UserType) => void
  isLogged: boolean

  language: LanguageType
  setLanguage: React.Dispatch<React.SetStateAction<LanguageType>>

  preferences: PreferencesType
  setPreferences: React.Dispatch<React.SetStateAction<PreferencesType>>

  updateUser: (updatedUser: Partial<UserType>) => void

  adminMode: boolean
  setAdminMode: React.Dispatch<React.SetStateAction<boolean>>
}

const UserContext = createContext<UserContextType | null>(null)
UserContext.displayName = 'UserContext'

export default UserContext
