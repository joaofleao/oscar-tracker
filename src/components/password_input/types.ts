import { TextInputProps } from '@components/text_input'

export interface PasswordInputProps extends TextInputProps {
  passwordConfirmation?: string
  type?: 'password' | 'new_password' | 'confirm_password'
}
