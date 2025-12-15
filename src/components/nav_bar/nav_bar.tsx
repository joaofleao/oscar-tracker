import React from 'react'
import { View } from 'react-native'
import { Authenticated, Unauthenticated } from 'convex/react'

// import { getItem } from 'expo-secure-store'
import NavBarItem from './nav_bar_item'
import useStyles from './styles'
import { NavBarProps, TabType } from './types'
import Avatar from '@components/avatar'
import Button from '@components/button'

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

  return (
    <>
      <View style={[styles.header]}>
        <Authenticated>
          <Avatar onPress={() => navigation.navigate('profile')} />
        </Authenticated>
        <Unauthenticated>
          <Button
            title="entrar"
            onPress={() => navigation.navigate('auth')}
          />
        </Unauthenticated>
      </View>
      <View style={[styles.footer]}>{tabs.map(renderTabs)}</View>
    </>
  )
}

export default NavBar
