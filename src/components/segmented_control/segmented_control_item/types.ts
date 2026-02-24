import { TouchableOpacityProps } from 'react-native'

export interface SegmentedControlItemProps extends TouchableOpacityProps {
  children: string
  selected?: boolean
}
