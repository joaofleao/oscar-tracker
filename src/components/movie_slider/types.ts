import { FlatListProps } from 'react-native'

import { MovieSliderItemProps } from './movie_slider_item'

export interface MovieSliderProps extends Omit<FlatListProps<MovieSliderItemProps>, 'renderItem' | 'data'> {
  data: MovieSliderItemProps[]
}
