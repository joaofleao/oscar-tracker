import React from 'react'
import { View } from 'react-native'
import Animated from 'react-native-reanimated'
import { BlurView } from 'expo-blur'
import { useTranslation } from 'react-i18next'

import NavBarItem from './nav_bar_item'
import useStyles from './styles'
import { NavBarProps, TabType } from './types'
import { IconMagnifyingGlass, IconSettings } from '@components/icon'
import IconButton from '@components/icon_button'
import Select from '@components/select'
import Typography from '@components/typography'
import useAnimations from '@providers/animations/useAnimations'
import { useSettings } from '@providers/settings'
import { useTheme } from '@providers/theme'

const NavBar = ({ tabs, navigation, state }: NavBarProps): React.ReactElement => {
  const styles = useStyles()
  const { semantics } = useTheme()
  const { editions, setCurrentEdition, currentEdition } = useSettings()
  const { t } = useTranslation()
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
      {state.index === 2 && <IconButton placeholder />}

      <View style={styles.headerContent}>
        <Typography
          center
          color={semantics.accent.base.default}
        >
          oscar tracker
        </Typography>

        <Select
          label={t('home:select_edition')}
          data={
            editions
              .filter((edition) => edition.complete)
              ?.map((edition) => ({
                name: `${t('home:edition')} ${edition.number} - ${edition.year}`,
                id: edition._id,
              }))
              .sort((a, b) => b.name.localeCompare(a.name)) ?? []
          }
          onSelect={setCurrentEdition}
          selected={currentEdition}
          renderAnchor={({ selectedOption, setVisible, visible }) => (
            <Typography
              onPress={() => setVisible(!visible)}
              center
              legend
              color={semantics.background.foreground.light}
            >
              {selectedOption?.name}
            </Typography>
          )}
        />
      </View>
      {state.index === 2 && (
        <IconButton
          icon={<IconSettings />}
          onPress={() => navigation.navigate('settings')}
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
      {header}
      {leadingArea}
      {trailingArea}
    </>
  )
}

export default NavBar
