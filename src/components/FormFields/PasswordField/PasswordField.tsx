import * as React from 'react'
import { Text, View } from 'react-native'

import useStyles from './styles'
import Button from '@components/Button'
import TextField, { TextFieldProps } from '@components/FormFields/TextField'
import Icon from '@components/Icon'
import { useTheme } from '@providers/theme'

export interface PasswordFieldProps extends TextFieldProps {
  type?: 'password' | 'confirmPassword' | 'plain'
  passwordConfirmation?: string
}

const defaultProps: PasswordFieldProps = {
  label: 'Password',
  type: 'plain',
}

const passwordValidation = (
  password: string,
  confirmPassowrd: string,
): {
  oneUpperCase: boolean
  oneSpecialCase: boolean
  oneDigit: boolean
  oneLowerCase: boolean
  passwordValid: boolean
  confirmPasswordValid: boolean
} => {
  const confirmPasswordValid = password === confirmPassowrd && password !== ''

  const oneUpperCase = /(?=.*[A-Z])/.test(password)
  const oneSpecialCase = /(?=.*[!@#$&*.])/.test(password)
  const oneDigit = /(?=.*[0-9])/.test(password)
  const oneLowerCase = /(?=.*[a-z])/.test(password)

  const passwordValid = oneUpperCase && oneSpecialCase && oneDigit && oneLowerCase

  return {
    oneUpperCase,
    oneSpecialCase,
    oneDigit,
    oneLowerCase,
    passwordValid,
    confirmPasswordValid,
  }
}

const PasswordField = (props: PasswordFieldProps): JSX.Element => {
  const { passwordConfirmation, label, value, type, ...rest } = {
    ...defaultProps,
    ...props,
  }

  const styles = useStyles()

  const [passwordVisible, setPasswordVisible] = React.useState(true)

  const {
    confirmPasswordValid,
    oneDigit,
    oneLowerCase,
    oneSpecialCase,
    oneUpperCase,
    passwordValid,
  } = passwordValidation(value, passwordConfirmation)

  const handlePress = (): void => {
    setPasswordVisible((prev) => {
      return !prev
    })
  }

  const { colors } = useTheme()
  const renderIcon = passwordValid ? (
    <Icon.CheckCircle
      color={colors.positive.default}
      width={16}
      height={16}
    />
  ) : (
    <Icon.AlertCircle
      width={16}
      height={16}
    />
  )

  const renderPasswordRule = type === 'password' && (
    <View style={styles.container}>
      {renderIcon}
      <Text style={[styles.rule, passwordValid && styles.valid]}>
        <Text style={[styles.rule, passwordValid && styles.valid]}>
          Your passwords must include
        </Text>
        ,<Text style={oneDigit && styles.valid}> one digit</Text>,
        <Text style={oneUpperCase && styles.valid}> one uppercase letter</Text>,
        <Text style={oneLowerCase && styles.valid}> one lowercase letter</Text>,
        <Text style={oneSpecialCase && styles.valid}> one special character</Text>.
      </Text>
    </View>
  )

  const renderPasswordConfirmationRule = type === 'confirmPassword' && (
    <View style={styles.container}>
      {renderIcon}
      <Text style={[styles.rule, confirmPasswordValid && styles.valid]}>
        Your passwords must match
      </Text>
    </View>
  )

  return (
    <>
      <TextField
        autoComplete="password"
        label={label}
        secureTextEntry={passwordVisible}
        actionButton={
          <Button
            size="action"
            variant="secondary"
            icon={passwordVisible ? <Icon.Eye /> : <Icon.EyeOff />}
            onPress={handlePress}
          />
        }
        {...rest}
      />
      {renderPasswordConfirmationRule}
      {renderPasswordRule}
    </>
  )
}

export default PasswordField
export { passwordValidation }
