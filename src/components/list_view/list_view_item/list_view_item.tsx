import React from 'react'
import { ActivityIndicator, Image, TouchableOpacity, View } from 'react-native'
import { useTranslation } from 'react-i18next'

import useStyle from './styles'
import { ListViewItemProps } from './types'
import { IconProps } from '@components/icon'
import Typography from '@components/typography'
import { semantics, useTheme } from '@providers/theme'

const ListViewItem = ({ _id, title: titleProp, description, posterPath: posterProp, style, topButton, bottomButton, onLongPress, onPress, ...props }: ListViewItemProps): React.ReactElement => {
  const styles = useStyle()
  const theme = useTheme()
  const { i18n } = useTranslation()
  const title = typeof titleProp === 'string' ? titleProp : titleProp[i18n.language]
  const posterPath = posterProp === undefined ? undefined : typeof posterProp === 'string' ? posterProp : posterProp[i18n.language]

  const renderButton = (button: typeof topButton, position: 'top' | 'bottom'): React.ReactElement | undefined => {
    if (!button) return
    const isLoading = button.loading?.(_id) ?? false

    return (
      <TouchableOpacity
        delayLongPress={3000}
        activeOpacity={0.7}
        style={[styles.button, position === 'top' ? styles.top : styles.bottom]}
        onPress={() => button.onPress(_id)}
        disabled={isLoading}
      >
        <View style={[styles.buttonContent, isLoading && styles.hide]}>
          <Typography color={theme.semantics.container.foreground.default}>{button.title}</Typography>

          {button.icon &&
            React.cloneElement<IconProps>(button.icon, {
              color: theme.semantics.container.foreground.default,
              size: 16,
            })}
        </View>

        <View style={[styles.loading, !isLoading && styles.hide]}>
          <ActivityIndicator color={theme.semantics.container.foreground.default} />
        </View>
      </TouchableOpacity>
    )
  }

  const content = (
    <>
      {posterPath !== undefined && (
        <Image
          style={styles.image}
          source={{ uri: `https://image.tmdb.org/t/p/w500${posterPath}` }}
          alt={title}
        />
      )}

      {posterPath === undefined && <View style={styles.imagePlaceholder} />}

      <View style={{ flex: 1 }}>
        <Typography body>{typeof title === 'string' ? title : title}</Typography>
        <Typography
          body
          color={semantics.container.foreground.light}
        >
          {description}
        </Typography>
      </View>
    </>
  )

  return (
    <View style={[{ flexDirection: 'row' }, style]}>
      {(onPress || onLongPress) && (
        <TouchableOpacity
          onPress={(e) => onPress?.(e, props.id)}
          onLongPress={(e) => onLongPress?.(e, props.id)}
          style={[styles.root, topButton && bottomButton && styles.hasButtons]}
          activeOpacity={0.7}
          {...props}
        >
          {content}
        </TouchableOpacity>
      )}

      {!onPress && !onLongPress && (
        <View
          style={[styles.root, topButton && bottomButton && styles.hasButtons]}
          activeOpacity={0.7}
          {...props}
        >
          {content}
        </View>
      )}

      {topButton && bottomButton && (
        <View>
          {renderButton(topButton, 'top')}
          {renderButton(bottomButton, 'bottom')}
        </View>
      )}
    </View>
  )
}

export default ListViewItem
