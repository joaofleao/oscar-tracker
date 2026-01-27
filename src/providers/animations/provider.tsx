import React from 'react'
import { interpolate, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'

import AnimationsContext from './context'
import { AnimationsContextType } from './types'

const AnimationsProvider = ({ children }: { children?: React.ReactNode }): React.ReactElement => {
  const nominationsRef = React.useRef(null)
  const moviesRef = React.useRef(null)
  const profileRef = React.useRef(null)

  const nominationsScrollY = useSharedValue(0)
  const moviesScrollY = useSharedValue(0)
  const profileScrollY = useSharedValue(0)

  const onScrollNominations: AnimationsContextType['onScrollNominations'] = (event) => {
    nominationsScrollY.set(event.nativeEvent.contentOffset.y)
  }
  const onScrollMovies: AnimationsContextType['onScrollMovies'] = (event) => {
    moviesScrollY.set(event.nativeEvent.contentOffset.y)
  }
  const onScrollProfile: AnimationsContextType['onScrollProfile'] = (event) => {
    profileScrollY.set(event.nativeEvent.contentOffset.y)
  }

  const nominationsAnimatedStyle = useAnimatedStyle(() => {
    const nominationsOpacity = interpolate(nominationsScrollY.value, [0, 100], [0, 1])
    return { opacity: nominationsOpacity }
  })
  const moviesAnimatedStyle = useAnimatedStyle(() => {
    const moviesOpacity = interpolate(moviesScrollY.value, [0, 100], [0, 1])
    return { opacity: moviesOpacity }
  })
  const profileAnimatedStyle = useAnimatedStyle(() => {
    const profileOpacity = interpolate(profileScrollY.value, [0, 100], [0, 1])
    return { opacity: profileOpacity }
  })

  return (
    <AnimationsContext.Provider
      value={{
        nominationsRef,
        moviesRef,
        profileRef,
        onScrollNominations,
        onScrollMovies,
        onScrollProfile,
        nominationsAnimatedStyle,
        moviesAnimatedStyle,
        profileAnimatedStyle,
      }}
    >
      {children}
    </AnimationsContext.Provider>
  )
}

export default AnimationsProvider
