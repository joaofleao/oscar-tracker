import React, { useRef, useState } from 'react'
import { ActivityIndicator, GestureResponderEvent, TouchableOpacity, View } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'

import useStyles from './styles'
import { ButtonProps } from './types'
import { IconProps } from '@components/icon/types'
import Typography from '@components/typography'
import { useTheme } from '@providers/theme'

const TOOLTIP_DELAY = 500 // Show tooltip after 500ms
const HOLD_DURATION = 2000 // 3 second countdown
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

const Button = ({ small = false, variant: variantProp = 'container', tooltip, title, icon, style, loading = false, onLongPress, onPressIn: onPressInProp, onPressOut: onPressOutProp, iconPosition = 'leading', ...props }: ButtonProps): React.ReactElement => {
  const isGhost = variantProp === 'ghost'
  const variant = isGhost ? 'container' : variantProp
  const styles = useStyles({ variant })
  const theme = useTheme()

  const [showTooltip, setShowTooltip] = useState(false)
  const [holdCountdown, setHoldCountdown] = useState(0)
  const holdStartTimeRef = useRef<number | null>(null)
  const tooltipTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const handlePressIn: (event: GestureResponderEvent) => void = (event) => {
    if (onLongPress) {
      holdStartTimeRef.current = Date.now()

      // Show tooltip after delay
      tooltipTimeoutRef.current = setTimeout(() => {
        setShowTooltip(true)
      }, TOOLTIP_DELAY)

      // Start countdown
      countdownIntervalRef.current = setInterval(() => {
        const elapsed = Date.now() - (holdStartTimeRef.current ?? 0)
        const remaining = Math.max(0, HOLD_DURATION - elapsed)
        setHoldCountdown(Math.ceil((remaining + 1000) / 1000))
      }, 100)
    }

    onPressInProp?.(event)
  }

  const handlePressOut: (event: GestureResponderEvent) => void = (event) => {
    // Cleanup
    if (tooltipTimeoutRef.current) clearTimeout(tooltipTimeoutRef.current)
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current)
    holdStartTimeRef.current = null
    setShowTooltip(false)
    setHoldCountdown(0)

    onPressOutProp?.(event)
  }

  const [position, setPosition] = useState<{ x: number; y: number; width: number; height: number }>({ x: 0, y: 0, width: 0, height: 0 })

  return (
    <>
      <AnimatedTouchableOpacity
        delayLongPress={3000}
        style={[styles.root, isGhost && styles.ghost, small && styles.small, style]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onLongPress={onLongPress}
        onLayout={(e) => setPosition(e.nativeEvent.layout)}
        {...props}
      >
        <View style={[styles.content, loading && styles.hide, small && styles.smallContent]}>
          {icon &&
            iconPosition === 'trailing' &&
            React.cloneElement<IconProps>(icon, {
              color: props.disabled ? theme.semantics[variant].stroke.default : theme.semantics[variant].foreground.default,
              size: 16,
              ...icon.props,
            })}
          {title && (
            <Typography
              legend={small}
              color={props.disabled ? theme.semantics[variant].stroke.default : theme.semantics[variant].foreground[isGhost ? 'light' : 'default']}
            >
              {title}
            </Typography>
          )}

          {icon &&
            iconPosition === 'leading' &&
            React.cloneElement<IconProps>(icon, {
              color: props.disabled ? theme.semantics[variant].stroke.default : theme.semantics[variant].foreground.default,
              size: 16,
              ...icon.props,
            })}
        </View>

        <View style={[styles.loading, !loading && styles.hide]}>
          <ActivityIndicator color={theme.semantics[variant].foreground.default} />
        </View>
      </AnimatedTouchableOpacity>

      {showTooltip && (
        <Animated.View
          style={[styles.tooltip, { top: position.y - position.height - 16 }]}
          entering={FadeInDown}
        >
          <Typography
            body
            color={theme.semantics.container.foreground.default}
          >
            {tooltip}{' '}
            <Typography
              legend
              color={theme.semantics.accent.base.default}
            >
              {holdCountdown}
            </Typography>
          </Typography>
        </Animated.View>
      )}
    </>
  )
}

export default Button
