import React, { useState } from 'react'
import { View } from 'react-native'

import useStyles from './styles'
import { PasswordInputProps } from './types'
import { IconAlert, IconCheckCircle, IconEyeClosed, IconEyeOpen, IconLock } from '@components/icon'
import TextInput from '@components/text_input'
import Typography from '@components/typography'
import { useStrings } from '@providers/strings'
import { useTheme } from '@providers/theme'

export const validatePassword = (
  password: string,
  confirmPassword: string,
): {
  oneUpperCase: boolean
  oneDigit: boolean
  passwordValid: boolean
  match: boolean
  overall: boolean
} => {
  const match = password === confirmPassword && password !== ''
  const oneUpperCase = /(?=.*[A-Z])/.test(password)
  const oneDigit = /(?=.*[0-9])/.test(password)
  const passwordValid = oneUpperCase && oneDigit

  return {
    oneUpperCase,
    oneDigit,
    passwordValid,
    match,
    overall: match && passwordValid,
  }
}

const PasswordInput = ({ value, passwordConfirmation, type = 'password', ...props }: PasswordInputProps): React.ReactElement => {
  const styles = useStyles()
  const { semantics } = useTheme()
  const strings = useStrings()
  const [showPassword, setShowPassword] = useState(false)

  const { match, oneDigit, oneUpperCase, passwordValid } = validatePassword(value ?? '', passwordConfirmation ?? '')

  const handleShow = (): void => {
    setShowPassword((prev) => !prev)
  }

  const renderConfirmPassword = type === 'confirm_password' && (
    <View style={styles.container}>
      {match ? (
        <IconCheckCircle
          color={semantics.positive.foreground.default}
          size={16}
        />
      ) : (
        <IconAlert
          color={semantics.background.foreground.light}
          size={16}
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
      <TextInput
        icon={<IconLock />}
        button={{
          icon: showPassword ? <IconEyeClosed /> : <IconEyeOpen />,
          action: handleShow,
        }}
        passwordRules={'minlength: 6;  required: upper; required: digit;'}
        autoComplete={type === 'password' ? 'current-password' : 'new-password'}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={!showPassword}
        placeholder={type === 'confirm_password' ? strings.password.confirmationPlaceholder : strings.password.placeholder}
        value={value}
        {...props}
      />

      {renderConfirmPassword}
      {renderRequirements}
    </>
  )
}

export default PasswordInput
