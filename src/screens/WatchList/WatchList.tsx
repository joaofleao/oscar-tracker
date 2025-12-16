import React from 'react'
import { Animated, FlatList, View } from 'react-native'

import useStyles from './styles'
import Select from '@components/form/Select'
import SearchField from '@components/FormFields/SearchField'
import Global from '@components/Global'
import NomineeCard from '@components/NomineeCard'
import { useEdition } from '@providers/edition'
import { useUser } from '@providers/user'
import { useWatchedMovies } from '@providers/watchedMovies'
import type { BasicMovieType, WatchListProps } from '@types'
import routes from '@utils/routes'

const allStatus = [
  { id: 'all' as const, name: 'All' },
  { id: 'watched' as const, name: 'Watched' },
  { id: 'unwatched' as const, name: 'Unwatched' },
]

function WatchList({ navigation }: WatchListProps): JSX.Element {
  const edition = useEdition()
  const { language } = useUser()
  const { isMovieWatched } = useWatchedMovies()

  const styles = useStyles()

  const [search, setSearch] = React.useState<string>('')
  const [filter, setFilter] = React.useState<'all' | 'watched' | 'unwatched'>('all')

  const [data, setData] = React.useState(Object.values(edition.movies))

  const scrollOffsetY = React.useRef(new Animated.Value(0)).current

  React.useEffect(() => {
    let filteredData = Object.values(edition.movies)

    // Apply search filter
    if (search !== '') {
      filteredData = filteredData.filter((movie) => {
        const nameLowerEnglish = movie.name['en-US'].toLowerCase()
        const nameLowerPortuguese = movie.name['pt-BR'].toLowerCase()
        const searchLower = search.toLowerCase()
        return nameLowerEnglish.includes(searchLower) || nameLowerPortuguese.includes(searchLower)
      })
    }

    // Apply watched/unwatched filter
    if (filter !== 'all') {
      filteredData = filteredData.filter((movie) => {
        const watched = isMovieWatched(movie.imdb)
        return filter === 'watched' ? watched : !watched
      })
    }

    setData(filteredData)
  }, [search, filter, edition.movies, isMovieWatched])

  const renderItem = ({ item }: { item: BasicMovieType }): JSX.Element => {
    return (
      <View style={styles.item}>
        <NomineeCard
          onPress={(): void => {
            navigation.navigate(routes.movie, { movieId: item.imdb })
          }}
          image={item.image[language]}
          title={item.name[language]}
          id={item.imdb}
        />
      </View>
    )
  }

  return (
    <Global.Screen isTabScreen>
      <FlatList
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }], {
          useNativeDriver: false,
        })}
        data={data}
        renderItem={renderItem}
        ItemSeparatorComponent={Global.Separator}
        ListFooterComponent={Global.NavBarSeparator}
        ListHeaderComponent={
          <>
            <Global.HeaderBarSeparator />
            <View style={styles.header}>
              <SearchField
                onChangeText={setSearch}
                value={search}
              />
              <Select
                data={allStatus}
                selected={filter}
                onSelect={setFilter}
              />
            </View>
          </>
        }
      />
    </Global.Screen>
  )
}

export default WatchList
