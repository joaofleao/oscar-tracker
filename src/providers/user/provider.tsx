import React, { useEffect } from 'react'
import { useMMKVBoolean, useMMKVObject } from 'react-native-mmkv'
import { useConvex, useMutation } from 'convex/react'
import { api } from 'convex_api'
import { useTranslation } from 'react-i18next'

import UserContext from './context'
import { type UserContextType } from './types'
import print from '@utils/print'

const UserProvider = ({ children }: { children?: React.ReactNode }): React.ReactElement => {
  const convex = useConvex()
  const { i18n } = useTranslation()

  const updateUser = useMutation(api.user.updateUser)
  const [user, setUser] = useMMKVObject<UserContextType['user']>('user.data')
  const [following, setFollowing] = useMMKVObject<UserContextType['following']>('user.following')
  const [followers, setFollowers] = useMMKVObject<UserContextType['followers']>('user.followers')
  const [hideCast, setHideCast] = useMMKVBoolean('user.hideCast')
  const [hidePlot, setHidePlot] = useMMKVBoolean('user.hidePlot')
  const [hidePoster, setHidePoster] = useMMKVBoolean('user.hidePoster')
  const [hideRate, setHideRate] = useMMKVBoolean('user.hideRate')

  const refreshUser: UserContextType['refreshUser'] = async () => {
    print('User', 'Server Fetched', 'yellow')
    const fetched = await convex.query(api.user.getCurrentUser, {})
    setUser(fetched)
  }

  const refreshFollowers: UserContextType['refreshFollowers'] = async () => {
    print('Followers', 'Server Fetched', 'yellow')
    const fetched = await convex.query(api.user.getFollowers, {})
    setFollowers(fetched)
  }

  const refreshFollowing: UserContextType['refreshFollowing'] = async () => {
    print('Following', 'Server Fetched', 'yellow')
    const fetched = await convex.query(api.user.getFollowing, {})
    setFollowing(fetched)
  }

  useEffect(() => {
    const fetchUser = async (): Promise<void> => {
      if (user === undefined) refreshUser()
      else print('Current User', 'Local Fetched', 'green')
    }
    const fetchFollowing = async (): Promise<void> => {
      if (following === undefined) refreshFollowing()
      else print('Following', 'Local Fetched', 'green')
    }
    const fetchFollowers = async (): Promise<void> => {
      if (followers === undefined) refreshFollowers()
      else print('Followers', 'Local Fetched', 'green')
    }

    void fetchUser()
    void fetchFollowers()
    void fetchFollowing()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setLanguage: UserContextType['setLanguage'] = (newLanguage): void => {
    i18n.changeLanguage(newLanguage)
    if (user) updateUser({ language: newLanguage })
  }

  const setSpoilers: UserContextType['setSpoilers'] = (name, value): void => {
    switch (name) {
      case 'hideCast':
        setHideCast(value)
        break
      case 'hidePlot':
        setHidePlot(value)
        break
      case 'hidePoster':
        setHidePoster(value)
        break
      case 'hideRate':
        setHideRate(value)
        break
    }

    if (user) updateUser({ [name]: value })
  }

  return (
    <UserContext.Provider
      value={{
        user,
        refreshUser,
        spoilers: {
          hideCast: hideCast ?? false,
          hidePlot: hidePlot ?? false,
          hidePoster: hidePoster ?? false,
          hideRate: hideRate ?? false,
        },
        setSpoilers,

        setLanguage,

        followers: followers ?? [],
        refreshFollowers,
        following: following ?? [],
        refreshFollowing,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
