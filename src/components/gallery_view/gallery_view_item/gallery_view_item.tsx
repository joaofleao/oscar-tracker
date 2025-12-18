import React from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import { useTranslation } from 'react-i18next'

import useStyles from './styles'
import { GalleryViewItemProps } from './types'
import Typography from '@components/typography'
import { useTheme } from '@providers/theme'

const GalleryViewItem = ({ _id, posterPath, title, style, onPress, ...props }: GalleryViewItemProps): React.ReactElement => {
  const styles = useStyles()
  const theme = useTheme()
  const { i18n } = useTranslation()

  const content = (
    <>
      {posterPath !== undefined && (
        <Image
          style={styles.image}
          source={{ uri: 'https://image.tmdb.org/t/p/w1280/' + posterPath[i18n.language] }}
        />
      )}

      {posterPath === undefined && (
        <Typography
          numberOfLines={6}
          style={styles.title}
          color={theme.semantics.container.foreground.default}
        >
          {title[i18n.language]}
        </Typography>
      )}
    </>
  )
  if (onPress)
    return (
      <TouchableOpacity
        onPress={(e) => onPress(e, props.id)}
        style={[styles.root, style]}
        activeOpacity={0.7}
        {...props}
      >
        {content}
      </TouchableOpacity>
    )
  return (
    <View
      style={[styles.root, style]}
      {...props}
    >
      {content}
    </View>
  )
}

export default GalleryViewItem
