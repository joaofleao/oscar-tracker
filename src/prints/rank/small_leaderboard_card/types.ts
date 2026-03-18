import { TouchableOpacityProps } from 'react-native'

import { SemanticsType } from '@providers/theme'

export interface SmallLeaderboardCardProps extends TouchableOpacityProps {
  image?: string
  label?: string
  sublabel?: string
  description?: string
  badge?: string
  points?: number
  pointsLabel?: string
  variant?: keyof SemanticsType
}
