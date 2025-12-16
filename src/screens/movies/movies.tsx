import { View } from 'react-native'
import { useQuery } from 'convex/react'
import { api } from 'convex_api'
import { useTranslation } from 'react-i18next'

import useStyles from './styles'
import Bar from '@components/bar'
import ListView from '@components/list_view'
import { TriangleLogo } from '@components/logo'
import Select from '@components/select'
import { TinyChevron } from '@components/tiny_icon'
import Typography from '@components/typography'
import { useEdition } from '@providers/edition'
import { semantics } from '@providers/theme'
import { TabType } from '@router/types'

const Movies: TabType<'movies'> = ({ navigation }) => {
  const styles = useStyles()
  const { t } = useTranslation()
  const { currentEdition, setCurrentEdition, editions } = useEdition()

  const movies = useQuery(api.oscars.getMoviesFromEdition, { editionId: currentEdition }) || []

  const data = movies.map((movie) => ({
    _id: movie._id,
    title: movie.title,
    posterPath: movie.posterPath,
    description: `${movie.nominationCount} ${movie.nominationCount === 1 ? t('movies:nomination') : t('movies:nominations_plural')}`,
    //TODO navigate to movie page
    // onPress: (): void => navigation.navigate('watched_movie', { movie }),
  }))

  const header = (): React.ReactElement => (
    <Bar.Root style={{ padding: 16, marginHorizontal: -16, paddingBottom: 0 }}>
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

      {/* <Bar.Item icon={<TinyChevron orientation="down" />}>filters</Bar.Item> */}
      {/* <Bar.Item icon={<TinyArrow orientation="down" />}>sort</Bar.Item> */}
    </Bar.Root>
  )
  const empty = (): React.ReactElement => (
    <View style={{ minHeight: 600, justifyContent: 'center', alignItems: 'center', gap: 20 }}>
      <TriangleLogo color={semantics.container.base.pressed} />
      <View style={{ alignItems: 'center' }}>
        <Typography>{t('movies:no_movies_title')}</Typography>
        <Typography description>{t('movies:no_movies_description')}</Typography>
      </View>
    </View>
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
      empty={empty}
      header={header}
      contentContainerStyle={styles.flatlists}
      data={data}
    />
  )
}

export default Movies
