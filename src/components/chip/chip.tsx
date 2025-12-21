import React, { useEffect } from 'react'
import { Pressable, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { BlurView } from 'expo-blur'

import useStyles from './styles'
import { ChipProps } from './types'
import { IconEyeClosed } from '@components/icon'
import { IconProps } from '@components/icon/types'
import Typography from '@components/typography'
import { useTheme } from '@providers/theme'

const Chip = ({ title, icon, spoiler, toggleSpoiler, ...props }: ChipProps): React.ReactElement => {
  const styles = useStyles()
  const theme = useTheme()

  const animation = useSharedValue(1)

  useEffect(() => {
    animation.value = withTiming(spoiler ? 1 : 0, { duration: 250 })
  }, [spoiler, animation])

  const spoilerStyle = useAnimatedStyle(() => {
    return { opacity: animation.value }
  })

  const content = (
    <View style={styles.content}>
      {icon &&
        React.cloneElement<IconProps>(icon, {
          color: theme.semantics.container.foreground.light,
          size: 12,
          ...icon.props,
        })}

      {title && <Typography legend>{title}</Typography>}
    </View>
  )

  if (toggleSpoiler)
    return (
      <Pressable
        onPress={() => toggleSpoiler('hideRate')}
        style={styles.root}
      >
        {content}
        <Animated.View style={[styles.spoiler, spoilerStyle]}>
          <BlurView
            intensity={10}
            style={styles.blur}
          />
          <IconEyeClosed size={16} />
        </Animated.View>
      </Pressable>
    )

  return <View style={styles.root}>{content}</View>
}

export default Chip
