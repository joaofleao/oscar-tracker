import { TouchableOpacityProps } from 'react-native'

import { IconProps } from '@components/icon'

export interface TagProps extends TouchableOpacityProps {
  title: React.ReactNode
  icon?: React.ReactElement<IconProps>
  onPress?: () => void
}
