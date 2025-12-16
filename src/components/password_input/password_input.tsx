import React, { useRef, useState } from 'react'
import { Pressable, TextInput, View } from 'react-native'

import useStyles from './styles'
import { PasswordInputProps } from './types'
import { IconAlert, IconCheckCircle, IconEyeClosed, IconEyeOpen, IconLock } from '@components/icon'
import Typography from '@components/typography'
import { useStrings } from '@providers/strings'
import { useTheme } from '@providers/theme'

const passwordValidation = (
  password: string,
  confirmPassowrd: string,
): {
  oneUpperCase: boolean
  oneDigit: boolean
  passwordValid: boolean
  match: boolean
} => {
  const match = password === confirmPassowrd && password !== ''
  const oneUpperCase = /(?=.*[A-Z])/.test(password)
  const oneDigit = /(?=.*[0-9])/.test(password)
  const passwordValid = oneUpperCase && oneDigit

  return {
    oneUpperCase,
    oneDigit,
    passwordValid,
    match,
  }
}

const PasswordInput = ({
  debounce = 0,
  value,
  passwordConfirmation,
  type = 'password',
  ...props
}: PasswordInputProps): React.ReactElement => {
  const inputRef = useRef<TextInput>(null)
  const styles = useStyles()
  const { semantics } = useTheme()
  const strings = useStrings()
  const [showPassword, setShowPassword] = useState(false)

  const { match, oneDigit, oneUpperCase, passwordValid } = passwordValidation(
    value ?? '',
    passwordConfirmation ?? '',
  )

  const handleShow = (): void => {
    setShowPassword((prev) => !prev)
  }

  const renderConfirmPassword = type === 'confirm_password' && (
    <View style={styles.container}>
      {match ? (
        <IconCheckCircle
          color={semantics.positive.foreground.default}
          width={16}
          height={16}
        />
      ) : (
        <IconAlert
          color={semantics.background.foreground.light}
          width={16}
          height={16}
        />
      )}

      <Typography
        legend
        color={match ? semantics.positive.foreground.default : undefined}
        style={styles.rule}
      >
        {strings.password.match}
      </Typography>
    </View>
  )

  const renderRequirements = type === 'new_password' && (
    <View style={styles.container}>
      {passwordValid ? (
        <IconCheckCircle
          color={semantics.positive.foreground.default}
          width={16}
          height={16}
        />
      ) : (
        <IconAlert
          color={semantics.background.foreground.light}
          width={16}
          height={16}
        />
      )}
      <Typography
        legend
        style={styles.rule}
        color={oneDigit && oneUpperCase ? semantics.positive.foreground.default : undefined}
      >
        {strings.password.requirements}
        <Typography
          legend
          color={oneDigit ? semantics.positive.foreground.default : undefined}
        >
          {strings.password.digit}
        </Typography>
        <Typography
          legend
          color={oneUpperCase ? semantics.positive.foreground.default : undefined}
        >
          {strings.password.uppercase}
        </Typography>
      </Typography>
    </View>
  )

  return (
    <>
      <View style={styles.root}>
        <Pressable
          onPress={() => inputRef.current?.focus()}
          style={styles.leading}
        >
          <IconLock
            color={semantics.background.foreground.light}
            size={16}
          />
        </Pressable>
        <TextInput
          passwordRules={'minlength: 6;  required: upper; required: digit;'}
          autoComplete={type === 'password' ? 'current-password' : 'new-password'}
          autoCorrect={false}
          secureTextEntry={!showPassword}
          ref={inputRef}
          placeholder={
            type === 'confirm_password'
              ? strings.password.confirmationPlaceholder
              : strings.password.placeholder
          }
          placeholderTextColor={semantics.background.foreground.light}
          selectionColor={semantics.background.foreground.light}
          cursorColor={semantics.background.foreground.default}
          style={styles.input}
          value={value}
          {...props}
        />

        <View style={styles.divider} />
        <Pressable
          onPress={handleShow}
          style={styles.trailing}
        >
          {showPassword ? (
            <IconEyeClosed
              color={semantics.background.foreground.default}
              size={16}
            />
          ) : (
            <IconEyeOpen
              color={semantics.background.foreground.default}
              size={16}
            />
          )}
        </Pressable>
      </View>
      {renderConfirmPassword}
      {renderRequirements}
    </>
  )
}

export default PasswordInput
