import React from 'react'
import { View } from 'react-native'

import NavBarItem from './nav_bar_item'
import useStyles from './styles'
import { NavBarProps, TabType } from './types'
import { IconMagnifyingGlass } from '@components/icon'

const NavBar = ({ tabs, navigation, state }: NavBarProps): React.ReactElement => {
  const styles = useStyles()

  // setTimeout(() => {
  //   const onb = getItem('onboarding')
  //   if (onb !== 'done') navigation.navigate('onboarding')
  // }, 2000)

  const renderTabs = (tab: TabType, index: number): React.ReactElement => {
    const handleTabPress = (): void => {
      navigation.navigate(tab.id)
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
  const leadingArea = <View style={[styles.footer, styles.leading]}>{tabs.map(renderTabs)}</View>

  const trailingArea = (
    <View style={[styles.footer, styles.trailing]}>
      <NavBarItem
        onPress={() => navigation.navigate('search')}
        icon={<IconMagnifyingGlass />}
      />
    </View>
  )

  return (
    <>
      {leadingArea}
      {trailingArea}
    </>
  )
}

export default NavBar
