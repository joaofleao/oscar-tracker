import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native'
import { interpolate, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'

export interface useHeaderAnimationProps {
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
  animatedStyle: object
}

const useHeaderAnimation = (): useHeaderAnimationProps => {
  const scrollY = useSharedValue(0)

  const onScroll: useHeaderAnimationProps['onScroll'] = (event) => {
    scrollY.set(event.nativeEvent.contentOffset.y)
  }

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 60], [0, 1])
    return { opacity: opacity }
  })
  return {
    onScroll,
    animatedStyle,
  }
}

export default useHeaderAnimation
