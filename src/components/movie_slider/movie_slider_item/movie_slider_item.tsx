import React, { useEffect } from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import Animated, { FadeInDown, FadeInUp, LinearTransition, useSharedValue, withTiming } from 'react-native-reanimated'

import useStyles from './styles'
import { MovieSliderItemProps } from './types'
import { IconLocket } from '@components/icon'
import Typography from '@components/typography'
import { useTheme } from '@providers/theme'

const MovieSliderItem = ({ height, title, description, image, spoiler, watched, bottomArea, isActive, ...props }: MovieSliderItemProps): React.ReactElement => {
  const styles = useStyles({ height })
  const { semantics } = useTheme()
  const hasImage = image !== undefined

  const animationProgress = useSharedValue(isActive ? 1 : 0)

  useEffect(() => {
    animationProgress.value = withTiming(isActive ? 1 : 0, { duration: 300 })
  }, [animationProgress, isActive])

  return (
    <TouchableOpacity
      style={styles.root}
      {...props}
    >
      {hasImage && (
        <View>
          <Image
            blurRadius={spoiler && !watched ? 20 : 0}
            source={{ uri: image }}
            style={[styles.image]}
          />
          {!watched && (
            <View style={styles.spoiler}>
              <IconLocket
                color={semantics.container.foreground.light}
                size={16}
              />
            </View>
          )}
        </View>
      )}
      <View style={[styles.content]}>
        <Typography
          layout={LinearTransition}
          color={isActive ? semantics.container.foreground.default : semantics.container.foreground.light}
        >
          {title}
        </Typography>

        {isActive && (bottomArea || description) && (
          <Animated.View entering={FadeInUp.delay(0)}>
            {description && (
              <Typography
                legend
                color={semantics.background.foreground.light}
              >
                {description}
              </Typography>
            )}
            {bottomArea && bottomArea}
          </Animated.View>
        )}
      </View>
    </TouchableOpacity>
  )
}

export default MovieSliderItem
