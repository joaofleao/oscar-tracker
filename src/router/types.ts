import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

export type StackProps = {
  home: undefined
  sign_in: undefined
  sign_up: undefined

  password_recovery: {
    email: string | undefined
  }

  preferences: undefined

  watch_list: undefined
  nominations: undefined

  profile: undefined
  settings: undefined

  movie_details: {
    movieId: string
  }

  category_details: {
    categoryId: string
  }
}

export type ScreenProps<T extends keyof StackProps> = NativeStackScreenProps<StackProps, T>
export type ScreenType<T extends keyof StackProps> = (props: ScreenProps<T>) => React.ReactElement

export type TabProps<T extends keyof StackProps> = BottomTabScreenProps<StackProps, T>
export type TabType<T extends keyof StackProps> = (props: TabProps<T>) => React.ReactElement
