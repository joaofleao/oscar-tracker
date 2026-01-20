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

const Chip = ({ title, icon, spoiler, toggleSpoiler, variant = 'container', entering, exiting }: ChipProps): React.ReactElement => {
  const styles = useStyles({ variant })
  const theme = useTheme()

  const animation = useSharedValue(1)

  useEffect(() => {
    animation.value = withTiming(spoiler ? 1 : 0, { duration: 250 })
  }, [spoiler, animation])

  const spoilerStyle = useAnimatedStyle(() => {
    return { opacity: animation.value }
  })

  const content = (
    <View style={[styles.content, !!icon && styles.hasIcon]}>
      {icon !== undefined &&
        React.cloneElement<IconProps>(icon, {
          color: theme.semantics[variant].foreground.default,
          size: 12,
          ...icon.props,
        })}

      {title !== undefined && (
        <Typography
          color={theme.semantics[variant].foreground.default}
          legend
        >
          {title}
        </Typography>
      )}
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

  return (
    <Animated.View
      style={styles.root}
      entering={entering}
      exiting={exiting}
    >
      {content}
    </Animated.View>
  )
}

export default Chip
