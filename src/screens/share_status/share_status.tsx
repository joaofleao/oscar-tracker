import { useCallback } from 'react'
import { Dimensions, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { FadeInDown, FadeOutUp } from 'react-native-reanimated'
import ViewShot from 'react-native-view-shot'
import { useTranslation } from 'react-i18next'

import Button from '@components/button'
import { IconCheckCircle, IconCircle, IconShare } from '@components/icon'
import Row from '@components/row'
import Sheet from '@components/sheet'
import Typography from '@components/typography'
import { useEdition } from '@providers/edition'
import useTheme from '@providers/theme/useTheme'
import { ScreenType } from '@router/types'

const ShareStatus: ScreenType<'share_status'> = ({ navigation }) => {
  const { t } = useTranslation()

  const { semantics } = useTheme()

  const onCapture = useCallback((uri) => {
    console.log('do something with ', uri)
  }, [])

  const { movies } = useEdition()

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

  const width = Dimensions.get('window').width
  const card = (
    <ViewShot
      onCapture={onCapture}
      captureMode="mount"
      style={{ width: width - 80, aspectRatio: 1080 / 1920 }}
    >
      <View
        style={{
          width: '100%',
          height: '100%',
          borderWidth: 2,
          borderColor: semantics.container.stroke.default,
          borderRadius: 20,
          paddingHorizontal: 20,
          paddingVertical: 40,
          gap: 20,
        }}
      >
        {/* <Typography onboardingAccent>OSCARS 2026</Typography> */}
        <Row>
          <View style={{ gap: 4, flex: 1 }}>
            {firstColumnMovies.map((movie) => (
              <Row
                key={movie._id}
                // middle
              >
                {movie.watched && (
                  <IconCheckCircle
                    color={semantics.brand.foreground.default}
                    filled
                    size={12}
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
                  style={{ fontSize: 10, lineHeight: 12, flex: 1 }}
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
                    size={12}
                    color={semantics.brand.foreground.default}
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
                  style={{ fontSize: 10, lineHeight: 12, flex: 1 }}
                >
                  {movie.title}
                </Typography>
              </Row>
            ))}
          </View>
        </Row>

        <View style={{}}>
          <Typography>ACADEMY tracker</Typography>
          <Typography style={{ color: semantics.brand.foreground.default }}>Oscar 2026</Typography>
        </View>
      </View>
    </ViewShot>
  )
  return (
    <Sheet
      footer={
        <Row
          entering={FadeInDown.delay(300)}
          exiting={FadeOutUp.delay(300)}
        >
          <Button
            icon={<IconShare />}
            variant="brand"
            title={t('share_status:share')}
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
