import { ViewStyle } from 'react-native'

import { SelectAnchorProps } from './select_anchor'
import { IconProps } from '@components/icon'

export type SelectItem<T> = {
  name: string
  icon?: React.ReactElement<IconProps>
  id: T
  [key: string]: unknown
}

export interface SelectProps<T> {
  data: SelectItem<T>[]
  onSelect: React.Dispatch<React.SetStateAction<T>>
  selected?: T

  label?: string

  disabled?: boolean
  style?: ViewStyle
  placeholder?: string

  renderAnchor?: (params: SelectAnchorProps<T>) => React.ReactElement
}
