import React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated'

import useStyles from './styles'
import { BigCardProps } from './types'

const CARD_WIDTH = 200
const CARD_SPACING = 16

const BigCard = ({ image, index, scrollX, ...props }: BigCardProps): React.ReactElement => {
  const styles = useStyles()

  const hasImage = image !== undefined

  const animatedStyle = useAnimatedStyle(() => {
    if (!scrollX) {
      return {}
    }

    const inputRange = [(index - 1) * (CARD_WIDTH + CARD_SPACING), index * (CARD_WIDTH + CARD_SPACING), (index + 1) * (CARD_WIDTH + CARD_SPACING)]

    const scale = interpolate(scrollX.value, inputRange, [0.85, 1.15, 0.85], Extrapolation.CLAMP)

    return {
      transform: [{ scale }],
    }
  })

  const overlayStyle = useAnimatedStyle(() => {
    if (!scrollX) {
      return { opacity: 0 }
    }

    const inputRange = [(index - 1) * (CARD_WIDTH + CARD_SPACING), index * (CARD_WIDTH + CARD_SPACING), (index + 1) * (CARD_WIDTH + CARD_SPACING)]

    const opacity = interpolate(scrollX.value, inputRange, [0.4, 0, 0.4], Extrapolation.CLAMP)

    return {
      opacity,
    }
  })

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        style={styles.root}
        {...props}
      >
        {hasImage && (
          <Image
            source={{ uri: image }}
            style={styles.image}
          />
        )}
        <Animated.View
          style={[
            {
              ...StyleSheet.absoluteFillObject,
              backgroundColor: '#000',
              borderRadius: 4,
            },
            overlayStyle,
          ]}
        />
      </TouchableOpacity>
    </Animated.View>
  )
}

export default BigCard
