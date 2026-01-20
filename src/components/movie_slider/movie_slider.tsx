import React from 'react'
import { FlatList, FlatListProps, ListRenderItem, View } from 'react-native'

import MovieSliderItem, { MovieSliderItemProps } from './movie_slider_item'
import useStyles from './styles'
import { MovieSliderProps } from './types'
import { TinyChevron } from '@components/tiny_icon'

const ITEM_HEIGHT = 56
const ITEM_SPACING = 28
const SNAP = ITEM_HEIGHT + ITEM_SPACING

const MovieSlider = ({ data = [], onScroll: onScrollProp, ...props }: MovieSliderProps): React.ReactElement => {
  const [activeElement, setActiveElement] = React.useState(0)
  const styles = useStyles({ height: ITEM_HEIGHT, spacing: ITEM_SPACING })

  const renderItem: ListRenderItem<MovieSliderItemProps> = ({ item, index }) => (
    <MovieSliderItem
      title={item.title}
      description={item.description}
      image={item.image}
      bottomArea={item.bottomArea}
      watched={item.watched}
      spoiler={item.spoiler}
      delayPressIn={50}
      isActive={index === activeElement}
      onPress={item.onPress}
    />
  )

  const onScroll: FlatListProps<Element>['onScroll'] = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y
    const rawIndex = Math.round(offsetY / SNAP)
    const clampedIndex = Math.max(0, Math.min(data.length - 1, rawIndex))
    const newActiveElement = clampedIndex
    if (newActiveElement !== activeElement) setActiveElement(newActiveElement)
    onScrollProp?.(event)
  }

  return (
    <View style={styles.root}>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={[styles.list, activeElement === data.length - 1 && styles.listActive]}
        contentContainerStyle={styles.listContent}
        initialNumToRender={40}
        scrollEventThrottle={0}
        snapToInterval={SNAP}
        decelerationRate="fast"
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        data={data}
        onScroll={onScroll}
        {...props}
      />
      {data.length > 0 && (
        <TinyChevron
          orientation="right"
          style={styles.chevron}
        />
      )}
    </View>
  )
}

export default MovieSlider
