import { TouchableOpacityProps, View } from 'react-native'
import { AnimatedProps } from 'react-native-reanimated'

import { SemanticsType } from '@providers/theme'

export interface LeaderboardCardProps extends TouchableOpacityProps {
  image?: string
  label?: string
  sublabel?: string
  description?: string
  badge?: string
  points?: number
  pointsLabel?: string
  variant?: keyof SemanticsType
  entering?: AnimatedProps<View>['entering']
  exiting?: AnimatedProps<View>['exiting']
  layout?: AnimatedProps<View>['layout']
}
