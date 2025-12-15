import { ColorValue, TextInput, TextInputProps } from 'react-native'

export interface OtpInputProps extends TextInputProps {
  focusColor?: ColorValue

  onFilled?: (text: string) => void
  blurOnFilled?: boolean
  focusStickBlinkingDuration?: number
  type?: 'alpha' | 'numeric' | 'alphanumeric'
  ref?: React.Ref<TextInput>
}
