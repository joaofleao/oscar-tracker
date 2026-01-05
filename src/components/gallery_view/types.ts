import { FlatList, FlatListProps } from 'react-native'

import type { GalleryViewItemProps } from './gallery_view_item'

interface GalleryViewProps extends Omit<FlatListProps<GalleryViewItemProps>, 'renderItem' | 'ListEmptyComponent' | 'ListHeaderComponent' | 'ListFooterComponent' | 'data' | 'ref'> {
  data: NonNullable<FlatListProps<GalleryViewItemProps>['data']>
  empty?: FlatListProps<GalleryViewItemProps>['ListEmptyComponent']
  footer?: FlatListProps<GalleryViewItemProps>['ListFooterComponent']
  header?: FlatListProps<GalleryViewItemProps>['ListHeaderComponent']
  ref: React.RefObject<FlatList | null>
}

export type { GalleryViewItemProps, GalleryViewProps }
