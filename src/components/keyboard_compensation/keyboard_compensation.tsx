import React from 'react'
import { useKeyboardHandler } from 'react-native-keyboard-controller'
import Animated, { useSharedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const KeyboardCompensation = (): React.ReactElement => {
  const height = useSharedValue(0)
  const progress = useSharedValue(0)

  useKeyboardHandler(
    {
      onMove: (e) => {
        'worklet'
        height.value = e.height
        progress.value = e.progress
      },
      onEnd: (e) => {
        'worklet'

        height.value = e.height
        progress.value = e.progress
      },
    },
    [],
  )

  const { bottom } = useSafeAreaInsets()
  return (
    <>
      <Animated.View style={{ minHeight: bottom, height: height }} />
    </>
  )
}

export default KeyboardCompensation
