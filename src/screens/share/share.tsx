import { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, FlatList, Image, NativeScrollEvent, NativeSyntheticEvent, View } from 'react-native'
import Animated, { FadeIn, FadeInDown, FadeOut, FadeOutUp } from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'
import * as Sharing from 'expo-sharing'
import { useTranslation } from 'react-i18next'

import Button from '@components/button'
import { IconShare } from '@components/icon'
import Row from '@components/row'
import Sheet from '@components/sheet'
import Rank from '@prints/rank'
import Stats from '@prints/stats/stats'
import WatchedPosters from '@prints/watched_poster'
import { useEdition } from '@providers/edition'
import { useTheme } from '@providers/theme'
import { ScreenType } from '@router/types'
import useStyles from '@screens/share/styles'

const AnimatedActivityIndicator = Animated.createAnimatedComponent(ActivityIndicator)
const shareRenderers = [
  { key: 'watchedPosters', Component: WatchedPosters },
  { key: 'stats', Component: Stats },
  { key: 'rank', Component: Rank },
] as const

type ShareRendererKey = (typeof shareRenderers)[number]['key']

const Share: ScreenType<'share'> = () => {
  const styles = useStyles()
  const [images, setImages] = useState<Record<ShareRendererKey, string | undefined>>({
    watchedPosters: undefined,
    stats: undefined,
    rank: undefined,
  })
  const [loadedImages, setLoadedImages] = useState<Record<ShareRendererKey, boolean>>({
    watchedPosters: false,
    stats: false,
    rank: false,
  })
  const { t } = useTranslation()
  const { edition } = useEdition()
  const { semantics } = useTheme()

  const { width } = Dimensions.get('window')

  const [currentIndex, setCurrentIndex] = useState(0)
  const availableShareRenderers = edition?.finished ? shareRenderers : shareRenderers.slice(0, 1)

  useEffect(() => {
    if (currentIndex < availableShareRenderers.length) return
    setCurrentIndex(0)
  }, [availableShareRenderers.length, currentIndex])

  const handleShare = useCallback(() => {
    const currentKey = availableShareRenderers[currentIndex]?.key
    const currentImage = currentKey ? images[currentKey] : undefined
    if (currentImage) {
      Sharing.shareAsync(currentImage, { mimeType: 'image/png', UTI: 'public.png' })
    }
  }, [availableShareRenderers, currentIndex, images])

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetX = event.nativeEvent.contentOffset.x
      const newIndex = Math.round(offsetX / (width - 60))
      setCurrentIndex(newIndex)
    },
    [width],
  )

  const handleCaptureImage = useCallback((key: ShareRendererKey, image: string): void => {
    setImages((previous) => ({
      ...previous,
      [key]: image,
    }))
    setLoadedImages((previous) => ({
      ...previous,
      [key]: false,
    }))
  }, [])

  return (
    <>
      <Sheet
        footer={
          <Row
            between
            entering={FadeInDown.delay(300)}
            exiting={FadeOutUp.delay(300)}
          >
            <Button
              onPress={handleShare}
              icon={<IconShare />}
              variant="brand"
              title={t('share_status:share')}
            />
          </Row>
        }
      >
        <FlatList
          onScroll={handleScroll}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={width - 60}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          decelerationRate={'fast'}
          data={availableShareRenderers}
          keyExtractor={(item) => item.key}
          ListHeaderComponent={
            <>
              {availableShareRenderers.map(({ key, Component }) => (
                <Component
                  key={`renderer-${key}`}
                  setImage={(image) => handleCaptureImage(key, image)}
                />
              ))}
            </>
          }
          renderItem={({ item }) => {
            const { key } = item
            const image = images[key]
            const isLoaded = loadedImages[key]

            return (
              <View
                key={key}
                style={styles.page}
              >
                <LinearGradient
                  style={styles.previewGradientContainer}
                  colors={semantics.background.stroke.gradient as any}
                />
                <View style={styles.previewImageContainer}>
                  {image !== undefined && (
                    <Image
                      onLoad={() => setLoadedImages((previous) => ({ ...previous, [key]: true }))}
                      source={{ uri: image }}
                      style={[styles.previewImage, !isLoaded && styles.previewImageHidden]}
                    />
                  )}

                  {!isLoaded && (
                    <Animated.View
                      style={styles.previewLoadingContainer}
                      entering={FadeIn}
                      exiting={FadeOut}
                    >
                      <AnimatedActivityIndicator color={semantics.container.foreground.default} />
                    </Animated.View>
                  )}
                </View>
              </View>
            )
          }}
        />
      </Sheet>
    </>
  )
}

export default Share
