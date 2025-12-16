import { IconProps } from '@components/icon'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { StackProps } from '@router/types'

export type TabType = {
  id: keyof StackProps
  label: string
  icon: React.ReactElement<IconProps>
}
export interface NavBarProps extends BottomTabBarProps {
  tabs: TabType[]
}
