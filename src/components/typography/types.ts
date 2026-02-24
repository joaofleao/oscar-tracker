import { Text, TextProps } from 'react-native'
import { AnimatedProps } from 'react-native-reanimated'

export interface TypographyProps extends TextProps {
  display?: boolean
  onboardingAccent?: boolean
  onboarding?: boolean
  header?: boolean
  title?: boolean
  body?: boolean
  description?: boolean
  legend?: boolean
  flex?: boolean

  color?: string

  center?: boolean
  auto?: boolean
  left?: boolean
  right?: boolean
  justify?: boolean

  entering?: AnimatedProps<Text>['entering']
  exiting?: AnimatedProps<Text>['exiting']
  layout?: AnimatedProps<Text>['layout']
}
