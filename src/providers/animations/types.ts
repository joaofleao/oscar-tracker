import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native'

export interface AnimationsContextType {
  onScrollNominations: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
  onScrollMovies: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
  onScrollProfile: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
  nominationsAnimatedStyle: object
  moviesAnimatedStyle: object
  profileAnimatedStyle: object
  nominationsRef: React.RefObject<any>
  moviesRef: React.RefObject<any>
  profileRef: React.RefObject<any>
}
