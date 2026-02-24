import { View } from 'react-native'
import { AnimatedProps } from 'react-native-reanimated'

import { IconProps } from '@components/icon'
import { SemanticsType } from '@providers/theme'

export interface BadgeProps {
  title?: string
  icon?: React.ReactElement<IconProps>
  spoiler?: boolean
  toggleSpoiler?: (type: string) => void
  variant?: keyof SemanticsType
  onPress?: () => void
  entering?: AnimatedProps<View>['entering']
  exiting?: AnimatedProps<View>['exiting']
}
