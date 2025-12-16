import { GestureResponderEvent, TouchableOpacityProps } from 'react-native'
import { GenericId } from 'convex/values'

import { IconProps } from '@components/icon'

export type ListViewItemActionProps = {
  icon?: React.ReactElement<IconProps>
  title: string
  onPress: (movie: NonNullable<ListViewItemProps['_id']>) => void | Promise<void>
  loading?: (movie: NonNullable<ListViewItemProps['_id']>) => boolean
}

export interface ListViewItemProps extends Omit<TouchableOpacityProps, 'onPress'> {
  _id: GenericId<'movies'>
  posterPath: {
    pt_BR: string
    en_US: string
  }
  title: {
    pt_BR: string
    en_US: string
  }
  description?: string
  // voteAverage?: number
  // date: string
  topButton?: ListViewItemActionProps
  bottomButton?: ListViewItemActionProps
  onPress?: (e: GestureResponderEvent, id?: string) => void
  onLongPress?: (e: GestureResponderEvent, id?: string) => void
}
