import { View, ViewProps } from 'react-native'
import { AnimatedProps } from 'react-native-reanimated'

export interface ColumnProps extends ViewProps {
  wrap?: boolean
  center?: boolean
  start?: boolean
  end?: boolean
  between?: boolean
  around?: boolean
  evenly?: boolean
  middle?: boolean
  leading?: boolean
  trailing?: boolean
  stretch?: boolean
  baseline?: boolean
  entering?: AnimatedProps<View>['entering']
  exiting?: AnimatedProps<View>['exiting']
}
