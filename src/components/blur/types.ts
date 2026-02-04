import { ViewProps } from 'react-native'
import { AnimatedProps } from 'react-native-reanimated'
import { View } from 'react-native-reanimated/lib/typescript/Animated'

import { SemanticsType } from '@providers/theme'

export interface BlurProps extends ViewProps {
  animation?: object
  variant?: keyof SemanticsType
  entering?: AnimatedProps<View>['entering']
  exiting?: AnimatedProps<View>['exiting']
  layout?: AnimatedProps<View>['layout']
}
