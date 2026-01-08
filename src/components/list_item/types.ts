import { GestureResponderEvent, PressableProps } from 'react-native'

import { IconProps } from '@components/icon'

export interface ListItemSecondaryActionProps extends Omit<PressableProps, 'onPress'> {
  icon?: React.ReactElement<IconProps>
  title?: string
  onPress?: (e: GestureResponderEvent, id: string) => void | undefined
  loading?: boolean
  disabled?: boolean
  filled?: boolean
}

export interface ListItemPrimaryActionProps extends Omit<PressableProps, 'onPress' | 'onLongPress'> {
  onPress?: (e: GestureResponderEvent, id: string) => void
  onLongPress?: (e: GestureResponderEvent, id: string) => void
}

export interface ListItemProps {
  id: string
  image?: string
  watched?: boolean
  spoiler?: boolean

  title?: string
  description?: string
  extra?: string

  bottomArea?: React.ReactElement

  mainAction?: ListItemPrimaryActionProps
  secondaryActions?: ListItemSecondaryActionProps[]
}
