import { TextInputProps as RNTextInput } from 'react-native'

export interface TextInputProps extends RNTextInput {
  debounce?: number
}
