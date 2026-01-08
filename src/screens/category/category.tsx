import { useEffect, useState } from 'react'
import { View } from 'react-native'
import ReorderableList, { ReorderableListProps } from 'react-native-reorderable-list'
import { useQuery } from 'convex/react'
import { GenericId } from 'convex/values'
import { api } from 'convex_api'
import { useTranslation } from 'react-i18next'

import useStyles from './styles'
import DraggableListItem from '@components/dragable_list_item'
import ListItem, { ListItemProps } from '@components/list_item'
import { TinyHeart } from '@components/tiny_icon'
import Typography from '@components/typography'
import { useSettings } from '@providers/settings'
import { ScreenType } from '@router/types'

type Nomination = {
  description?: string
  extra?: string
  image?: string
  nominationId: GenericId<'oscarNomination'>
  title: string
  tmdbId: number
  watched?: number
  winner: boolean
  liked: boolean
  position?: number
}

const Category: ScreenType<'category'> = ({ navigation, route }) => {
  const styles = useStyles()
  const { i18n } = useTranslation()
  const { currentEdition } = useSettings()

  const data = useQuery(api.oscars.getNominationsByCategory, {
    editionId: currentEdition as GenericId<'oscarEditions'>,
    categoryId: route.params.categoryId,
    language: i18n.language,
  })

  const [watchedNominations, setWatchedNominations] = useState<Nomination[]>([])
  const [unwatchedNominations, setUnwatchedNominations] = useState<Nomination[]>([])

  useEffect(() => {
    if (data?.nominations) {
      const watchedMovies = data.nominations.filter((nomination) => nomination.watched !== undefined)
      const unwatchedMovies = data.nominations.filter((nomination) => nomination.watched === undefined)

      setWatchedNominations(
        watchedMovies.map((item) => {
          return { ...item, liked: false }
        }),
      )
      setUnwatchedNominations(
        unwatchedMovies.map((item) => {
          return { ...item, liked: false }
        }),
      )
    }
  }, [data?.nominations])

  const handleReorder: ReorderableListProps<Nomination>['onReorder'] = (event) => {
    const { from, to } = event

    const updatedNominations = [...watchedNominations]
    const [item] = updatedNominations.splice(from, 1)
    updatedNominations.splice(to, 0, item)
    setWatchedNominations(updatedNominations.map((nomination, index) => ({ ...nomination, position: index + 1 })))
  }

  if (!data) return <></>

  const header = (
    <View style={styles.header}>
      <Typography center>{data.category.name}</Typography>
    </View>
  )

  const overlapingProps = (item: Nomination, index: number): ListItemProps => ({
    id: item.nominationId,
    title: item.title,
    watched: !!item.watched,
    image: `https://image.tmdb.org/t/p/w500${item.image}`,
    description: item.description,
    extra: item.extra,
    mainAction: {
      onPress: () => navigation.navigate('movie', { tmdbId: item.tmdbId }),
    },
    secondaryActions: [
      {
        icon: <TinyHeart />,
        onPress: () =>
          setUnwatchedNominations((oldUpdates) => {
            const updatedNominations = [...oldUpdates]
            updatedNominations[index].liked = !updatedNominations[index].liked
            return updatedNominations
          }),
        filled: item.liked,
      },
    ],
  })

  return (
    <ReorderableList
      onReorder={handleReorder}
      style={styles.watched}
      contentContainerStyle={styles.watchedContent}
      data={watchedNominations}
      ListHeaderComponent={header}
      ItemSeparatorComponent={() => <View style={styles.gap} />}
      renderItem={({ item, index }) => (
        <DraggableListItem
          index={item.position}
          {...overlapingProps(item, index)}
        />
      )}
      ListFooterComponent={() => (
        <View style={styles.unwatched}>
          {unwatchedNominations.length > 0 && (
            <Typography
              center
              legend
            >
              Assista aos filmes para poder classifica-los.
            </Typography>
          )}
          {unwatchedNominations.map((item, index) => {
            return (
              <ListItem
                key={item.nominationId}
                {...overlapingProps(item, index)}
              />
            )
          })}
        </View>
      )}
    />
  )
}

export default Category
