import { FlatList, ScrollView } from 'react-native-gesture-handler'

export interface SheetProps {
  children: React.ReactElement<any, typeof FlatList> | React.ReactElement<any, typeof ScrollView>
  header?: React.ReactNode
  footer?: React.ReactNode
  reordable?: boolean
  headerWithTop?: boolean
  fullscreen?: boolean
}
