import { TextInputProps } from 'react-native'

export interface EmailInputProps extends TextInputProps {
  debounce?: number
}
