import React from 'react'
import { Dimensions, FlatList, ListRenderItem, NativeScrollEvent, NativeSyntheticEvent, View } from 'react-native'
import Animated, { runOnJS, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'

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

  const [activeElement, setActiveElement] = React.useState(0)

  const fadeAnimatedStyle = useAnimatedStyle(() => ({
    opacity: fadeOpacity.value,
  }))

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

  const handleMomentumStart = (_: NativeSyntheticEvent<NativeScrollEvent>): void => {
    fadeOpacity.value = withTiming(0, { duration: 300 })
  }

  const handleMomentumEnd = (event: NativeSyntheticEvent<NativeScrollEvent>): void => {
    const offsetX = event.nativeEvent.contentOffset.x
    const rawIndex = Math.round(offsetX / (CARD_WIDTH + CARD_SPACING))
    const clampedIndex = Math.max(0, Math.min(nominations.length - 1, rawIndex))
    const newActiveElement = clampedIndex

    if (newActiveElement !== activeElement) {
      fadeOpacity.value = withTiming(0, { duration: 300 }, () => {
        runOnJS(setActiveElement)(newActiveElement)
        fadeOpacity.value = withTiming(1, { duration: 300 })
      })
    }
  }

  const renderBestPictureCard: ListRenderItem<(typeof nominations)[0]> = ({ item, index }) => {
    return (
      <BigCard
        delayPressIn={50}
        image={item.image}
        onPress={
          index === activeElement
            ? item.onPress
            : (): void => {
                setActiveElement(index)
                flatListRef.current?.scrollToIndex({ index, animated: true })
              }
        }
        index={index}
        scrollX={scrollX}
      />
    )
  }

  return (
    <>
      <Animated.View
        style={[
          {
            zIndex: -1,
            position: 'absolute',
            top: -150,
            width: '120%',
            aspectRatio: 2 / 3,
            alignSelf: 'center',
          },
          fadeAnimatedStyle,
        ]}
      >
        {nominations.map((el, index) => (
          <Animated.Image
            key={el.title}
            blurRadius={8}
            source={{ uri: `https://image.tmdb.org/t/p/w500${el.image}` }}
            style={[
              {
                position: 'absolute',
                width: '100%',
                height: '100%',
                opacity: index === activeElement ? 0.4 : 0,
              },
            ]}
          />
        ))}
        <LinearGradient
          colors={['rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 0.60)', 'rgba(0, 0, 0, 0.15)', 'rgba(0, 0, 0, 0)']}
          style={{ pointerEvents: 'none', position: 'absolute', top: 0, height: 300, width: '100%' }}
        />
        <LinearGradient
          colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.15)', 'rgba(0, 0, 0, 0.60)', 'rgba(0, 0, 0, 1)']}
          style={{ pointerEvents: 'none', position: 'absolute', bottom: 0, height: 300, width: '100%' }}
        />
      </Animated.View>
      <View style={{ minHeight: Dimensions.get('window').height * 0.65, margin: -20 }}>
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
            onMomentumScrollBegin={handleMomentumStart}
          />
          <Animated.View style={[{ alignItems: 'center', gap: 16, paddingHorizontal: 16 }, fadeAnimatedStyle]}>
            <Typography
              display
              center
            >
              {nominations[activeElement]?.title}
            </Typography>
            <View style={{ alignItems: 'center', gap: 8 }}>
              <Typography
                body
                center
              >
                {title}
              </Typography>
              <Button
                small
                title={button.title}
                onPress={button.action}
              />
            </View>
          </Animated.View>
        </View>
      </View>
    </>
  )
}

export default BigCaroussel
