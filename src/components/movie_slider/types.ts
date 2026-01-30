import { FlatListProps } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

import { MovieSliderItemProps } from './movie_slider_item'

export interface MovieSliderProps extends Omit<FlatListProps<MovieSliderItemProps>, 'renderItem' | 'data' | 'ref'> {
  data: MovieSliderItemProps[]
  ref?: React.RefObject<FlatList | null>
}
