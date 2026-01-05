import { FlatList, FlatListProps } from 'react-native'

import { MovieSliderItemProps } from './movie_slider_item'

export interface MovieSliderProps extends Omit<FlatListProps<MovieSliderItemProps>, 'renderItem' | 'data' | 'ref'> {
  data: MovieSliderItemProps[]
  ref: React.RefObject<FlatList | null>
}
