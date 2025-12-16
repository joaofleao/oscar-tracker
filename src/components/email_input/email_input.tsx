import React, { useRef, useState } from 'react'
import { Pressable, TextInput, View } from 'react-native'

import useStyles from './styles'
import { EmailInputProps } from './types'
import { IconAlert, IconCheckCircle, IconEmail } from '@components/icon'
import { useStrings } from '@providers/strings'
import { useTheme } from '@providers/theme'

const emailValidation = (value: string): boolean => {
  const emailValid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)
  return emailValid
}

const EmailInput = ({
  value,
  onChangeText,
  debounce = 0,
  ...props
}: EmailInputProps): React.ReactElement => {
  const inputRef = useRef<TextInput>(null)
  const styles = useStyles()
  const { semantics } = useTheme()
  const { email } = useStrings()
  const [error, setError] = useState<boolean>()

  let timeoutId: NodeJS.Timeout

  const debouncer = (text: string): void => {
    timeoutId = setTimeout(() => {
      if (text.length > 0) setError(emailValidation(text))
    }, 1000)
  }

  const handleChangeText = (text: string): void => {
    onChangeText?.(text)
    clearTimeout(timeoutId)
    debouncer(text)
  }

  return (
    <View style={styles.root}>
      <Pressable
        onPress={inputRef.current?.focus}
        style={styles.leading}
      >
        <IconEmail
          color={semantics.container.foreground.light}
          size={16}
        />
      </Pressable>
      <TextInput
        keyboardType="email-address"
        textContentType="emailAddress"
        autoComplete="email"
        autoCapitalize="none"
        autoCorrect={false}
        ref={inputRef}
        placeholder={email.placeholder}
        placeholderTextColor={semantics.container.foreground.light}
        selectionColor={semantics.container.foreground.light}
        cursorColor={semantics.container.foreground.default}
        style={styles.input}
        value={value}
        onChangeText={handleChangeText}
        {...props}
      />
      {error !== undefined && (
        <Pressable
          onPress={inputRef.current?.focus}
          style={styles.trailing}
        >
          {error === false && (
            <IconAlert
              filled
              color={semantics.negative.foreground.default}
              size={16}
            />
          )}

          {error === true && (
            <IconCheckCircle
              filled
              color={semantics.positive.foreground.default}
              size={16}
            />
          )}
        </Pressable>
      )}
    </View>
  )
}

export default EmailInput
