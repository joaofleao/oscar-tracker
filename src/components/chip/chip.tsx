import React from 'react'
import { Image, Pressable, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { SvgUri } from 'react-native-svg'

import useStyles from './styles'
import { ChipProps } from './types'
import { IconProps } from '@components/icon/types'
import Typography from '@components/typography'
import { useTheme } from '@providers/theme'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const Chip = ({ title, icon, image, variant = 'container', ...props }: ChipProps): React.ReactElement => {
  const styles = useStyles({ variant })
  const theme = useTheme()

  const content = (
    <View style={[styles.content, !!icon && styles.icon]}>
      {image !== undefined && image !== '' && image?.endsWith('.svg') && (
        <View style={styles.imageContainer}>
          <SvgUri
            uri={image}
            width={20}
            height={20}
          />
        </View>
      )}
      {image !== undefined && image !== '' && !image?.endsWith('.svg') && (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: image }}
            resizeMode="cover"
            width={20}
            height={20}
          />
        </View>
      )}

      {image !== undefined && image === '' && title !== undefined && (
        <View style={styles.imageContainer}>
          <Typography
            legend
            style={styles.initials}
          >{`${title.split(' ')[0].charAt(0).toUpperCase()}${title.split(' ')[1].charAt(0).toUpperCase()}`}</Typography>
        </View>
      )}

      {icon !== undefined &&
        React.cloneElement<IconProps>(icon, {
          color: theme.semantics[variant].foreground.default,
          size: 12,

          ...icon.props,
        })}

      {title !== undefined && (
        <Typography
          style={[styles.text, icon !== undefined && image !== undefined && styles.hasVisuals]}
          color={theme.semantics[variant].foreground.default}
          legend
        >
          {title}
        </Typography>
      )}
    </View>
  )

  return (
    <AnimatedPressable
      style={styles.root}
      {...props}
    >
      {content}
    </AnimatedPressable>
  )
}

export default Chip
