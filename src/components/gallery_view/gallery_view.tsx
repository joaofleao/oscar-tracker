import React from 'react'
import { Dimensions, FlatList, ListRenderItem, View } from 'react-native'

import GalleryViewItem from './gallery_view_item'
import useStyles from './styles'
import { GalleryViewItemProps, GalleryViewProps } from './types'

const GalleryView = ({ data = [], header, footer, empty, contentContainerStyle, style, ...props }: GalleryViewProps): React.ReactElement => {
  const styles = useStyles()
  const { width } = Dimensions.get('window')

  const HORIZONTAL_PADDING = 16 + 16
  const GAP = 16
  const MIN_ITEM_WIDTH = 80
  const maxColumns = 6

  const columns = Math.max(1, Math.min(maxColumns, Math.floor((width - HORIZONTAL_PADDING + GAP) / (MIN_ITEM_WIDTH + GAP))))
  const itemWidth = (width - HORIZONTAL_PADDING - GAP * (columns - 1)) / columns

  const renderGalleryViewItem: ListRenderItem<GalleryViewItemProps> = ({ item, index }) => {
    const remainder = data.length % columns
    const needsPlaceholder = remainder !== 0 && index === data.length - 1
    const placeholders = needsPlaceholder ? columns - remainder : 0

    return (
      <React.Fragment key={index}>
        <GalleryViewItem
          {...item}
          style={{ width: itemWidth }}
        />
        {needsPlaceholder &&
          Array.from({ length: placeholders }).map((_, i) => (
            <View
              key={`placeholder-${i}`}
              style={{ width: itemWidth }}
            />
          ))}
      </React.Fragment>
    )
  }

  return (
    <FlatList
      data={data}
      renderItem={renderGalleryViewItem}
      numColumns={columns}
      columnWrapperStyle={styles.gallery}
      contentContainerStyle={[styles.list, contentContainerStyle]}
      style={[styles.root, style]}
      ListHeaderComponent={header}
      ListFooterComponent={footer}
      ListEmptyComponent={empty}
      {...props}
    />
  )
}

export default GalleryView
