import { SvgProps } from 'react-native-svg'

export interface IconProps extends SvgProps {
  size?: number
  orientation?: 'default' | 'up' | 'right' | 'down' | 'left'
}
