import React from 'react'
import { Dimensions, FlatList, ListRenderItem, NativeScrollEvent, NativeSyntheticEvent, View } from 'react-native'
import Animated, { FadeIn, FadeInDown, FadeOut, FadeOutUp, runOnJS, useAnimatedScrollHandler, useSharedValue, withTiming } from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'

import BigCard from './big_card'
import useStyles from './styles'
import { BigCarousselProps } from './types'
import Button from '@components/button'
import Chip from '@components/chip'
import Column from '@components/column'
import Row from '@components/row'
import Typography from '@components/typography'
import { useTheme } from '@providers/theme'

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const { height: SCREEN_HEIGHT } = Dimensions.get('window')
const CARD_WIDTH = 200
const CARD_SPACING = 16

const BigCaroussel = ({ nominations = [], button, extra, title, chip }: BigCarousselProps): React.ReactElement => {
  const scrollX = useSharedValue(0)
  const flatListRef = React.useRef<FlatList>(null)
  const sidePadding = (SCREEN_WIDTH - CARD_WIDTH) / 2
  const fadeOpacity = useSharedValue(1)
  const { semantics } = useTheme()
  const styles = useStyles({
    sidePadding,
    height: SCREEN_HEIGHT * 0.65,
    cardSpacing: CARD_SPACING,
  })

  const [activeElement, setActiveElement] = React.useState(0)

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
      runOnJS(setActiveElement)(newActiveElement)
      fadeOpacity.value = withTiming(1, { duration: 300 })
    }
  }

  const renderBestPictureCard: ListRenderItem<(typeof nominations)[0]> = ({ item, index }) => {
    return (
      <BigCard
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
        spoiler={item.spoiler}
        watched={item.watched}
        winner={item.winner}
      />
    )
  }

  return (
    <>
      <View style={[styles.backgroundContainer]}>
        <Animated.View
          key={activeElement}
          entering={FadeIn}
          exiting={FadeOut}
          style={[styles.backgroundAnimated]}
        >
          {nominations.map((el, index) => (
            <Animated.Image
              key={el.title}
              blurRadius={8}
              source={{ uri: `https://image.tmdb.org/t/p/w200${el.image}` }}
              style={[styles.backgroundImage, index === activeElement ? styles.backgroundImageActive : styles.backgroundImageInactive]}
            />
          ))}
        </Animated.View>
        <LinearGradient
          colors={semantics.background.base.gradient as any}
          style={styles.gradientTop}
        />
        <LinearGradient
          colors={semantics.background.base.gradient.toReversed() as any}
          style={styles.gradientBottom}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.contentWrapper}>
          <Animated.FlatList
            ref={flatListRef}
            snapToInterval={CARD_WIDTH + CARD_SPACING}
            style={styles.list}
            decelerationRate="fast"
            contentContainerStyle={styles.listContent}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={nominations}
            renderItem={renderBestPictureCard}
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            getItemLayout={getItemLayout}
            onMomentumScrollEnd={handleMomentumEnd}
            onScrollBeginDrag={handleMomentumStart}
          />

          <Animated.View
            key={nominations[activeElement]?.title}
            style={[styles.infoContainer]}
            entering={FadeInDown.delay(200)}
            exiting={FadeOutUp}
          >
            <Typography
              display
              center
            >
              {nominations[activeElement]?.title}
            </Typography>
            <View style={styles.infoTextContainer}>
              {nominations[activeElement].winner && (
                <Typography
                  color={semantics.brand.foreground.default}
                  center
                >
                  {extra}
                </Typography>
              )}
              <Row middle>
                <Typography
                  body
                  center
                >
                  {title}
                </Typography>
                {chip && (
                  <Chip
                    title={chip.title}
                    variant={chip.variant}
                  />
                )}
              </Row>

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
