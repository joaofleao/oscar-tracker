import React, { useEffect } from 'react'
import { Dimensions, FlatList, ListRenderItem, NativeScrollEvent, NativeSyntheticEvent, View } from 'react-native'
import Animated, { runOnJS, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

import BigCard from './big_card'
import useStyles from './styles'
import { BigCarousselProps } from './types'
import Button from '@components/button'
import Typography from '@components/typography'

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const CARD_WIDTH = 200
const CARD_SPACING = 16

const BigCaroussel = ({ nominations = [], button, title }: BigCarousselProps): React.ReactElement => {
  const styles = useStyles()
  const scrollX = useSharedValue(0)
  const flatListRef = React.useRef<FlatList>(null)
  const sidePadding = (SCREEN_WIDTH - CARD_WIDTH) / 2
  const fadeOpacity = useSharedValue(1)

  const [activeTitle, setActiveTitle] = React.useState<string>()

  const fadeAnimatedStyle = useAnimatedStyle(() => ({
    opacity: fadeOpacity.value,
  }))

  useEffect(() => {
    setActiveTitle(nominations[0]?.title)
  }, [nominations])

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x
    },
  })

  const getItemLayout = (_: any, index: number): { length: number; offset: number; index: number } => ({
    length: CARD_WIDTH + CARD_SPACING,
    offset: (CARD_WIDTH + CARD_SPACING) * index,
    index,
  })

  const handleMomentumEnd = (event: NativeSyntheticEvent<NativeScrollEvent>): void => {
    const offsetX = event.nativeEvent.contentOffset.x
    const rawIndex = Math.round(offsetX / (CARD_WIDTH + CARD_SPACING))
    const clampedIndex = Math.max(0, Math.min(nominations.length - 1, rawIndex))
    const newTitle = nominations[clampedIndex]?.title

    if (newTitle !== activeTitle) {
      fadeOpacity.value = withTiming(0, { duration: 300 }, () => {
        runOnJS(setActiveTitle)(newTitle)
        fadeOpacity.value = withTiming(1, { duration: 300 })
      })
    }
  }

  const renderBestPictureCard: ListRenderItem<(typeof nominations)[0]> = ({ item, index }) => {
    return (
      <BigCard
        image={item.image}
        index={index}
        scrollX={scrollX}
      />
    )
  }

  return (
    <View style={{ height: Dimensions.get('window').height * 0.6 }}>
      <View style={{ gap: 40 }}>
        <Animated.FlatList
          ref={flatListRef}
          snapToInterval={CARD_WIDTH + CARD_SPACING}
          style={{ overflow: 'visible' }}
          decelerationRate="fast"
          contentContainerStyle={{
            gap: CARD_SPACING,
            paddingHorizontal: sidePadding,
          }}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={nominations}
          renderItem={renderBestPictureCard}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          getItemLayout={getItemLayout}
          onMomentumScrollEnd={handleMomentumEnd}
        />
        <View style={{ alignItems: 'center', gap: 16 }}>
          <Animated.View style={fadeAnimatedStyle}>
            <Typography
              display
              center
            >
              {activeTitle}
            </Typography>
          </Animated.View>
          <Typography
            body
            center
            style={{ paddingHorizontal: 20 }}
          >
            {title}
          </Typography>
          <Button
            small
            title={button.title}
            onPress={button.action}
          />
        </View>
      </View>
    </View>
  )
}

export default BigCaroussel
