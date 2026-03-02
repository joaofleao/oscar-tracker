import { IconProps } from '@components/icon'

export interface HeaderProps {
  animation: object

  trailingButton?: {
    icon: React.ReactElement<IconProps>
    onPress: () => void
  }
  leadingButton?: {
    icon: React.ReactElement<IconProps>
    onPress: () => void
  }
}
