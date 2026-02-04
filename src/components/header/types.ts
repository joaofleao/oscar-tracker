import { IconProps } from '@components/icon'

export interface HeaderProps {
  animation: object
  button: {
    icon: React.ReactElement<IconProps>
    onPress: () => void
  }
}
