import { TouchableOpacityProps, View } from 'react-native'
import { AnimatedProps } from 'react-native-reanimated'

import { IconProps } from '@components/icon'
import { SemanticsType } from '@providers/theme'

export interface ButtonProps extends TouchableOpacityProps {
  title: string
  icon?: React.ReactElement<IconProps>
  small?: boolean
  loading?: boolean
  variant?: keyof SemanticsType | 'ghost'
  tooltip?: string
  iconPosition?: 'leading' | 'trailing'
  layout?: AnimatedProps<View>['layout']
  entering?: AnimatedProps<View>['entering']
  exiting?: AnimatedProps<View>['exiting']
}
