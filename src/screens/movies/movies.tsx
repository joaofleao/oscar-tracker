import { ActivityIndicator, FlatList, View } from 'react-native'
import { useQuery } from 'convex/react'
import { api } from 'convex_api'
import { useTranslation } from 'react-i18next'

import useStyles from './styles'
import EmptyState from '@components/empty_state'
import MovieSlider from '@components/movie_slider'
import TinyAvatar from '@components/tiny_avatar'
import Typography from '@components/typography'
import useAnimations from '@providers/animations/useAnimations'
import { useSettings } from '@providers/settings'
import { TabType } from '@router/types'

const Movies: TabType<'movies'> = ({ navigation }) => {
  const { t, i18n } = useTranslation()
  const { edition, spoilers } = useSettings()
  const { onScrollMovies, moviesRef } = useAnimations()

  const styles = useStyles()

  const movies = useQuery(api.oscars.getMovies, { editionId: edition?._id, language: i18n.language }) || []

  //TODO

  // sort
  // by Nominations
  // by Name

  // filters
  // by categories
  // by types (live/animated/documentary long/short)
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
    return <ActivityIndicator />
  }

  return (
    <MovieSlider
      ListEmptyComponent={emptyState}
      ref={moviesRef}
      onScroll={onScrollMovies}
      data={movies.map((movie) => ({
        watched: movie.watched,
        spoiler: spoilers.hidePoster,
        title: movie.title,
        image: `https://image.tmdb.org/t/p/w300${movie.posterPath}`,
        description: `${movie.nominationCount} ${movie.nominationCount === 1 ? t('movies:nomination') : t('movies:nominations_plural')}`,
        bottomArea:
          movie.friends_who_watched.length > 0 ? (
            <View style={styles.bottomArea}>
              <Typography legend>{t('movies:watched_by')}</Typography>
              <FlatList
                alwaysBounceHorizontal={false}
                horizontal
                data={movie.friends_who_watched}
                renderItem={({ item }) => (
                  <TinyAvatar
                    image={item.image}
                    label={item.name}
                  />
                )}
              />
            </View>
          ) : undefined,
        onPress: () => navigation.navigate('movie', { tmdbId: movie.tmdbId }),
      }))}
    />
  )
}

export default Movies
