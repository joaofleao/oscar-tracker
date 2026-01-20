import { TouchableOpacityProps } from 'react-native'

export interface MediumCardProps extends TouchableOpacityProps {
  image?: string
  label?: string
  spoiler?: boolean
  watched?: boolean
  winner?: boolean
  index?: number
}
