import React, { useEffect } from 'react'
import { TouchableOpacity, View } from 'react-native'
import Animated, { FadeInDown, interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { BlurView } from 'expo-blur'

import useStyles from './styles'
import { MovieSliderItemProps } from './types'
import { IconLocket } from '@components/icon'
import Typography from '@components/typography'
import { useTheme } from '@providers/theme'

const MovieSlider = ({ title, description, image, spoiler, watched, bottomArea, isActive, ...props }: MovieSliderItemProps): React.ReactElement => {
  const styles = useStyles()
  const { semantics } = useTheme()
  const hasImage = image !== undefined

  const animationProgress = useSharedValue(isActive ? 1 : 0)

  useEffect(() => {
    animationProgress.value = withTiming(isActive ? 1 : 0, { duration: 300 })
  }, [animationProgress, isActive])

  const animatedImageStyle = useAnimatedStyle(() => {
    const height = interpolate(animationProgress.value, [0, 1], [56, 112])
    return { height }
  })

  return (
    <TouchableOpacity
      style={styles.root}
      {...props}
    >
      {hasImage && (
        <View>
          <Animated.Image
            source={{ uri: image }}
            style={[styles.image, animatedImageStyle]}
          />
          {!watched && (
            <BlurView
              experimentalBlurMethod="dimezisBlurView"
              style={styles.spoiler}
              intensity={spoiler && !watched ? 20 : 0}
            >
              <IconLocket
                color={semantics.container.foreground.light}
                size={16}
              />
            </BlurView>
          )}
        </View>
      )}
      <Animated.View style={[styles.content, animatedImageStyle]}>
        <View>
          <Typography color={isActive ? semantics.container.foreground.default : semantics.container.foreground.light}>{title}</Typography>
          {isActive && description && (
            <Typography
              entering={FadeInDown}
              legend
              color={semantics.background.foreground.light}
            >
              {description}
            </Typography>
          )}
        </View>
        {isActive && bottomArea}
      </Animated.View>
    </TouchableOpacity>
  )
}

export default MovieSlider
