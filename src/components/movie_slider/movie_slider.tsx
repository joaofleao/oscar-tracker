import React from 'react'
import { FlatListProps, ListRenderItem, Platform, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { createAnimatedComponent, FadeIn, FadeInDown, FadeOut, FadeOutDown } from 'react-native-reanimated'
import * as Haptics from 'expo-haptics'

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
      key={`${item.title}-${index}`}
      exiting={FadeOutDown.delay(100 * index)}
      entering={FadeInDown.delay(300 + 100 * index)}
      height={HEIGHT}
      title={item.title}
      description={item.description}
      image={item.image}
      bottomArea={item.bottomArea}
      watched={item.watched}
      spoiler={item.spoiler}
      delayPressIn={50}
      isActive={Platform.OS === 'ios' ? index === activeElement : true}
      onPress={item.onPress}
    />
  )

  const onScroll: FlatListProps<Element>['onScroll'] = async (event) => {
    const offsetY = event.nativeEvent.contentOffset.y
    const rawIndex = Math.round(offsetY / SNAP)
    const clampedIndex = Math.max(0, Math.min(data.length - 1, rawIndex))
    const newActiveElement = clampedIndex
    if (newActiveElement !== activeElement) {
      setActiveElement(newActiveElement)

      Platform.OS === 'ios' && Haptics.selectionAsync().catch(() => {})
    }
    onScrollProp?.(event)
  }

  const content = (
    <FlatList
      overScrollMode={Platform.OS !== 'ios' ? 'never' : undefined}
      removeClippedSubviews={Platform.OS !== 'ios'}
      showsVerticalScrollIndicator={Platform.OS !== 'ios'}
      style={styles.list}
      contentContainerStyle={styles.listContent}
      initialNumToRender={60}
      snapToInterval={Platform.OS === 'ios' ? SNAP : undefined}
      renderItem={renderItem}
      data={data}
      onScroll={Platform.OS === 'ios' ? onScroll : onScrollProp}
      {...props}
    />
  )
  if (Platform.OS === 'android') return content

  return (
    <View style={styles.root}>
      {content}

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
