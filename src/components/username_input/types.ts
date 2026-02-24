import { TextInputProps } from 'react-native'

export interface SearchInputProps extends TextInputProps {
  debounce?: number
  onDebouncedText?: TextInputProps['onChangeText']
  onClear?: () => void
}
