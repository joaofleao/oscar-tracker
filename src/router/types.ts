import { GenericId } from 'convex/values'

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

export type StackProps = {
  home: undefined
  movies: undefined
  categories: undefined

  auth:
    | {
        flow: 'email-verification' | 'details' | 'signIn' | 'signUp'
      }
    | undefined
  awards: undefined
  select_edition: undefined
  select_country: undefined
  password_recovery: { email: string | undefined }
  preferences: undefined
  profile: undefined
  search: undefined
  search_friends: undefined
  settings: undefined
  filter_movies: undefined
  filter_categories: undefined
  movie: { tmdbId: number }
  category: { categoryId: GenericId<'oscarCategories'> }
}

export type ScreenProps<T extends keyof StackProps> = NativeStackScreenProps<StackProps, T>
export type ScreenType<T extends keyof StackProps> = (props: ScreenProps<T>) => React.ReactElement

export type TabProps<T extends keyof StackProps> = BottomTabScreenProps<StackProps, T>
export type TabType<T extends keyof StackProps> = (props: TabProps<T>) => React.ReactElement
