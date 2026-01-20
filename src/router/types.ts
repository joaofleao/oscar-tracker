import { GenericId } from 'convex/values'

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

export type StackProps = {
  home: undefined
  movies: undefined
  nominations: undefined

  auth: undefined
  awards: undefined
  select_edition: undefined
  password_recovery: { email: string | undefined }
  preferences: undefined
  profile: undefined
  search: undefined
  settings: undefined
  movie: { tmdbId: number }
  category: { categoryId: GenericId<'oscarCategories'> }
}

export type ScreenProps<T extends keyof StackProps> = NativeStackScreenProps<StackProps, T>
export type ScreenType<T extends keyof StackProps> = (props: ScreenProps<T>) => React.ReactElement

export type TabProps<T extends keyof StackProps> = BottomTabScreenProps<StackProps, T>
export type TabType<T extends keyof StackProps> = (props: TabProps<T>) => React.ReactElement
