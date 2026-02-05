import React from 'react'
import { ActivityIndicator, Pressable, View } from 'react-native'
import Animated from 'react-native-reanimated'

import useStyle from './styles'
import { SmallListItemProps, SmallListItemSecondaryActionProps } from './types'
import { IconProps } from '@components/icon'
import Typography from '@components/typography'
import { semantics, useTheme } from '@providers/theme'

const SmallListItem = ({ ghost, id, title, description, extra, secondaryActions, bottomArea, mainAction, layout }: SmallListItemProps): React.ReactElement => {
  const styles = useStyle()
  const theme = useTheme()
  const hasSecondaryActions = secondaryActions !== undefined && secondaryActions.length > 0

  const renderSecondaryAction = (button: SmallListItemSecondaryActionProps, index: number): React.ReactElement | undefined => {
    const { title, icon, selectedIcon, onPress, loading = false, disabled = false, selected = false, ...rest } = button

    return (
      <React.Fragment key={index}>
        <Pressable
          disabled={loading || disabled}
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed, ghost && styles.ghost]}
          onPress={(e) => onPress?.(e, id)}
          {...rest}
        >
          <View style={[styles.buttonContent, loading && styles.hide]}>
            {title && <Typography color={loading || disabled ? theme.semantics.container.foreground.light : theme.semantics.container.foreground.default}>{title}</Typography>}

            {icon &&
              !selected &&
              React.cloneElement<IconProps>(icon, {
                color: disabled || loading ? theme.semantics.background.foreground.light : theme.semantics.background.foreground.default,
                size: 20,

                ...icon.props,
              })}

            {selectedIcon &&
              selected &&
              React.cloneElement<IconProps>(selectedIcon, {
                color: disabled || loading ? theme.semantics.background.foreground.light : theme.semantics.background.foreground.default,
                size: 20,
                ...selectedIcon.props,
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

  return (
    <Animated.View
      style={styles.root}
      layout={layout}
    >
      <Pressable
        {...mainAction}
        onPress={(e) => mainAction?.onPress?.(e, id)}
        onLongPress={(e) => mainAction?.onLongPress?.(e, id)}
        style={({ pressed }) => [styles.content, pressed && mainAction?.onPress && styles.contentPressed, ghost && styles.ghost]}
      >
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
      </Pressable>

      {hasSecondaryActions && (
        <>
          <View style={styles.verticalSeparator} />
          <View style={styles.secondaryActions}>{secondaryActions.map(renderSecondaryAction)}</View>
        </>
      )}
    </Animated.View>
  )
}

export default SmallListItem
