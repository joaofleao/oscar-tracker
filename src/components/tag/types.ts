import { TouchableOpacityProps } from 'react-native'

import { IconProps } from '@components/icon'
import { SemanticsType } from '@providers/theme'

export interface TagProps extends TouchableOpacityProps {
  title?: React.ReactNode
  icon?: React.ReactElement<IconProps>
  onPress?: () => void
  variant?: keyof SemanticsType
}
