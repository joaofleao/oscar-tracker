import React from 'react'
import { FlatList, ListRenderItem, View } from 'react-native'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'

import MediumCard from './medium_card'
import useStyles from './styles'
import { MediumCarousselProps } from './types'
import Button from '@components/button'
import Row from '@components/row'
import Typography from '@components/typography'

const CARD_WIDTH = 200
const CARD_SPACING = 16

const MediumCaroussel = ({ nominations = [], button, title }: MediumCarousselProps): React.ReactElement => {
  const styles = useStyles()
  const scrollX = useSharedValue(0)
  const flatListRef = React.useRef<FlatList>(null)

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

  const renderBestPictureCard: ListRenderItem<(typeof nominations)[0]> = ({ item, index }) => {
    return (
      <MediumCard
        label={item.title}
        image={item.image}
        onPress={item.onPress}
        index={index}
      />
    )
  }

  return (
    <View style={{ gap: 16 }}>
      <Row
        style={{ paddingHorizontal: 20 }}
        between
      >
        <Typography
          style={{ flex: 1 }}
          numberOfLines={1}
        >
          {title}
        </Typography>
        <Button
          small
          title={button.title}
          onPress={button.action}
        />
      </Row>
      <Animated.FlatList
        ref={flatListRef}
        contentContainerStyle={{ gap: 20, paddingHorizontal: 20 }}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={nominations}
        renderItem={renderBestPictureCard}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        getItemLayout={getItemLayout}
      />
    </View>
  )
}

export default MediumCaroussel
