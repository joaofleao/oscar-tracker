import { ViewStyle } from 'react-native'

import { SemanticsType } from '@providers/theme'

export interface ProgressBarProps {
  hideNumbers?: boolean
  thickness?: number
  value: number
  maxValue: number
  style?: ViewStyle
  variant?: keyof SemanticsType
  transparentBackground?: boolean
}
