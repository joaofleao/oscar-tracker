import React, { useEffect, useRef } from 'react'
import { Animated, View } from 'react-native'

import useStyles from './styles'
import Tab from './TabBar'
import ProgressBar from '@components/ProgressBar'
import { useEdition } from '@providers/edition'
import { useWatchedMovies } from '@providers/watchedMovies'
import useKeyboard from '@hooks/useKeyboard'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { type ScreenTypes } from '@types'

type ScreenNavigationProp = NativeStackNavigationProp<ScreenTypes>

interface Props {
  tabs: {
    label: string
    icon: JSX.Element
    component: ({ navigation }: { navigation: unknown }) => JSX.Element
  }[]
  initialRoute: number
}

const NavBar = (props: Props): JSX.Element => {
  const navigation = useNavigation<ScreenNavigationProp>()
  const { tabs, initialRoute } = props
  const styles = useStyles()
  const { editionWatchedMovies } = useWatchedMovies()
  const keyboardOpen = useKeyboard()
  const edition = useEdition()

  const selected = navigation.getState()?.routes?.[0]?.state?.index ?? initialRoute
  const selectorOffset = React.useRef(new Animated.Value(0)).current
  const translateY = useRef<Animated.Value>(new Animated.Value(0)).current

  useEffect(() => {
    Animated.spring(translateY, {
      toValue: keyboardOpen ? 400 : 0,
      useNativeDriver: true,
    }).start()
  }, [keyboardOpen, translateY])

  const springAnimation = (index): void => {
    Animated.spring(selectorOffset, {
      toValue: 80 * index,
      useNativeDriver: true,
    }).start()
  }

  const renderTabs = (tab, index): JSX.Element => {
    const handlePress = (): void => {
      springAnimation(index)
      navigation.navigate(tab.label)
    }

    return (
      <Tab
        key={tab.label}
        onPress={handlePress}
        selected={index === selected}
        icon={tab.icon}
      />
    )
  }

  return (
    <Animated.View style={[styles.footer, { transform: [{ translateY }] }]}>
      <View style={styles.container}>
        <Animated.View style={[styles.selector, { transform: [{ translateX: selectorOffset }] }]}>
          <View style={styles.background} />
        </Animated.View>
        {tabs.map(renderTabs)}
      </View>

      <View style={styles.progressContainer}>
        <ProgressBar
          progress={Object.values(editionWatchedMovies).length}
          total={Object.keys(edition.movies).length}
        />
      </View>
    </Animated.View>
  )
}

export default NavBar
