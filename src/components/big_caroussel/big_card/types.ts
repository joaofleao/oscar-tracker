import { PressableProps } from 'react-native'
import { SharedValue } from 'react-native-reanimated'

export interface BigCardProps extends PressableProps {
  image?: string
  index: number
  scrollX?: SharedValue<number>
  watched?: boolean
  spoiler?: boolean
  winner?: boolean
}
