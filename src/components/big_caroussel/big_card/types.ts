import { TouchableOpacityProps } from 'react-native'
import { SharedValue } from 'react-native-reanimated'

export interface BigCardProps extends TouchableOpacityProps {
  image?: string
  index: number
  scrollX?: SharedValue<number>
  watched?: boolean
  spoiler?: boolean
}
