import { FlatList, NativeScrollEvent, NativeSyntheticEvent } from 'react-native'

export interface AnimationsContextType {
  onScrollNominations: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
  onScrollMovies: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
  onScrollProfile: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
  nominationsAnimatedStyle: object
  moviesAnimatedStyle: object
  profileAnimatedStyle: object
  nominationsRef: React.RefObject<FlatList | null>
  moviesRef: React.RefObject<FlatList | null>
  profileRef: React.RefObject<FlatList | null>
}
