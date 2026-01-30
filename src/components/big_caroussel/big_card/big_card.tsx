import React from 'react'
import { Image, Platform, Pressable, View } from 'react-native'
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated'
import { BlurTargetView, BlurView } from 'expo-blur'

import useStyles from './styles'
import { BigCardProps } from './types'
import { IconLocket } from '@components/icon'
import { useTheme } from '@providers/theme'

const CARD_WIDTH = 200
const CARD_SPACING = 16

const BigCard = ({ image, spoiler, winner, watched, index, scrollX, ...props }: BigCardProps): React.ReactElement => {
  const styles = useStyles()
  const { semantics } = useTheme()

  const hasImage = image !== undefined

  const animatedStyle = useAnimatedStyle(() => {
    if (!scrollX) {
      return {}
    }

    const inputRange = [(index - 1) * (CARD_WIDTH + CARD_SPACING), index * (CARD_WIDTH + CARD_SPACING), (index + 1) * (CARD_WIDTH + CARD_SPACING)]
    const scale = interpolate(scrollX.value, inputRange, [0.75, 1, 0.75], Extrapolation.CLAMP)
    return { transform: [{ scale }] }
  })

  const blurReference = React.useRef(null)

  return (
    <Animated.View style={Platform.OS === 'ios' ? animatedStyle : undefined}>
      <Pressable
        style={styles.root}
        {...props}
      >
        {hasImage && (
          <View style={[styles.container, winner && styles.winner]}>
            <BlurTargetView ref={blurReference}>
              <Image
                source={{ uri: image }}
                style={styles.image}
              />
            </BlurTargetView>

            {!watched && (
              <BlurView
                blurTarget={blurReference}
                style={styles.blur}
                blurReductionFactor={10}
                intensity={spoiler && !watched ? 40 : 0}
                tint="dark"
                blurMethod="dimezisBlurView"
              >
                <View style={styles.spoiler}>
                  <IconLocket
                    color={semantics.container.foreground.default}
                    size={16}
                  />
                </View>
              </BlurView>
            )}
          </View>
        )}
      </Pressable>
    </Animated.View>
  )
}

export default BigCard
