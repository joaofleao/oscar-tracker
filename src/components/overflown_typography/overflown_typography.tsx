import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { cancelAnimation, Easing, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSequence, withTiming } from 'react-native-reanimated'

import useStyles from './styles'
import { OverflownTypographyProps } from './types'
import Typography from '@components/typography/typography'

const OverflownTypography = ({ animate = false, style, ...props }: OverflownTypographyProps): React.ReactElement => {
  const [textWidth, setTextWidth] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)
  const translateX = useSharedValue(0)
  const styles = useStyles()

  useEffect(() => {
    const overflow = textWidth > containerWidth && containerWidth > 0
    const maxOffset = Math.max(0, textWidth - containerWidth)
    const duration = { duration: Math.max(2000, maxOffset * 30), easing: Easing.linear }

    cancelAnimation(translateX)
    if (overflow && animate) {
      translateX.value = 0
      translateX.value = withRepeat(withSequence(withDelay(1000, withTiming(-maxOffset, duration)), withDelay(1000, withTiming(0, duration))), -1, false)
    } else {
      translateX.value = 0
    }

    return (): void => cancelAnimation(translateX)
  }, [textWidth, containerWidth, translateX, animate])

  const animatedStyle = useAnimatedStyle(() => {
    return { transform: [{ translateX: translateX.value }] }
  })

  return (
    <View
      style={styles.root}
      onLayout={(event) => {
        setContainerWidth(event.nativeEvent.layout.width)
      }}
    >
      <View style={styles.container}>
        <Typography
          numberOfLines={1}
          {...props}
          onLayout={(event) => {
            setTextWidth(event.nativeEvent.layout.width)
            props.onLayout?.(event)
          }}
          style={[animatedStyle, styles.text, style]}
        />
      </View>
    </View>
  )
}

export default OverflownTypography
