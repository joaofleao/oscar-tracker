import { TouchableOpacityProps } from 'react-native'

import { IconProps } from '@components/icon'

export interface NavBarItemProps extends TouchableOpacityProps {
  icon: React.ReactElement<IconProps>
  label?: string
  selected?: boolean
  first?: boolean
  last?: boolean
}
