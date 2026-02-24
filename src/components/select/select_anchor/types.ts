import { SelectItem } from '../types'

export interface SelectAnchorProps<T> {
  selectedOption?: SelectItem<T>
  placeholder?: string
  disabled?: boolean

  label?: string
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}
