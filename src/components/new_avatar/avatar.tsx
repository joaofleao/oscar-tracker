import React from 'react'
import { Image, TouchableOpacity, View } from 'react-native'

import useStyles from './styles'
import { AvatarProps } from './types'
import { IconPerson } from '@components/icon'
import Typography from '@components/typography'

const Avatar = ({ ref, image, label, ...props }: AvatarProps): React.ReactElement => {
  const styles = useStyles()

  const hasLabel = label !== undefined
  const hasImage = image !== undefined

  return (
    <TouchableOpacity
      ref={ref}
      style={styles.root}
      {...props}
    >
      {hasImage && (
        <Image
          style={styles.image}
          source={{ uri: image }}
        />
      )}

      {!hasImage && (
        <View style={styles.iconContainer}>
          {hasLabel && <Typography>{label}</Typography>}
          {!hasLabel && <IconPerson size={16} />}
        </View>
      )}
    </TouchableOpacity>
  )
}

export default Avatar
