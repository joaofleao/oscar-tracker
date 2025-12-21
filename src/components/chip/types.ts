import { IconProps } from '@components/icon'

export interface ChipProps {
  title: React.ReactNode
  icon?: React.ReactElement<IconProps>
  spoiler?: boolean
  toggleSpoiler?: (type: string) => void
}
