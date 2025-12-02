import { cloneElement, useEffect, useRef, useState } from 'react'
import { Animated, Easing, Text, TextInput, type TextInputProps, View } from 'react-native'

import useStyles from './styles'
import { useTheme } from '@providers/theme'

export interface TextFieldProps extends TextInputProps {
  label?: string
  placeholder?: string
  value?: string
  icon?: JSX.Element

  actionButton?: JSX.Element
  errorText?: string
  valid?: boolean
}

const defaultProps: TextFieldProps = {
  valid: false,
}

const TextField = (props: TextFieldProps): JSX.Element => {
  const { label, value, placeholder, icon, actionButton, errorText, valid, ...rest } = {
    ...defaultProps,
    ...props,
  }
  const theme = useTheme()

  const hasLabel = Boolean(label)
  const hasActionButton = Boolean(actionButton)
  const hasIcon = Boolean(icon)

  const translateY = useRef(new Animated.Value(30)).current

  const [focused, setFocused] = useState(false)
  const styles = useStyles({ isFocused: focused })

  useEffect(() => {
    const userTyping = setTimeout(() => {
      if (!valid && value !== '') {
        Animated.timing(translateY, {
          toValue: 0,
          duration: 150,
          easing: Easing.ease,
          useNativeDriver: true,
        }).start()
      } else {
        Animated.timing(translateY, {
          toValue: 30,
          duration: 150,
          easing: Easing.ease,
          useNativeDriver: true,
        }).start()
      }
    }, 1000)
    return () => {
      clearTimeout(userTyping)
    }
  }, [value, valid, translateY])

  const renderLabel = hasLabel && <Text style={styles.label}>{label}</Text>

  const renderIcon =
    hasIcon &&
    cloneElement(icon, {
      color: theme.colors.primary.default,
      width: 16,
      height: 16,
      style: styles.icon,
    })

  const renderActionButton =
    hasActionButton &&
    cloneElement(actionButton, {
      style: styles.actionButton,
    })

  const renderErrorText = errorText && (
    <Animated.View style={[styles.helperContainer, { transform: [{ translateY }] }]}>
      <Text style={styles.errorText}>{errorText}</Text>
    </Animated.View>
  )

  return (
    <View style={styles.container}>
      {renderErrorText}
      {renderLabel}
      <View style={styles.row}>
        <TextInput
          cursorColor={theme.colors.primary.default}
          style={[
            styles.input,
            hasIcon && styles.inputWithIcon,
            hasActionButton && styles.inputWithButton,
          ]}
          selectionColor={theme.colors.primary.default}
          placeholderTextColor={theme.colors.text.light}
          placeholder={placeholder}
          autoCapitalize="none"
          value={value}
          onFocus={(): void => {
            return setFocused(true)
          }}
          onBlur={(): void => {
            return setFocused(false)
          }}
          {...rest}
        />
        {renderIcon}
        {renderActionButton}
      </View>
    </View>
  )
}

export default TextField
