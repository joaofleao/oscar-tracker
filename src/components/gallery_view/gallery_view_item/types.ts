import { GestureResponderEvent, TouchableOpacityProps } from 'react-native'

export interface GalleryViewItemProps extends Omit<TouchableOpacityProps, 'onPress'> {
  _id: string
  posterPath: string
  title: string
  voteAverage?: number
  date?: string
  onPress?: (e: GestureResponderEvent, id?: string) => void
}
