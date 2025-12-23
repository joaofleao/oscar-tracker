import { GestureResponderEvent, TouchableOpacityProps } from 'react-native'

import { IconProps } from '@components/icon'

export type ListViewItemActionProps = {
  icon?: React.ReactElement<IconProps>
  title: string
  onPress: (movie: NonNullable<ListViewItemProps['_id']>) => void | Promise<void>
  loading?: (movie: NonNullable<ListViewItemProps['_id']>) => boolean
}

export interface ListViewItemProps extends Omit<TouchableOpacityProps, 'onPress'> {
  _id: string
  image?: string
  title?: string
  description?: string
  extra?: string
  bottomArea?: React.ReactElement
  topButton?: ListViewItemActionProps
  bottomButton?: ListViewItemActionProps
  onPress?: (e: GestureResponderEvent, id?: string) => void
  onLongPress?: (e: GestureResponderEvent, id?: string) => void
  spoiler?: boolean
  watched?: boolean
}
