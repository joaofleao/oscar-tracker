import { TouchableOpacityProps } from 'react-native'

import { IconProps } from '@components/icon'
import { SemanticsType } from '@providers/theme'

export interface IconButtonProps extends TouchableOpacityProps {
  icon?: React.ReactElement<IconProps>
  variant?: keyof SemanticsType
  placeholder?: boolean
}
