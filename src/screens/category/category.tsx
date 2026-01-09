import React, { useEffect, useState } from 'react'
import { Alert, View } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'
import ReorderableList, { ReorderableListProps } from 'react-native-reorderable-list'
import { useMutation, useQuery } from 'convex/react'
import { GenericId } from 'convex/values'
import { api } from 'convex_api'
import { useTranslation } from 'react-i18next'

import useStyles from './styles'
import Button from '@components/button'
import DraggableListItem from '@components/dragable_list_item'
import { IconDiscard, IconVote } from '@components/icon'
import IconButton from '@components/icon_button'
import ListItem, { ListItemProps } from '@components/list_item'
import { TinyHeart } from '@components/tiny_icon'
import Typography from '@components/typography'
import { useSettings } from '@providers/settings'
import { usePreventRemove } from '@react-navigation/native'
import { ScreenType } from '@router/types'

type Nomination = (typeof api.oscars.getNominationsByCategory._returnType.watched)[number]

const Category: ScreenType<'category'> = ({ navigation, route }) => {
  const styles = useStyles()
  const { t, i18n } = useTranslation()
  const { currentEdition } = useSettings()
  const unwish = useMutation(api.oscars.unwishOscarNomination)
  const wish = useMutation(api.oscars.wishOscarNomination)
  const rankNominations = useMutation(api.oscars.rankNomination)
  const [wishLoading, setWishLoading] = React.useState<string | undefined>(undefined)

  const data = useQuery(api.oscars.getNominationsByCategory, {
    editionId: currentEdition as GenericId<'oscarEditions'>,
    categoryId: route.params.categoryId,
    language: i18n.language,
  })

  const [localWatchedNominations, setLocalWatchedNominations] = useState<Nomination[]>([])

  const sortedWatched = data?.watched.sort((a, b) => {
    if (a.rank === undefined && b.rank === undefined) return 0
    if (a.rank === undefined) return 1
    if (b.rank === undefined) return -1
    return a.rank - b.rank
  })

  const hasChanges = JSON.stringify(sortedWatched) !== JSON.stringify(localWatchedNominations)

  usePreventRemove(hasChanges, ({ data }) => {
    Alert.alert(t('category:discard_title'), t('category:discard_message'), [
      { text: t('category:cancel'), onPress: (): void => {} },
      { text: t('category:discard'), onPress: (): void => navigation.dispatch(data.action), style: 'destructive' },
    ])
  })

  useEffect(() => {
    if (!sortedWatched) return

    setLocalWatchedNominations((old) => {
      if (old.length === 0) return sortedWatched
      return old.map((oldNomination) => {
        const newNomination = sortedWatched.find((n) => n.nominationId === oldNomination.nominationId)
        return { ...oldNomination, wish: newNomination?.wish ?? oldNomination.wish }
      })
    })
  }, [sortedWatched])

  const handleReset = async (): Promise<void> => {
    if (!sortedWatched) return
    setLocalWatchedNominations(sortedWatched)
  }
  const handleRankNominations = async (): Promise<void> => {
    rankNominations({
      votes: localWatchedNominations.map((nomination) => ({
        nominationId: nomination.nominationId,
        rank: nomination.rank,
      })),
    })
  }

  const handleReorder: ReorderableListProps<Nomination>['onReorder'] = (event) => {
    const { from, to } = event
    const updatedNominations = [...localWatchedNominations]
    const [item] = updatedNominations.splice(from, 1)
    updatedNominations.splice(to, 0, item)
    setLocalWatchedNominations(updatedNominations.map((nomination, index) => ({ ...nomination, rank: index + 1 })))
  }

  if (!data) return <></>

  const header = (
    <View style={styles.header}>
      <Typography center>{data.category.name}</Typography>
      {data.unwatched.length > 0 && (
        <Typography
          center
          legend
        >
          {t('category:watched_description')}
        </Typography>
      )}
    </View>
  )

  const overlapingProps = (item: Nomination, index: number): ListItemProps => ({
    id: item.nominationId,
    title: item.title,
    watched: item.watched,
    image: `https://image.tmdb.org/t/p/w500${item.image}`,
    description: item.description,
    extra: item.extra,
    mainAction: {
      onPress: () => navigation.navigate('movie', { tmdbId: item.tmdbId }),
    },
    secondaryActions: [
      {
        icon: <TinyHeart />,
        onPress: async (): Promise<void> => {
          if (wishLoading) return
          setWishLoading(item.nominationId)
          try {
            if (item.wish) await unwish({ nominationId: item.nominationId })
            else await wish({ nominationId: item.nominationId })
          } finally {
            setWishLoading(undefined)
          }
        },
        filled: item.wish,
        disabled: wishLoading === item.nominationId,
      },
    ],
  })

  return (
    <>
      <ReorderableList
        onReorder={handleReorder}
        style={styles.watched}
        contentContainerStyle={styles.watchedContent}
        data={localWatchedNominations}
        ListHeaderComponent={header}
        ItemSeparatorComponent={() => <View style={styles.gap} />}
        renderItem={({ item, index }) => (
          <DraggableListItem
            index={item.rank}
            {...overlapingProps(item, index)}
          />
        )}
        ListFooterComponent={() => (
          <>
            <View style={styles.unwatched}>
              {data.unwatched.length > 0 && (
                <Typography
                  center
                  legend
                >
                  {t('category:unwatched_description')}
                </Typography>
              )}
              {data.unwatched.map((item, index) => {
                return (
                  <ListItem
                    key={item.nominationId}
                    {...overlapingProps(item, index)}
                  />
                )
              })}
            </View>
          </>
        )}
      />
      {hasChanges && (
        <Animated.View
          style={styles.footer}
          entering={FadeInDown.delay(300)}
        >
          <IconButton
            icon={<IconDiscard />}
            onPress={handleReset}
          />

          <Button
            onPress={handleRankNominations}
            icon={<IconVote />}
            variant="brand"
            title="Cast Ballot"
          />
        </Animated.View>
      )}
    </>
  )
}

export default Category
