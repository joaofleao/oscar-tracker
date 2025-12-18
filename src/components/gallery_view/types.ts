import { FlatListProps } from 'react-native'

import type { GalleryViewItemProps } from './gallery_view_item'

interface GalleryViewProps extends Omit<FlatListProps<GalleryViewItemProps>, 'renderItem' | 'ListEmptyComponent' | 'ListHeaderComponent' | 'ListFooterComponent' | 'data'> {
  data: NonNullable<FlatListProps<GalleryViewItemProps>['data']>
  empty?: FlatListProps<GalleryViewItemProps>['ListEmptyComponent']
  footer?: FlatListProps<GalleryViewItemProps>['ListFooterComponent']
  header?: FlatListProps<GalleryViewItemProps>['ListHeaderComponent']
}

export type { GalleryViewItemProps, GalleryViewProps }
