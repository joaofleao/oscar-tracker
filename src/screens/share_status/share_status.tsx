import { useCallback, useState } from 'react'
import { Dimensions, PixelRatio, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { FadeInDown, FadeOutUp } from 'react-native-reanimated'
import ViewShot from 'react-native-view-shot'
import * as Sharing from 'expo-sharing'
import { useTranslation } from 'react-i18next'

import Button from '@components/button'
import Column from '@components/column'
import { IconCheckCircle, IconCircle, IconLanguages, IconShare } from '@components/icon'
import Row from '@components/row'
import Sheet from '@components/sheet'
import TinyAvatar from '@components/tiny_avatar'
import Typography from '@components/typography'
import { useEdition } from '@providers/edition'
import useTheme from '@providers/theme/useTheme'
import { useUser } from '@providers/user'
import { ScreenType } from '@router/types'
import { ordinal } from '@utils/ordinals'

const ShareStatus: ScreenType<'share_status'> = ({ navigation }) => {
  const { t } = useTranslation()
  const [image, setImage] = useState<string | null>(null)
  const { i18n } = useTranslation()
  const { semantics } = useTheme()

  const onCapture = useCallback((uri: string) => {
    setImage(uri)
  }, [])

  const handleSwitchLanguage = (): void => {
    setLanguage(i18n.language === 'en_US' ? 'pt_BR' : 'en_US')
    // refreshEditionData()
  }

  const handleShare = useCallback(() => {
    if (image) {
      Sharing.shareAsync(image, { mimeType: 'image/png' })
    }
  }, [image])

  const { user, setLanguage } = useUser()
  const { movies, edition } = useEdition()

  const totalTitleChars = movies.reduce((sum, movie) => sum + movie.title.length, 0)

  let cumulativeChars = 0
  let bestSplitIndex = 0
  let smallestDiff = Number.POSITIVE_INFINITY

  for (let index = 0; index < movies.length; index += 1) {
    cumulativeChars += movies[index].title.length

    const diff = Math.abs(totalTitleChars - cumulativeChars * 2)

    if (diff < smallestDiff) {
      smallestDiff = diff
      bestSplitIndex = index + 1
    }
  }

  const splitIndex = movies.length > 1 ? Math.min(Math.max(bestSplitIndex, 1), movies.length - 1) : movies.length

  const firstColumnMovies = movies.slice(0, splitIndex)
  const secondColumnMovies = movies.slice(splitIndex)

  const targetPixelCount = 1080 // If you want full HD pictures
  const pixelRatio = PixelRatio.get() // The pixel ratio of the device

  const pixels = targetPixelCount / pixelRatio

  const width = Dimensions.get('window').width
  const card = (
    <View style={{ borderColor: semantics.container.stroke.default, borderWidth: 2, borderRadius: 20, overflow: 'hidden' }}>
      <ViewShot
        onCapture={onCapture}
        captureMode="mount"
        options={{ quality: 1, width: pixels * 2 }}
        style={{
          width: width - 80,
          aspectRatio: 1080 / 1920,
          paddingHorizontal: 20,
          paddingBottom: 40,
          paddingTop: 80,
          gap: 20,
          backgroundColor: semantics.container.base.default,
          justifyContent: 'space-between',
        }}
      >
        <Row>
          <View style={{ gap: 4, flex: 1 }}>
            {firstColumnMovies.map((movie) => (
              <Row
                key={movie._id}
                // middle
              >
                {movie.watched && (
                  <IconCheckCircle
                    color={semantics.accent.base.default}
                    filled
                    size={10}
                  />
                )}
                {!movie.watched && (
                  <IconCircle
                    size={10}
                    color={semantics.container.stroke.default}
                  />
                )}
                <Typography
                  body
                  style={{ fontSize: 8, lineHeight: 10, flex: 1 }}
                >
                  {movie.title}
                </Typography>
              </Row>
            ))}
          </View>
          <View style={{ gap: 4, flex: 1 }}>
            {secondColumnMovies.map((movie) => (
              <Row key={movie._id}>
                {movie.watched && (
                  <IconCheckCircle
                    filled
                    size={10}
                    color={semantics.accent.base.default}
                  />
                )}
                {!movie.watched && (
                  <IconCircle
                    size={10}
                    color={semantics.container.stroke.default}
                  />
                )}
                <Typography
                  body
                  style={{ fontSize: 8, lineHeight: 10, flex: 1 }}
                >
                  {movie.title}
                </Typography>
              </Row>
            ))}
          </View>
        </Row>

        <Column middle>
          <Typography legend>
            {movies.filter((movie) => movie.watched).length} / {movies.length}
          </Typography>
        </Column>

        <Row
          between
          trailing
        >
          <View>
            <Typography
              legend
              color={semantics.background.foreground.light}
            >
              {`${ordinal(edition?.number ?? 0, i18n.language, false)} ${t('home:edition')} - ${edition?.year}`}
            </Typography>
            <Typography>
              <Typography style={{ color: semantics.accent.base.default }}>Oscar </Typography>TRACKER
            </Typography>
          </View>

          <Row
            middle
            end
          >
            <Typography body>@{user?.username}</Typography>
            <TinyAvatar image={user?.imageURL} />
          </Row>
        </Row>
      </ViewShot>
    </View>
  )
  return (
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
          <Button
            onPress={handleSwitchLanguage}
            icon={<IconLanguages />}
          />
        </Row>
      }
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={width - 60}
        contentContainerStyle={{ gap: 20, paddingHorizontal: 40 }}
        decelerationRate={'fast'}
      >
        {card}
      </ScrollView>
    </Sheet>
  )
}

export default ShareStatus
