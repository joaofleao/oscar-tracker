import React, { useEffect } from 'react'
import { Image, Pressable, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { BlurView } from 'expo-blur'

import useStyles from './styles'
import { PosterProps } from './types'
import { IconEyeClosed } from '@components/icon'

const Poster = ({ spoiler, toggleSpoiler, placeholder, style, ...props }: PosterProps): React.ReactElement => {
  const styles = useStyles()

  const animation = useSharedValue(spoiler ? 1 : 0)

  useEffect(() => {
    animation.value = withTiming(spoiler ? 1 : 0, { duration: 250 })
  }, [spoiler, animation])

  const spoilerStyle = useAnimatedStyle(() => {
    return { opacity: animation.value }
  })

  const content = (
    <Image
      {...props}
      style={[styles.image, style]}
    />
  )

  if (toggleSpoiler)
    return (
      <Pressable
        onPress={() => toggleSpoiler('hidePoster')}
        style={styles.root}
      >
        {content}
        <Animated.View style={[styles.spoiler, spoilerStyle]}>
          <BlurView
            intensity={50}
            style={styles.blur}
          />
          <IconEyeClosed />
        </Animated.View>
      </Pressable>
    )

  return <View style={styles.root}>{content}</View>
}

export default Poster
