import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'

import UserContext, { type UserContextType } from './UserContext'
import usePersistedState from '@hooks/usePersistentState'
import type { LanguageType, PreferencesType, UserType } from '@types'
import { print } from '@utils/functions'

const UserProvider = ({ children }: { children?: React.ReactNode }): JSX.Element => {
  const [user, setUser] = React.useState<UserType | null>(null)
  const [uid, setUid] = React.useState<string | null>(null)

  const [language, setLanguage] = usePersistedState<LanguageType>('language', 'pt-BR')

  const [preferences, setPreferences] = usePersistedState<PreferencesType>('preferences', {
    poster: false,
    cast: false,
    plot: false,
    ratings: false,
  })
  const [adminMode, setAdminMode] = useState(false)

  const isAuth = Boolean(uid)
  const isLogged = Boolean(user)

  //subscribes to firestore changes
  useEffect(() => {
    if (isAuth) {
      const subscriber = firestore()
        .collection('users')
        .doc(uid)
        .onSnapshot((documentSnapshot) => {
          print('Firebase', 'User updated', 'green')
          setUser(documentSnapshot.data() as UserType)
        })

      return subscriber
    } else setUser(null)
  }, [isAuth])

  const updateUser: UserContextType['updateUser'] = (updatedUser) => {
    if (!isLogged) return

    const values = {
      ...(updatedUser.email != null && { email: updatedUser.email }),
      ...(updatedUser.displayName != null && { displayName: updatedUser.displayName }),
      ...(updatedUser.nickname != null && { nickname: updatedUser.nickname }),
      ...(updatedUser.settings != null && { settings: updatedUser.settings }),
      ...(updatedUser.onboarding != null && { onboarding: updatedUser.onboarding }),
    }
    firestore().collection('users').doc(uid).update(values)
  }

  const value: UserContextType = {
    user,
    setUser,
    isLogged,
    setUid,
    updateUser,
    language,
    setLanguage,
    preferences,
    setPreferences,
    adminMode,
    setAdminMode,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export default UserProvider
