import React from 'react'
import { ActivityIndicator, FlatList, View } from 'react-native'
import { RefreshControl } from 'react-native-gesture-handler'
import { useTranslation } from 'react-i18next'

import useStyles from './styles'
import EmptyState from '@components/empty_state'
import Header from '@components/header'
import { IconFilter } from '@components/icon'
import MovieSlider from '@components/movie_slider'
import TinyAvatar from '@components/tiny_avatar'
import Typography from '@components/typography'
import useHeaderAnimation from '@hooks/useHeaderAnimation'
import { useEdition } from '@providers/edition'
import { useTheme } from '@providers/theme'
import { useUser } from '@providers/user'
import { TabType } from '@router/types'

const Movies: TabType<'movies'> = ({ navigation }) => {
  const { t } = useTranslation()
  const { edition, movies, refreshFriendsWatches } = useEdition()
  const { spoilers } = useUser()
  const { onScroll, animation } = useHeaderAnimation()
  const [refreshing, setRefreshing] = React.useState(false)

  const styles = useStyles()
  const { semantics } = useTheme()

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)

    refreshFriendsWatches()
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [refreshFriendsWatches])

  // sort
  // by Nominations
  // by Name

  // filters
  // by watched/unwatched/all
  // streaming on

  const daysUntilAnnouncement = edition?.announcement ? Math.ceil((new Date(edition.announcement).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : null
  const daysUntilEdition = edition?.date ? Math.ceil((new Date(edition.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : null

  const emptyState = (): React.ReactElement => {
    if (daysUntilAnnouncement !== null && daysUntilEdition !== null) {
      if (daysUntilAnnouncement < 0)
        return (
          <EmptyState
            title={t('nominations:announcement_made_title')}
            description={t('nominations:announcement_made_description')}
          />
        )
      if (daysUntilAnnouncement === 0)
        return (
          <EmptyState
            title={t('nominations:announcement_today_title')}
            description={t('nominations:announcement_today_description')}
          />
        )
      if (daysUntilAnnouncement === 1)
        return (
          <EmptyState
            title={t('nominations:until_announcement_title_singular').replace('{count}', '1')}
            description={t('nominations:until_announcement_description_singular').replace('{count}', '1')}
          />
        )
      if (daysUntilAnnouncement > 1)
        return (
          <EmptyState
            title={t('nominations:until_announcement_title').replace('{count}', Math.abs(daysUntilAnnouncement)?.toString())}
            description={t('nominations:until_announcement_description').replace('{count}', Math.abs(daysUntilEdition)?.toString())}
          />
        )
    }
    return <ActivityIndicator color={semantics.accent.foreground.default} />
  }

  return (
    <>
      <Header
        animation={animation}
        button={{
          icon: <IconFilter color={semantics.container.foreground.light} />,
          onPress: () => navigation.navigate('filter'),
        }}
      />
      {movies?.length === 0 && emptyState()}
      <MovieSlider
        refreshing={refreshing}
        onRefresh={onRefresh}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        onScroll={onScroll}
        data={movies.map((movie) => ({
          watched: movie.watched,
          spoiler: spoilers.hidePoster,
          title: movie.title,
          image: `https://image.tmdb.org/t/p/w300${movie.posterPath}`,
          description: `${movie.nominationCount} ${movie.nominationCount === 1 ? t('movies:nomination') : t('movies:nominations_plural')}`,
          bottomArea:
            movie.friends_who_watched.length > 0 ? (
              <View style={styles.bottomArea}>
                <Typography
                  style={styles.title}
                  legend
                >
                  {t('movies:watched_by')}
                </Typography>
                <FlatList
                  contentContainerStyle={styles.friendsList}
                  alwaysBounceHorizontal={false}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={movie.friends_who_watched}
                  renderItem={({ item }) => (
                    <TinyAvatar
                      image={item.imageURL}
                      label={item.name}
                    />
                  )}
                />
              </View>
            ) : undefined,
          onPress: () => navigation.navigate('movie', { tmdbId: movie.tmdbId }),
        }))}
      />
    </>
  )
}

export default Movies
