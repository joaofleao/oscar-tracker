import React from 'react'
import { View } from 'react-native'
import Animated from 'react-native-reanimated'
import { useConvexAuth } from 'convex/react'
import { BlurView } from 'expo-blur'
import { LinearGradient } from 'expo-linear-gradient'
import { useTranslation } from 'react-i18next'

import NavBarItem from './nav_bar_item'
import useStyles from './styles'
import { NavBarProps, TabType } from './types'
import { IconInformation, IconMagnifyingGlass, IconSettings, IconTrophy } from '@components/icon'
import IconButton from '@components/icon_button'
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

  const { isAuthenticated } = useConvexAuth()

  const { moviesAnimatedStyle, nominationsAnimatedStyle, profileAnimatedStyle, nominationsRef, moviesRef, profileRef } = useAnimations()
  const headerAnimatedStyle = state.index === 0 ? nominationsAnimatedStyle : state.index === 1 ? moviesAnimatedStyle : profileAnimatedStyle

  // setTimeout(() => {
  //   const onb = getItem('onboarding')
  //   if (onb !== 'done') navigation.navigate('onboarding')
  // }, 2000)

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
          style={styles.headerBlur}
          intensity={20}
        />
      </Animated.View>

      <IconButton
        placeholder
        icon={<IconSettings />}
      />

      <View style={styles.headerContent}>
        <Typography
          center
          color={semantics.accent.base.default}
        >
          oscar tracker
        </Typography>

        {editions.length > 0 && (
          <Typography
            onPress={() => navigation.navigate('select_edition')}
            center
            legend
            color={semantics.background.foreground.light}
          >
            {`${ordinal(edition?.number ?? 0, i18n.language, true)} ${t('home:edition')} - ${edition?.year}`}
          </Typography>
        )}
      </View>

      {state.index === 2 && (
        <IconButton
          icon={<IconSettings />}
          variant={'container'}
          onPress={() => navigation.navigate('settings')}
        />
      )}

      {state.index !== 2 && (
        <IconButton
          placeholder={!edition.complete}
          icon={edition.hasVoted ? <IconTrophy /> : <IconInformation />}
          variant={edition.hasVoted ? 'brand' : 'container'}
          onPress={() => navigation.navigate('awards')}
        />
      )}
    </View>
  )

  const leadingArea = (
    <BlurView
      intensity={20}
      style={[styles.footer, styles.leading]}
    >
      {tabs.map(renderTabs)}
    </BlurView>
  )

  const trailingArea = (
    <BlurView
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
