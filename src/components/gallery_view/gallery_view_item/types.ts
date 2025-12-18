import { GestureResponderEvent, TouchableOpacityProps } from 'react-native'

export interface GalleryViewItemProps extends Omit<TouchableOpacityProps, 'onPress'> {
  _id: string
  posterPath: {
    pt_BR: string
    en_US: string
  }

  title: {
    pt_BR: string
    en_US: string
  }
  voteAverage?: number
  date?: string
  onPress?: (e: GestureResponderEvent, id?: string) => void
}
