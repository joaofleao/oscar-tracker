import { FlatListProps } from 'react-native'

import type { ListViewItemProps } from './list_view_item'

interface ListViewProps extends Omit<FlatListProps<ListViewItemProps>, 'renderItem' | 'ListEmptyComponent' | 'ListHeaderComponent' | 'ListFooterComponent' | 'data'>, Pick<ListViewItemProps, 'topButton' | 'bottomButton' | 'bottomArea'> {
  data: NonNullable<FlatListProps<ListViewItemProps>['data']>
  empty?: FlatListProps<ListViewItemProps>['ListEmptyComponent']
  footer?: FlatListProps<ListViewItemProps>['ListFooterComponent']
  header?: FlatListProps<ListViewItemProps>['ListHeaderComponent']
  responsive?: boolean
}

export type { ListViewItemProps, ListViewProps }
