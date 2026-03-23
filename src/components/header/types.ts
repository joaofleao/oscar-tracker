import { IconProps } from '@components/icon'

export interface HeaderProps {
  animation: object

  trailingButton?: {
    title?: string
    icon?: React.ReactElement<IconProps>
    onPress: () => void
  }
  leadingButton?: {
    title?: string
    icon?: React.ReactElement<IconProps>
    onPress: () => void
  }
}
