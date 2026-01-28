import React, { useRef } from 'react'
import { ActivityIndicator, Pressable, TextInput as RNTextInput, View } from 'react-native'
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated'

import useStyles from './styles'
import { TextInputProps } from './types'
import { IconAlert, IconCheckCircle } from '@components/icon'
import { useStrings } from '@providers/strings'
import { useTheme } from '@providers/theme'

const TextInput = ({ value, button, onChangeText, onDebouncedText, success, loading, debounce = 0, error, ...props }: TextInputProps): React.ReactElement => {
  const inputRef = useRef<RNTextInput>(null)
  const styles = useStyles()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const { semantics } = useTheme()
  const { email } = useStrings()

  const debouncer = (text: string): void => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      onDebouncedText?.(text)
    }, debounce)
  }

  const handleChangeText = (text: string): void => {
    onChangeText?.(text)
    debouncer(text)
  }

  return (
    <View style={styles.root}>
      <RNTextInput
        autoCapitalize="none"
        autoCorrect={false}
        ref={inputRef}
        placeholder={email.placeholder}
        placeholderTextColor={semantics.container.foreground.light}
        selectionColor={semantics.container.foreground.light}
        cursorColor={semantics.container.foreground.default}
        style={styles.input}
        onChangeText={handleChangeText}
        value={value}
        {...props}
      />

      {button && (
        <>
          <View style={styles.divider} />
          <Pressable
            style={styles.trailing}
            onPress={button?.action}
          >
            {React.cloneElement(button?.icon, {
              color: semantics.container.foreground.default,
              size: 16,
              ...button?.icon.props,
            })}
          </Pressable>
        </>
      )}
      {success && (
        <Animated.View
          entering={ZoomIn}
          exiting={ZoomOut}
          style={styles.trailing}
        >
          <IconCheckCircle
            filled
            color={semantics.positive.foreground.default}
            size={16}
          />
        </Animated.View>
      )}

      {error && (
        <Animated.View
          entering={ZoomIn}
          exiting={ZoomOut}
          style={styles.trailing}
        >
          <IconAlert
            filled
            color={semantics.negative.foreground.default}
            size={16}
          />
        </Animated.View>
      )}
      {loading && (
        <Animated.View
          entering={ZoomIn}
          exiting={ZoomOut}
          style={styles.trailing}
        >
          <ActivityIndicator
            size="small"
            color={semantics.container.foreground.default}
            style={{ transform: [{ scale: 0.8 }] }}
          />
        </Animated.View>
      )}
    </View>
  )
}

export default TextInput
