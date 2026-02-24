import { SelectItem } from '../types'

export interface SelectDropdownProps<T> {
  data: SelectItem<T>[]
  onSelect: React.Dispatch<React.SetStateAction<T | undefined>> | ((value: T) => void)
  selected?: T | undefined

  label?: string
  visible?: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}
