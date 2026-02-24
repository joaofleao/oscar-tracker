import { ViewStyle } from 'react-native'

import { IconProps } from '@components/tiny_icon/types'

export interface AvatarProps {
  image?: string
  name?: string
  style?: ViewStyle
  onPress?: () => void
  icon?: React.ReactElement<IconProps>
}
