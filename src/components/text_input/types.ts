import { TextInputProps as RNTextInput } from 'react-native'

import { IconProps } from '@components/icon'

export interface TextInputProps extends RNTextInput {
  debounce?: number
  error?: boolean
  success?: boolean
  loading?: boolean
  onDebouncedText?: TextInputProps['onChangeText']
  button?: {
    icon: React.ReactElement<IconProps>
    action: () => void
  }
}
