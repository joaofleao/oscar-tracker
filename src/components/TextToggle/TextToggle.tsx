import React from 'react'
import {
  Animated,
  GestureResponderEvent,
  Pressable,
  PressableProps,
  StyleProp,
  Text,
  ViewStyle,
} from 'react-native'

import useStyles from './styles'
import { useTheme } from '@providers/theme'
import usePressableAnimation from '@hooks/usePressableAnimation'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export type TextToggleProps = PressableProps & {
  selected: boolean
  label: string
  onToggle: (value: boolean) => void
  icon: JSX.Element
  style?: StyleProp<ViewStyle>
}

const defaultValues = {
  selected: false,
}

const TextToggle = (props: TextToggleProps): JSX.Element => {
  const {
    selected,
    label,
    icon,
    onToggle,
    style,
    onPressIn,
    onPressOut,
    onPress,
    disabled,
    ...rest
  } = {
    ...defaultValues,
    ...props,
  }
  const { colors } = useTheme()
  const styles = useStyles({ selected })

  const { animationPressIn, animationPressOut, scale, opacity } = usePressableAnimation({
    disabled,
  })

  const handlePress = (event: GestureResponderEvent): void => {
    onToggle(!selected)
    onPress?.(event)
  }

  const handlePressIn = (event: GestureResponderEvent): void => {
    animationPressIn()
    onPressIn?.(event)
  }

  const handlePressOut = (event: GestureResponderEvent): void => {
    animationPressOut()
    onPressOut?.(event)
  }

  return (
    <AnimatedPressable
      style={[styles.container, style, { transform: [{ scale }], opacity }]}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      {...rest}
    >
      {React.cloneElement(icon, {
        width: 18,
        height: 18,
        color: selected ? colors.text.inverse : colors.primary.default,
        filled: selected,
      })}

      <Text
        style={styles.label}
        numberOfLines={1}
      >
        {label}
      </Text>
    </AnimatedPressable>
  )
}

export default TextToggle
