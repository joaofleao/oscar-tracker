import { FlatListProps } from 'react-native'

export type CarousselProps<T> = {
  data?: T[]
  empty?: string
  group?: string
  render: (item: T, index: number) => React.ReactElement
} & Omit<FlatListProps<T>, 'renderItem' | 'data'>
