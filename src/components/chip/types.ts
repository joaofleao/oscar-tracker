import { PressableProps, View } from 'react-native'
import { AnimatedProps } from 'react-native-reanimated'

import { IconProps } from '@components/icon'
import { SemanticsType } from '@providers/theme'

export interface ChipProps extends PressableProps {
  image?: string
  title?: string
  icon?: React.ReactElement<IconProps>
  variant?: keyof SemanticsType
  onPress?: () => void
  entering?: AnimatedProps<View>['entering']
  exiting?: AnimatedProps<View>['exiting']
  layout?: AnimatedProps<View>['layout']
}
