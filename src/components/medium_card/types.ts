import { TouchableOpacityProps } from 'react-native'

export interface MediumCardProps extends TouchableOpacityProps {
  image?: string
  label?: string
  index?: number
}
