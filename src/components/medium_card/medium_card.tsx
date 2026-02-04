import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import Animated, { createAnimatedComponent, FadeIn } from 'react-native-reanimated'

import useStyles from './styles'
import { MediumCardProps } from './types'
import { IconLocket, IconOscar } from '@components/icon'
import Tag from '@components/tag'
import Typography from '@components/typography'
import { useTheme } from '@providers/theme'
const AnimatedTouchableOpacity = createAnimatedComponent(TouchableOpacity)

const MediumCard = ({ image, label, spoiler, watched, winner, ...props }: MediumCardProps): React.ReactElement => {
  const styles = useStyles()
  const { semantics } = useTheme()

  const hasImage = image !== undefined

  return (
    <AnimatedTouchableOpacity
      style={styles.root}
      {...props}
    >
      {hasImage && (
        <View style={styles.container}>
          <Animated.Image
            entering={FadeIn}
            blurRadius={spoiler && !watched ? 10 : 0}
            source={{ uri: image }}
            style={styles.image}
          />
          {!watched && (
            <View style={styles.spoiler}>
              <IconLocket
                color={semantics.container.foreground.light}
                size={16}
              />
            </View>
          )}
          {winner && (
            <Tag
              style={styles.winner}
              icon={
                <IconOscar
                  filled
                  color={semantics.brand.foreground.default}
                />
              }
            />
          )}
        </View>
      )}

      <Typography body>{label}</Typography>
    </AnimatedTouchableOpacity>
  )
}

export default MediumCard
