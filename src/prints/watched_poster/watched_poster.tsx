import React, { useEffect, useState } from 'react'
import { Image, PixelRatio, View } from 'react-native'
import ViewShot, { captureRef } from 'react-native-view-shot'
import { LinearGradient } from 'expo-linear-gradient'
import { useTranslation } from 'react-i18next'

import useStyles from './styles'
import { WatchedPosterProps } from './types'
import Column from '@components/column/column'
import { IconOscar } from '@components/icon'
import Row from '@components/row'
import TinyAvatar from '@components/tiny_avatar'
import Typography from '@components/typography'
import { useEdition } from '@providers/edition'
import useTheme from '@providers/theme/useTheme'
import { useUser } from '@providers/user'
import { ordinal } from '@utils/ordinals'

const WatchedPosters = ({ setImage }: WatchedPosterProps): React.ReactElement => {
  const [loadedImages, setLoadedImages] = useState<number>(0)
  const styles = useStyles()

  const { i18n, t } = useTranslation()
  const { semantics } = useTheme()

  const { user } = useUser()
  const { movies, edition } = useEdition()

  const handleCapture = async (): Promise<void> => {
    captureRef(viewRef, { quality: 1, width: pixels * 2 }).then((uri) => {
      setImage(uri)
    })
  }
  useEffect(() => {
    if (loadedImages === movies.length + 1) {
      handleCapture()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadedImages, movies.length])

  const targetPixelCount = 1080
  const pixelRatio = PixelRatio.get()
  const pixels = targetPixelCount / pixelRatio

  const viewRef = React.createRef<View>()

  const images = (
    <>
      {movies
        .sort((a, b) => (a.watched === b.watched ? 0 : a.watched ? -1 : 1))
        .map((movie) => (
          <View
            key={movie._id}
            style={styles.imageContainer}
          >
            <Image
              onLoadEnd={() => setLoadedImages((prev) => prev + 1)}
              source={{ uri: `https://image.tmdb.org/t/p/w500${movie.posterPath}` }}
              style={styles.image}
            />
            {!movie.watched && <View style={styles.imageOverlay} />}
          </View>
        ))}
    </>
  )

  return (
    <View style={styles.root}>
      {images && (
        <ViewShot
          ref={viewRef}
          options={{ quality: 1, width: pixels * 2 }}
          style={styles.container}
        >
          <LinearGradient
            style={styles.gradient}
            colors={semantics.brand.base.gradient.toReversed() as any}
          />

          <Row
            between
            middle
          >
            <Row middle>
              <Typography branded>OSCARS</Typography>
              <Typography legend>{`${ordinal(edition?.number ?? 0, i18n.language, true)} edition`}</Typography>
            </Row>
            <Typography title>{edition?.year}</Typography>
          </Row>

          <Row
            wrap
            style={styles.images}
          >
            {images}
          </Row>

          <Column middle>
            <Typography
              legend
              center
            >
              {movies.filter((movie) => movie.watched).length} / {movies.length}
            </Typography>
          </Column>

          <Row
            between
            trailing
          >
            <Row center>
              <IconOscar
                size={20}
                filled
                color={semantics.accent.base.default}
              />
              <View>
                <Row middle>
                  <Typography>
                    <Typography style={styles.highlight}>Academy </Typography>TRACKER
                  </Typography>
                </Row>
              </View>
            </Row>

            <Row
              middle
              end
            >
              <Typography body>@{user?.username}</Typography>
              <TinyAvatar
                image={user?.imageURL}
                label={user?.name}
                onLoadEnd={() => setLoadedImages((prev) => prev + 1)}
              />
            </Row>
          </Row>
        </ViewShot>
      )}
    </View>
  )
}

export default WatchedPosters
