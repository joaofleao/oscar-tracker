import { TouchableOpacityProps } from 'react-native'

import { IconProps } from '@components/icon/'

export interface BarItemProps extends TouchableOpacityProps {
  children: string
  icon?: React.ReactElement<IconProps>
}
