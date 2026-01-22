import React, { useEffect } from 'react'
import { Pressable } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { BlurView } from 'expo-blur'

import useStyles from './styles'
import { ParagraphProps } from './types'
import { IconEyeClosed } from '@components/icon'
import Typography from '@components/typography'

const Paragraph = ({ text, spoiler, toggleSpoiler }: ParagraphProps): React.ReactElement => {
  const styles = useStyles()

  const animation = useSharedValue(1)

  useEffect(() => {
    animation.value = withTiming(spoiler ? 1 : 0, { duration: 250 })
  }, [spoiler, animation])

  const spoilerStyle = useAnimatedStyle(() => {
    return { opacity: animation.value }
  })

  const content = (
    <Typography
      justify
      body
    >
      {text}
    </Typography>
  )

  if (toggleSpoiler)
    return (
      <Pressable
        onPress={() => toggleSpoiler('hidePlot')}
        style={styles.root}
      >
        {content}

        <Animated.View style={[styles.spoiler, spoilerStyle]}>
          <BlurView
            experimentalBlurMethod="dimezisBlurView"
            intensity={10}
            style={styles.blur}
          />
          <IconEyeClosed />
        </Animated.View>
      </Pressable>
    )

  return content
}

export default Paragraph
