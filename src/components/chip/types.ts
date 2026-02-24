import { View } from 'react-native'
import { AnimatedProps } from 'react-native-reanimated'

import { IconProps } from '@components/icon'
import { SemanticsType } from '@providers/theme'

export interface ChipProps {
  title?: React.ReactNode
  icon?: React.ReactElement<IconProps>
  spoiler?: boolean
  toggleSpoiler?: (type: string) => void
  variant?: keyof SemanticsType
  entering?: AnimatedProps<View>['entering']
  exiting?: AnimatedProps<View>['exiting']
}
