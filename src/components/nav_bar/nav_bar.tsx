import React, { useEffect } from 'react'
import { Alert, Linking, View } from 'react-native'
import { useQuery } from 'convex/react'
import { api } from 'convex_api'
import { LinearGradient } from 'expo-linear-gradient'
import { useTranslation } from 'react-i18next'

import packageJson from '../../../package.json'
import NavBarItem from './nav_bar_item'
import useStyles from './styles'
import { NavBarProps, TabType } from './types'
import Blur from '@components/blur'
import { IconMagnifyingGlass } from '@components/icon'
import { TinyPlus } from '@components/tiny_icon'
import { useTheme } from '@providers/theme'
import { useUser } from '@providers/user'
import { storage } from '@router/router'

const NavBar = ({ tabs, navigation, state }: NavBarProps): React.ReactElement => {
  const styles = useStyles()
  const { semantics } = useTheme()

  const { t, i18n } = useTranslation()
  const { user } = useUser()

  const latest = useQuery(api.user.getLatestVersion, {
    app: 'oscar-tracker',
    language: i18n.language,
  })

  useEffect(() => {
    if (latest === undefined) return
    const ver = storage.getString('version')

    if (ver === undefined) {
      storage.set('version', packageJson.version)
      return
    }

    if (ver !== latest.version)
      Alert.alert(
        t('home:new_version'),
        latest.changelog.length > 0 ? latest.changelog : t('home:update'),
        [
          {
            text: t('home:update_now'),
            isPreferred: true,
            onPress: (): void => {
              storage.remove('version')
              Linking.openURL(latest.url)
            },
          },
        ],
        { cancelable: false },
      )
  }, [latest, t])

  setTimeout(() => {
    if (user && user?.emailVerificationTime === undefined) navigation.navigate('auth', { flow: 'email-verification' })
    if (user && (user?.username === undefined || user?.name === undefined)) navigation.navigate('auth', { flow: 'details' })
  }, 2000)

  const renderTabs = (tab: TabType, index: number): React.ReactElement => {
    const handleTabPress = (): void => {
      navigation.navigate(tab.id)

      // if (state.index === 0 && index === 0) nominationsRef.current?.scrollToOffset({ offset: 0, animated: true })
      // if (state.index === 1 && index === 1) moviesRef.current?.scrollToOffset({ offset: 0, animated: true })
      // if (state.index === 2 && index === 2) profileRef.current?.scrollToOffset({ offset: 0, animated: true })
    }

    return (
      <NavBarItem
        key={index}
        first={index === 0}
        last={index === tabs.length - 1}
        onPress={handleTabPress}
        selected={state.index === index}
        icon={tab.icon}
        label={tab.label}
      />
    )
  }

  const leadingArea = (
    <Blur
      variant="background"
      style={styles.footerContainer}
    >
      {tabs.map(renderTabs)}
    </Blur>
  )

  const trailingArea = (
    <Blur
      style={[styles.footerContainer]}
      variant="background"
    >
      <NavBarItem
        onPress={() => navigation.navigate(state.index === 2 ? 'search_friends' : 'search')}
        icon={state.index === 2 ? <TinyPlus size={24} /> : <IconMagnifyingGlass size={24} />}
      />
    </Blur>
  )

  return (
    <>
      <LinearGradient
        colors={semantics.background.base.gradient.toReversed() as any}
        style={styles.gradientBottom}
      />

      <View style={styles.footer}>
        {leadingArea}
        {trailingArea}
      </View>
    </>
  )
}

export default NavBar
