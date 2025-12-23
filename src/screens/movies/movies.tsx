import { FlatList, View } from 'react-native'
import { useQuery } from 'convex/react'
import { api } from 'convex_api'
import { useTranslation } from 'react-i18next'

import useStyles from './styles'
import EmptyState from '@components/empty_state'
import ListView from '@components/list_view'
import Select from '@components/select'
import TinyAvatar from '@components/tiny_avatar'
import Typography from '@components/typography'
import { useEdition } from '@providers/edition'
import { useSettings } from '@providers/settings'
import { semantics } from '@providers/theme'
import { TabType } from '@router/types'

const Movies: TabType<'movies'> = ({ navigation }) => {
  const styles = useStyles()
  const { t, i18n } = useTranslation()
  const { currentEdition, setCurrentEdition, editions } = useEdition()
  const { spoilers } = useSettings()

  const movies = useQuery(api.oscars.getMovies, { editionId: currentEdition }) || []

  const header = (): React.ReactElement => (
    <>
      <View style={{ alignSelf: 'center' }}>
        <Typography
          center
          color={semantics.accent.base.default}
        >
          oscar tracker
        </Typography>

        <Select
          label={t('home:select_edition')}
          data={editions?.map((edition) => ({
            name: `${t('home:edition')} ${edition.number} - ${edition.year}`,
            id: edition._id,
          }))}
          onSelect={setCurrentEdition}
          selected={currentEdition}
          renderAnchor={({ selectedOption, setVisible, visible }) => (
            <Typography
              onPress={() => setVisible(!visible)}
              center
              legend
              color={semantics.background.foreground.light}
            >
              {selectedOption?.name}
            </Typography>
          )}
        />
      </View>

      {/* <Bar.Root style={{ padding: 16, marginHorizontal: -16, paddingBottom: 0 }}>
        <Select
          label={t('movies:select_edition')}
          data={editions?.map((edition) => ({
            name: `${t('movies:edition')} ${edition.number} - ${edition.year}`,
            id: edition._id,
          }))}
          onSelect={setCurrentEdition}
          selected={currentEdition}
          renderAnchor={({ selectedOption, setVisible, visible }) => (
            <Bar.Item
              onPress={() => setVisible(true)}
              icon={<TinyChevron orientation="down" />}
            >
              {selectedOption?.name as string}
            </Bar.Item>
          )}
        />

        <Bar.Item icon={<TinyChevron orientation="down" />}>filters</Bar.Item>
        <Bar.Item icon={<TinyArrow orientation="down" />}>sort</Bar.Item>
      </Bar.Root> */}
    </>
  )

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
    <ListView
      empty={
        <EmptyState
          title={t('movies:no_movies_title')}
          description={t('movies:no_movies_description')}
        />
      }
      header={header}
      contentContainerStyle={styles.flatlists}
      data={movies.map((movie) => ({
        watched: movie.watched,
        spoiler: spoilers.hidePoster,
        _id: movie._id,
        tmdbId: movie.tmdbId,
        title: movie.title[i18n.language],
        image: `https://image.tmdb.org/t/p/w500${movie.posterPath[i18n.language]}`,
        description: `${movie.nominationCount} ${movie.nominationCount === 1 ? t('movies:nomination') : t('movies:nominations_plural')}`,
        bottomArea:
          movie.friends_who_watched.length > 0 ? (
            <>
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
            </>
          ) : undefined,
        onPress: (): void => navigation.navigate('movie', { tmdbId: movie.tmdbId }),
      }))}
    />
  )
}

export default Movies
