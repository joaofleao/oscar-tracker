import { TouchableOpacityProps, View } from 'react-native'
import { AnimatedProps } from 'react-native-reanimated'

export interface MediumCardProps extends TouchableOpacityProps {
  image?: string
  label?: string
  spoiler?: boolean
  watched?: boolean
  winner?: boolean
  index?: number
  entering?: AnimatedProps<View>['entering']
  exiting?: AnimatedProps<View>['exiting']
}
