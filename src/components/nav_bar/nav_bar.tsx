import React, { useEffect } from 'react'
import { Alert, Linking, TouchableOpacity, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { useQuery } from 'convex/react'
import { api } from 'convex_api'
import { BlurView } from 'expo-blur'
import { LinearGradient } from 'expo-linear-gradient'
import { deleteItemAsync, getItem, setItem } from 'expo-secure-store'
import { useTranslation } from 'react-i18next'

import packageJson from '../../../package.json'
import NavBarItem from './nav_bar_item'
import useStyles from './styles'
import { NavBarProps, TabType } from './types'
import { IconMagnifyingGlass } from '@components/icon'
import ProgressBar from '@components/progress_bar'
import Typography from '@components/typography'
import useAnimations from '@providers/animations/useAnimations'
import { useSettings } from '@providers/settings'
import { useTheme } from '@providers/theme'
import { ordinal } from '@utils/ordinals'

const NavBar = ({ tabs, navigation, state }: NavBarProps): React.ReactElement => {
  const styles = useStyles()
  const { semantics } = useTheme()
  const { edition, editions } = useSettings()
  const { t, i18n } = useTranslation()
  const user = useQuery(api.user.getCurrentUser)

  const latest = useQuery(api.user.getLatestVersion, {
    app: 'oscar-tracker',
    language: i18n.language,
  })

  useEffect(() => {
    if (latest === undefined) return
    const ver = getItem('version')

    if (ver === null) {
      setItem('version', packageJson.version)
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
              deleteItemAsync('version')
              Linking.openURL(latest.url)
            },
          },
        ],
        { cancelable: false },
      )
  }, [latest, t])

  const { moviesAnimatedStyle, nominationsAnimatedStyle, profileAnimatedStyle, nominationsRef, moviesRef, profileRef } = useAnimations()
  const headerAnimatedStyle = state.index === 0 ? nominationsAnimatedStyle : state.index === 1 ? moviesAnimatedStyle : profileAnimatedStyle

  setTimeout(() => {
    if (user && user?.emailVerificationTime === undefined) navigation.navigate('auth', { flow: 'email-verification' })
    if (user && (user?.username === undefined || user?.name === undefined)) navigation.navigate('auth', { flow: 'details' })
  }, 2000)

  const renderTabs = (tab: TabType, index: number): React.ReactElement => {
    const handleTabPress = (): void => {
      navigation.navigate(tab.id)

      if (state.index === 0 && index === 0) nominationsRef.current?.scrollToOffset({ offset: 0, animated: true })
      if (state.index === 1 && index === 1) moviesRef.current?.scrollToOffset({ offset: 0, animated: true })
      if (state.index === 2 && index === 2) profileRef.current?.scrollToOffset({ offset: 0, animated: true })
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

  const header = (
    <View style={styles.header}>
      <Animated.View style={[styles.headerBackground, headerAnimatedStyle]}>
        <BlurView
          experimentalBlurMethod="dimezisBlurView"
          style={styles.headerBlur}
          intensity={20}
        />
      </Animated.View>

      <View style={styles.headerContent}>
        <TouchableOpacity onPress={() => navigation.navigate('select_edition')}>
          <Typography
            center
            color={semantics.accent.base.default}
          >
            academy tracker
          </Typography>

          {editions.length > 0 && (
            <Typography
              center
              legend
              color={semantics.background.foreground.light}
            >
              {`${ordinal(edition?.number ?? 0, i18n.language, true)} ${t('home:edition')} - ${edition?.year}`}
            </Typography>
          )}
        </TouchableOpacity>
        <ProgressBar
          value={edition?.moviesWatched ?? 0}
          maxValue={edition?.moviesNominated ?? 0}
        />
      </View>

      {/* {state.index !== 2 && (
        <IconButton
          placeholder={!edition?.complete}
          icon={edition?.hasVoted ? <IconTrophy /> : <IconInformation />}
          variant={edition?.hasVoted ? 'brand' : 'container'}
          onPress={() => navigation.navigate('awards')}
        />
      )} */}
    </View>
  )

  const leadingArea = (
    <BlurView
      experimentalBlurMethod="dimezisBlurView"
      intensity={20}
      style={[styles.footer, styles.leading]}
    >
      {tabs.map(renderTabs)}
    </BlurView>
  )

  const trailingArea = (
    <BlurView
      experimentalBlurMethod="dimezisBlurView"
      intensity={20}
      style={[styles.footer, styles.trailing]}
    >
      <NavBarItem
        onPress={() => navigation.navigate('search')}
        icon={<IconMagnifyingGlass size={24} />}
      />
    </BlurView>
  )

  return (
    <>
      <LinearGradient
        colors={semantics.background.base.gradient as any}
        style={styles.gradientTop}
      />
      <LinearGradient
        colors={semantics.background.base.gradient.toReversed() as any}
        style={styles.gradientBottom}
      />
      {header}

      {leadingArea}
      {trailingArea}
    </>
  )
}

export default NavBar
