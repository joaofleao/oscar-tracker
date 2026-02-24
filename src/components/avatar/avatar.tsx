import React from 'react'
import { Image, TouchableOpacity, View } from 'react-native'

import useStyles from './styles'
import { AvatarProps } from './types'
import { IconImages, IconPerson } from '@components/icon'
import Typography from '@components/typography'

const Avatar = ({ icon = <IconPerson />, image, name, style, onPress }: AvatarProps): React.ReactElement => {
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
          {!hasName && React.cloneElement(icon, { size: 20 })}
        </View>
      )}
    </>
  )
  if (onPress)
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.root, style]}
      >
        {content}
        <View style={styles.iconContainer}>{React.cloneElement(<IconImages />, { size: 20 })}</View>
      </TouchableOpacity>
    )

  return <View style={[styles.root, style]}>{content}</View>
}

export default Avatar
