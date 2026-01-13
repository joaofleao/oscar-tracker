import React from 'react'
import { Image, View } from 'react-native'

import useStyles from './styles'
import { AvatarProps } from './types'
import { IconPerson } from '@components/icon'
import Typography from '@components/typography'

const Avatar = ({ image, name, style }: AvatarProps): React.ReactElement => {
  const styles = useStyles()

  const hasName = name !== undefined
  const hasImage = image !== undefined

  const names = hasName ? name.split(' ') : []

  const initials = hasName ? names[0].charAt(0) + (names[names.length - 1] ? names[names.length - 1].charAt(0) : '') : ''

  const content = (
    <>
      {hasImage && (
        <Image
          style={styles.image}
          source={{ uri: image }}
        />
      )}

      {!hasImage && (
        <View style={styles.iconContainer}>
          {hasName && <Typography display>{initials}</Typography>}
          {!hasName && <IconPerson size={16} />}
        </View>
      )}
    </>
  )

  return <View style={[styles.root, style]}>{content}</View>
}

export default Avatar
