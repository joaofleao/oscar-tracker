import React, { useEffect, useState } from 'react'
import { Image, PixelRatio, View } from 'react-native'
import ViewShot, { captureRef } from 'react-native-view-shot'

import useStyles from './styles'
import { SummaryProps } from './types'
import Column from '@components/column/column'
import IconOscarOriginal from '@components/icon/scripts/icon_oscar_original'
import ProgressBar from '@components/progress_bar'
import Row from '@components/row'
import TinyAvatar from '@components/tiny_avatar'
import Typography from '@components/typography'
import { useEdition } from '@providers/edition'
import useTheme from '@providers/theme/useTheme'
import { useUser } from '@providers/user'

const Summary = ({ setImage }: SummaryProps): React.ReactElement => {
  const [loadedImages, setLoadedImages] = useState<number>(0)
  const styles = useStyles()

  const { semantics, fonts } = useTheme()

  const { user } = useUser()
  const { movies, edition } = useEdition()

  const points = 286

  const handleCapture = async (): Promise<void> => {
    captureRef(viewRef, { quality: 1, width: pixels * 2 }).then((uri) => {
      setImage(uri)
    })
  }
  useEffect(() => {
    if (loadedImages === 7) {
      handleCapture()
    }
  }, [loadedImages, movies.length])

  const targetPixelCount = 1080
  const pixelRatio = PixelRatio.get()
  const pixels = targetPixelCount / pixelRatio

  const viewRef = React.createRef<View>()

  return (
    <View style={styles.root}>
      <ViewShot
        ref={viewRef}
        options={{ quality: 1, width: pixels * 2 }}
        style={styles.container}
      >
        <ProgressBar
          thickness={10}
          maxValue={movies.length}
          value={movies.filter((movie) => movie.watched).length}
        />
        <Typography
          style={{
            fontFamily: fonts.primary.bold,
            fontSize: 56,
            lineHeight: 80,
          }}
          display
          center
        >
          {`Oscar ${edition?.year}`}
        </Typography>

        <Column>
          <Row style={styles.images}>
            <Row
              key={movies[0]._id}
              style={styles.item}
            >
              <Image
                onLoadEnd={() => setLoadedImages((prev) => prev + 1)}
                source={{ uri: `https://image.tmdb.org/t/p/w500${movies[0].posterPath}` }}
                style={styles.image}
              />
              <View style={styles.text}>
                <Typography legend>{movies[0].title}</Typography>
              </View>
            </Row>
            <Row
              key={movies[1]._id}
              style={styles.item}
            >
              <Image
                onLoadEnd={() => setLoadedImages((prev) => prev + 1)}
                source={{ uri: `https://image.tmdb.org/t/p/w500${movies[1].posterPath}` }}
                style={styles.image}
              />
              <View style={styles.text}>
                <Typography legend>{movies[1].title}</Typography>
              </View>
            </Row>
          </Row>
          <Row style={styles.images}>
            <Row
              key={movies[2]._id}
              style={styles.item}
            >
              <Image
                onLoadEnd={() => setLoadedImages((prev) => prev + 1)}
                source={{ uri: `https://image.tmdb.org/t/p/w500${movies[2].posterPath}` }}
                style={styles.image}
              />
              <View style={styles.text}>
                <Typography legend>{movies[2].title}</Typography>
              </View>
            </Row>
            <Row
              key={movies[3]._id}
              style={styles.item}
            >
              <Image
                onLoadEnd={() => setLoadedImages((prev) => prev + 1)}
                source={{ uri: `https://image.tmdb.org/t/p/w500${movies[3].posterPath}` }}
                style={styles.image}
              />
              <View style={styles.text}>
                <Typography legend>{movies[3].title}</Typography>
              </View>
            </Row>
          </Row>
          <Row style={styles.images}>
            <Row
              key={movies[4]._id}
              style={styles.item}
            >
              <Image
                onLoadEnd={() => setLoadedImages((prev) => prev + 1)}
                source={{ uri: `https://image.tmdb.org/t/p/w500${movies[4].posterPath}` }}
                style={styles.image}
              />
              <View style={styles.text}>
                <Typography legend>{movies[4].title}</Typography>
              </View>
            </Row>
            <Row
              key={movies[5]._id}
              style={[styles.item, {}]}
            >
              <Typography
                display
                style={{ fontSize: 48, fontFamily: fonts.primary.black }}
              >
                {points}
                <Typography
                  display
                  style={{ fontSize: 24 }}
                >
                  {' '}
                  pts
                </Typography>
              </Typography>
            </Row>
          </Row>
        </Column>

        <Row>
          <Column
            middle
            style={{ flex: 1, width: '50%', height: '100%', overflow: 'hidden' }}
          >
            <IconOscarOriginal
              height={200}
              width={80}
              filled
              color={semantics.accent.base.default}
            />

            <Row middle>
              <TinyAvatar
                image={user?.imageURL}
                label={user?.name}
                onLoadEnd={() => setLoadedImages((prev) => prev + 1)}
              />
              <View>
                <Typography legend>@{user?.username}</Typography>
                <Typography legend>
                  <Typography
                    legend
                    style={styles.highlight}
                  >
                    Academy{' '}
                  </Typography>
                  TRACKER
                </Typography>
              </View>
            </Row>
          </Column>

          <Column style={{ flex: 1, width: '50%', height: '100%', overflow: 'hidden' }}>
            <Image
              onLoadEnd={() => setLoadedImages((prev) => prev + 1)}
              source={{ uri: `https://image.tmdb.org/t/p/w500${movies[4].posterPath}` }}
              style={{
                maxHeight: '100%',
                maxWidth: '100%',
                width: '100%',
                // height: '100%',
                aspectRatio: 2 / 3,
              }}
            />
          </Column>
        </Row>
      </ViewShot>
    </View>
  )
}

export default Summary
