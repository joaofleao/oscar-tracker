import React, { useEffect } from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import { FadeInUp, LinearTransition, useSharedValue, withTiming } from 'react-native-reanimated'
import { BlurView } from 'expo-blur'

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
            source={{ uri: image }}
            style={[styles.image]}
          />
          {!watched && (
            <BlurView
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
      <View style={[styles.content]}>
        <View>
          <Typography
            layout={LinearTransition}
            color={isActive ? semantics.container.foreground.default : semantics.container.foreground.light}
          >
            {title}
          </Typography>

          {isActive && description && (
            <Typography
              entering={FadeInUp.delay(100)}
              legend
              color={semantics.background.foreground.light}
            >
              {description}
            </Typography>
          )}
        </View>
        {isActive && bottomArea}
      </View>
    </TouchableOpacity>
  )
}

export default MovieSliderItem
