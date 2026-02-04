import { View, ViewProps } from 'react-native'
import { AnimatedProps } from 'react-native-reanimated'

export interface RowProps extends ViewProps {
  wrap?: boolean
  center?: boolean
  start?: boolean
  end?: boolean
  between?: boolean
  around?: boolean
  evenly?: boolean
  middle?: boolean
  entering?: AnimatedProps<View>['entering']
  exiting?: AnimatedProps<View>['exiting']
  layout?: AnimatedProps<View>['layout']
}
