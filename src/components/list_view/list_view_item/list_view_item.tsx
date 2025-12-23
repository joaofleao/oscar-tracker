import React from 'react'
import { ActivityIndicator, Image, TouchableOpacity, View } from 'react-native'
import { BlurView } from 'expo-blur'

import useStyle from './styles'
import { ListViewItemProps } from './types'
import { IconLocket, IconProps } from '@components/icon'
import Typography from '@components/typography'
import { semantics, useTheme } from '@providers/theme'

const ListViewItem = ({ _id, title, spoiler, watched, bottomArea, description, extra, image, style, topButton, bottomButton, onLongPress, onPress, ...props }: ListViewItemProps): React.ReactElement => {
  const styles = useStyle()
  const theme = useTheme()

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
          {title && <Typography color={theme.semantics.container.foreground.default}>{button.title}</Typography>}

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

  const hasImage = image !== undefined

  const content = (
    <>
      {hasImage && (
        <View>
          <Image
            style={styles.image}
            source={{ uri: image }}
            alt={title}
          />
          {!watched && (
            <BlurView
              style={styles.spoiler}
              intensity={spoiler && !watched ? 10 : 0}
            >
              <IconLocket
                color={semantics.container.foreground.light}
                size={16}
              />
            </BlurView>
          )}
        </View>
      )}

      {image === undefined && <View style={styles.imagePlaceholder} />}

      <View style={{ flex: 1, gap: 4 }}>
        <View>
          <Typography body>{typeof title === 'string' ? title : title}</Typography>

          {description && (
            <Typography
              body
              color={semantics.container.foreground.light}
            >
              {description}
            </Typography>
          )}
          {extra && (
            <Typography
              body
              color={semantics.accent.base.default}
            >
              {extra}
            </Typography>
          )}
        </View>

        {bottomArea}
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
