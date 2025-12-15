import { TextInputProps } from 'react-native'

export interface PasswordInputProps extends TextInputProps {
  debounce?: number
  passwordConfirmation?: string
  type?: 'password' | 'new_password' | 'confirm_password'
}
