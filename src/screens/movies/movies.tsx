import { FlatList, View } from 'react-native'
import { useQuery } from 'convex/react'
import { GenericId } from 'convex/values'
import { api } from 'convex_api'
import { useTranslation } from 'react-i18next'

import useStyles from './styles'
import MovieSlider from '@components/movie_slider'
import TinyAvatar from '@components/tiny_avatar'
import Typography from '@components/typography'
import { useSettings } from '@providers/settings'
import { TabType } from '@router/types'

const Movies: TabType<'movies'> = ({ navigation }) => {
  const { t, i18n } = useTranslation()
  const { currentEdition, spoilers } = useSettings()

  const styles = useStyles()

  const movies = useQuery(api.oscars.getMovies, { editionId: currentEdition as GenericId<'oscarEditions'> }) || []

  //TODO

  // sort
  // by Nominations
  // by Name

  // filters
  // by categories
  // by types (live/animated/documentary long/short)
  // by watched/unwatched/all
  // streaming on

  return (
    <MovieSlider
      data={movies.map((movie) => ({
        watched: movie.watched,
        spoiler: spoilers.hidePoster,
        title: movie.title[i18n.language],
        image: `https://image.tmdb.org/t/p/w500${movie.posterPath[i18n.language]}`,
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
