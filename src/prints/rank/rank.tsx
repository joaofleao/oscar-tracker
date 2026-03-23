import React, { useEffect, useState } from 'react'
import { FlatList, PixelRatio, View } from 'react-native'
import ViewShot, { captureRef } from 'react-native-view-shot'
import { LinearGradient } from 'expo-linear-gradient'
import { useTranslation } from 'react-i18next'

import SmallLeaderboardCard from './small_leaderboard_card'
import useStyles from './styles'
import { RankProps } from './types'
import { IconOscar } from '@components/icon'
import Row from '@components/row'
import TinyAvatar from '@components/tiny_avatar'
import Typography from '@components/typography'
import { useEdition } from '@providers/edition'
import useTheme from '@providers/theme/useTheme'
import { useUser } from '@providers/user'
import { ordinal } from '@utils/ordinals'

const Rank = ({ setImage }: RankProps): React.ReactElement => {
  const [loadedImages, setLoadedImages] = useState<number>(0)
  const styles = useStyles()

  const { i18n, t } = useTranslation()
  const { semantics } = useTheme()

  const { user } = useUser()
  const { edition, awards } = useEdition()

  const handleCapture = async (): Promise<void> => {
    captureRef(viewRef, { quality: 1, width: pixels * 2 }).then((uri) => {
      setImage(uri)
    })
  }
  useEffect(() => {
    if (loadedImages === 1) {
      handleCapture()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadedImages])

  const targetPixelCount = 1080
  const pixelRatio = PixelRatio.get()
  const pixels = targetPixelCount / pixelRatio

  const viewRef = React.createRef<View>()

  const compactLeaderboard = React.useMemo(() => {
    const leaderboard = awards?.leaderboard ?? []

    if (leaderboard.length <= 5) return leaderboard

    const currentUserId = user?._id
    if (!currentUserId) return leaderboard.slice(0, 5)

    const currentUserPosition = leaderboard.findIndex((item) => item.userId === currentUserId)

    if (currentUserPosition === -1 || currentUserPosition < 5) {
      return leaderboard.slice(0, 5)
    }

    return [...leaderboard.slice(0, 4), leaderboard[currentUserPosition]]
  }, [awards?.leaderboard, user?._id])

  return (
    <View style={styles.root}>
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
            <Typography legend>{ordinal(edition?.number ?? 0, i18n.language, false)}</Typography>
          </Row>
          <Typography title>{edition?.year}</Typography>
        </Row>

        <FlatList
          alwaysBounceVertical={false}
          style={styles.list}
          contentContainerStyle={styles.content}
          data={compactLeaderboard}
          keyExtractor={(item) => item.userId}
          renderItem={({ item }) => (
            <SmallLeaderboardCard
              label={item.name ?? item.username}
              image={item.imageURL}
              sublabel={item.username}
              description={`${item.movies} ${t('awards:watched_movies')}`}
              badge={item.participated ? `${ordinal(item.rank, i18n.language, true)} ${t('awards:place')}` : t('awards:not_ranked')}
              points={item.points}
              pointsLabel={t('awards:points')}
              variant={item.username === user?.username ? 'brand' : 'container'}
            />
          )}
        />

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
                  <Typography style={styles.highlight}>ACADEMY </Typography>TRACKER
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
    </View>
  )
}

export default Rank
