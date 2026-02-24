import { View } from 'react-native'
import { AnimatedProps } from 'react-native-reanimated'

export interface AccordionProps {
  header: {
    title: string
    trailingArea: React.ReactNode
  }
  content: React.ReactNode
  entering: AnimatedProps<View>['entering']
}
