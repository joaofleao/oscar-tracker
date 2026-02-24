import { GestureResponderEvent, PressableProps, View } from 'react-native'
import { AnimatedProps } from 'react-native-reanimated'

import { IconProps } from '@components/icon'

export interface ListItemSecondaryActionProps extends Omit<PressableProps, 'onPress'> {
  icon?: React.ReactElement<IconProps>
  selectedIcon?: React.ReactElement<IconProps>
  title?: string
  onPress?: (e: GestureResponderEvent, id: string) => void | undefined | Promise<void>
  loading?: boolean
  disabled?: boolean
  selected?: boolean
}

export interface ListItemPrimaryActionProps extends Omit<PressableProps, 'onPress' | 'onLongPress'> {
  onPress?: (e: GestureResponderEvent, id: string) => void
  onLongPress?: (e: GestureResponderEvent, id: string) => void
}

export interface ListItemProps {
  chip?: string
  layout?: AnimatedProps<View>['layout']
  id: string
  image?: string
  watched?: boolean
  spoiler?: boolean
  winner?: boolean

  title?: string
  description?: string
  extra?: string

  bottomArea?: React.ReactElement

  mainAction?: ListItemPrimaryActionProps
  secondaryActions?: ListItemSecondaryActionProps[]
}
