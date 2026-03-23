import { Text, TextProps } from 'react-native'
import { AnimatedProps } from 'react-native-reanimated'

export interface MegaTypographyProps extends TextProps {
  color?: string

  center?: boolean
  auto?: boolean
  left?: boolean
  right?: boolean
  justify?: boolean

  title?: boolean
  subtitle?: boolean
  description?: boolean

  big?: boolean
  medium?: boolean
  small?: boolean
  extrasmall?: boolean

  entering?: AnimatedProps<Text>['entering']
  exiting?: AnimatedProps<Text>['exiting']
  layout?: AnimatedProps<Text>['layout']
}
