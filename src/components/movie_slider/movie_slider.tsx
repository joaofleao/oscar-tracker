import React from 'react'
import { FlatListProps, ListRenderItem, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { createAnimatedComponent, FadeIn, FadeOut } from 'react-native-reanimated'

import MovieSliderItem, { MovieSliderItemProps } from './movie_slider_item'
import useStyles from './styles'
import { MovieSliderProps } from './types'
import { TinyChevron } from '@components/tiny_icon'

const HEIGHT = 96
const SPACING = 20
const SNAP = HEIGHT + SPACING

const AnimatedTinyChevron = createAnimatedComponent(TinyChevron)

const MovieSlider = ({ data = [], onScroll: onScrollProp, ...props }: MovieSliderProps): React.ReactElement => {
  const [activeElement, setActiveElement] = React.useState(0)
  const styles = useStyles({ height: HEIGHT, spacing: SPACING })
  const renderItem: ListRenderItem<MovieSliderItemProps> = ({ item, index }) => (
    <MovieSliderItem
      height={HEIGHT}
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
        overScrollMode="never"
        removeClippedSubviews={false}
        showsVerticalScrollIndicator={false}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        initialNumToRender={60}
        snapToInterval={SNAP}
        renderItem={renderItem}
        data={data}
        onScroll={onScroll}
        {...props}
      />
      {data.length > 0 && !props.refreshing && (
        <AnimatedTinyChevron
          entering={FadeIn}
          exiting={FadeOut}
          orientation="right"
          style={styles.chevron}
        />
      )}
    </View>
  )
}

export default MovieSlider
