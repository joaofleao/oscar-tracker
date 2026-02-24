import React from 'react'
import { Image, View } from 'react-native'

import useStyles from './styles'
import { AvatarProps } from './types'
import Typography from '@components/typography'

const TinyAvatar = ({ image, label, ...props }: AvatarProps): React.ReactElement => {
  const styles = useStyles()

  const hasLabel = label !== undefined
  const hasImage = image !== undefined
  const twoInitials: string = hasLabel
    ? label
        .split(' ')
        .map((word) => word.charAt(0))
        .join('')
        .substring(0, 2)
        .toUpperCase()
    : ''

  return (
    <View
      style={styles.root}
      {...props}
    >
      {hasImage && (
        <Image
          style={styles.image}
          source={{ uri: image }}
        />
      )}

      {!hasImage && <View style={styles.iconContainer}>{hasLabel && <Typography legend>{twoInitials}</Typography>}</View>}
    </View>
  )
}

export default TinyAvatar
