import { FlatListProps } from 'react-native'

export type CarousselProps<T> = {
  item: React.ComponentType<T>
  data?: T[]
  empty?: string
} & Omit<FlatListProps<T>, 'renderItem' | 'data'>
