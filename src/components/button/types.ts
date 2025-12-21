import { TouchableOpacityProps } from 'react-native'

import { IconProps } from '@components/icon'
import { SemanticsType } from '@providers/theme'

export interface ButtonProps extends TouchableOpacityProps {
  title: string
  icon?: React.ReactElement<IconProps>
  small?: boolean
  loading?: boolean
  variant?: keyof SemanticsType | 'ghost'
  tooltip?: string
}
