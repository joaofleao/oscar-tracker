import React, { Ref } from 'react'
import {
  Animated,
  GestureResponderEvent,
  Pressable,
  type PressableProps,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from 'react-native'

import useStyles from './styles'
import Loading from '@components/Loading'
import { useTheme } from '@providers/theme'
import usePressableAnimation from '@hooks/usePressableAnimation'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export interface ButtonProps extends PressableProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'outlined' | 'text'
  loading?: boolean
  label?: string
  width?: 'fit' | 'fixed' | 'full' | 'fill'
  size?: 'default' | 'action'
  icon?: JSX.Element
  customRef?: Ref<View>
  style?: StyleProp<ViewStyle>
}
const defaultValue: ButtonProps = {
  width: 'fit',
  variant: 'primary',
  loading: false,
  size: 'default',
}

const Button = (props: ButtonProps): JSX.Element => {
  const {
    label,
    customRef,
    width,
    variant,
    disabled,
    loading,
    style: customStyle,
    icon,
    size,
    onPressIn,
    onPressOut,
    ...rest
  } = {
    ...defaultValue,
    ...props,
  }

  const theme = useTheme()
  const styles = useStyles({ variant, size, icon: Boolean(icon), width, loading })

  const { animationPressIn, animationPressOut, opacity, scale } = usePressableAnimation({
    disabled,
  })

  const handlePressIn = (event: GestureResponderEvent): void => {
    animationPressIn()
    onPressIn?.(event)
  }

  const handlePressOut = (event: GestureResponderEvent): void => {
    animationPressOut()
    onPressOut?.(event)
  }

  const renderIcon =
    icon &&
    React.cloneElement(icon, {
      color: props.variant === 'primary' ? theme.colors.text.inverse : theme.colors.primary.default,
      width: 18,
      height: 18,
      variant,
    })

  const renderLabel = label && (
    <Text
      style={styles.label}
      numberOfLines={1}
      disabled={disabled}
    >
      {label}
    </Text>
  )

  const renderLoading = (
    <Loading
      disabled={disabled}
      animation={'circle'}
      size={24}
      type={variant === 'primary' ? 'secondary' : 'primary'}
    />
  )

  return (
    <>
      <AnimatedPressable
        ref={customRef}
        disabled={disabled}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[styles.root, { transform: [{ scale }], opacity }, customStyle]}
        {...rest}
      >
        <View style={styles.loadingContent}>{renderLoading}</View>
        <View style={styles.content}>
          {renderIcon}
          {renderLabel}
        </View>
      </AnimatedPressable>
    </>
  )
}

export default Button
