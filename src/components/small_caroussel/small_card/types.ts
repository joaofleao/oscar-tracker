import { TouchableOpacityProps } from 'react-native'

export interface SmallCardProps extends TouchableOpacityProps {
  image?: string
  label?: string
  description?: string
  index?: number
}
