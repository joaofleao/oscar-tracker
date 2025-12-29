import React from 'react'
import { Dimensions, FlatList, ListRenderItem, View } from 'react-native'

import ListViewItem from './list_view_item'
import useStyles from './styles'
import { ListViewItemProps, ListViewProps } from './types'

const ListView = ({
  data = [],
  header,
  footer,
  empty,
  contentContainerStyle,
  topButton,
  bottomButton,
  bottomArea,
  style,
  responsive = false,

  ...props
}: ListViewProps): React.ReactElement => {
  const { width } = Dimensions.get('window')

  const HORIZONTAL_PADDING = 16 + 16
  const GAP = 8
  const MIN_ITEM_WIDTH = 220
  const maxColumns = 2

  const columns = responsive ? Math.max(1, Math.min(maxColumns, Math.floor((width - HORIZONTAL_PADDING + GAP) / (MIN_ITEM_WIDTH + GAP)))) : 1

  const itemWidth = (width - HORIZONTAL_PADDING - GAP * (columns - 1)) / columns
  const styles = useStyles({ width: itemWidth })

  const renderListViewItem: ListRenderItem<ListViewItemProps> = ({ item, index }) => {
    const remainder = data.length % columns
    const needsPlaceholder = remainder !== 0 && index === data.length - 1
    const placeholders = needsPlaceholder ? columns - remainder : 0

    return (
      <React.Fragment key={index}>
        <ListViewItem
          style={styles.list}
          {...item}
          key={index}
          topButton={topButton}
          bottomButton={bottomButton}
          bottomArea={item.bottomArea}
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
      numColumns={columns}
      data={data}
      renderItem={renderListViewItem}
      style={[styles.root, style]}
      contentContainerStyle={[styles.list, contentContainerStyle]}
      columnWrapperStyle={columns > 1 ? styles.gallery : undefined}
      ListHeaderComponent={header}
      ListFooterComponent={footer}
      ListEmptyComponent={empty}
      {...props}
    />
  )
}

export default ListView
