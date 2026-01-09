import React from 'react'
import { ActivityIndicator, Image, Pressable, View } from 'react-native'
import Animated, { BounceIn, FadeIn, FadeOut } from 'react-native-reanimated'
import { BlurView } from 'expo-blur'

import useStyle from './styles'
import { ListItemProps, ListItemSecondaryActionProps } from './types'
import { IconLocket, IconProps } from '@components/icon'
import Typography from '@components/typography'
import { semantics, useTheme } from '@providers/theme'

const ListItem = ({ id, title, watched = false, spoiler = false, description, extra, image, secondaryActions, bottomArea, mainAction }: ListItemProps): React.ReactElement => {
  const styles = useStyle()
  const theme = useTheme()
  const hasSecondaryActions = secondaryActions !== undefined && secondaryActions.length > 0

  const renderSecondaryAction = (button: ListItemSecondaryActionProps, index: number): React.ReactElement | undefined => {
    const { title, icon, onPress, loading = false, disabled = false, filled = false, ...rest } = button

    return (
      <React.Fragment key={index}>
        <Pressable
          disabled={loading || disabled}
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          onPress={(e) => onPress?.(e, id)}
          {...rest}
        >
          <View style={[styles.buttonContent, loading && styles.hide]}>
            {title && <Typography color={loading || disabled ? theme.semantics.container.foreground.light : theme.semantics.container.foreground.default}>{title}</Typography>}

            {icon &&
              React.cloneElement<IconProps>(icon, {
                color: disabled || loading ? theme.semantics.container.foreground.light : theme.semantics.container.foreground.default,
                size: 20,
                filled: filled,
              })}
          </View>

          <View style={[styles.loading, !loading && styles.hide]}>
            <ActivityIndicator color={theme.semantics.container.foreground.default} />
          </View>
        </Pressable>

        {hasSecondaryActions && index < secondaryActions.length - 1 && <View style={styles.horizontalSeparator} />}
      </React.Fragment>
    )
  }

  const hasImage = image !== undefined

  const content = (
    <>
      <View style={styles.imageContainer}>
        {image === undefined && <View style={styles.imagePlaceholder} />}
        {hasImage && (
          <Image
            style={styles.image}
            source={{ uri: image }}
            alt={title}
          />
        )}
        {!watched && hasImage && (
          <BlurView
            style={styles.spoiler}
            intensity={spoiler && !watched ? 10 : 0}
          />
        )}
        {!watched && (
          <View style={[styles.unwatched, hasImage && styles.hasImage]}>
            <IconLocket
              color={semantics.container.foreground.light}
              size={16}
            />
          </View>
        )}
      </View>

      <View style={styles.texts}>
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
    <Animated.View style={styles.root}>
      <Pressable
        {...mainAction}
        onPress={(e) => mainAction?.onPress?.(e, id)}
        onLongPress={(e) => mainAction?.onLongPress?.(e, id)}
        style={({ pressed }) => [styles.content, pressed && styles.contentPressed]}
      >
        {content}
      </Pressable>

      {hasSecondaryActions && (
        <>
          <View style={styles.verticalSeparator} />
          <View>{secondaryActions.map(renderSecondaryAction)}</View>
        </>
      )}
    </Animated.View>
  )
}

export default ListItem
