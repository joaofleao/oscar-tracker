import React, { useEffect, useState } from 'react'
import { Alert, View } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'
import ReorderableList, { ReorderableListProps } from 'react-native-reorderable-list'
import { useMutation, useQuery } from 'convex/react'
import { api } from 'convex_api'
import { useTranslation } from 'react-i18next'

import useStyles from './styles'
import Button from '@components/button'
import DraggableListItem from '@components/dragable_list_item'
import { IconDiscard, IconFingersCrossed, IconVote } from '@components/icon'
import IconButton from '@components/icon_button'
import ListItem, { ListItemProps } from '@components/list_item'
import Typography from '@components/typography'
import { useSettings } from '@providers/settings'
import { usePreventRemove } from '@react-navigation/native'
import { ScreenType } from '@router/types'

type Nomination = (typeof api.oscars.getNominationsByCategory._returnType.nominations)[number]

const Category: ScreenType<'category'> = ({ navigation, route }) => {
  const styles = useStyles()
  const { t, i18n } = useTranslation()
  const { edition } = useSettings()
  const unwish = useMutation(api.oscars.unwishOscarNomination)
  const wish = useMutation(api.oscars.wishOscarNomination)
  const rankNominations = useMutation(api.oscars.rankNomination)
  const [wishLoading, setWishLoading] = React.useState<string | undefined>(undefined)

  const data = useQuery(api.oscars.getNominationsByCategory, {
    editionId: edition?._id,
    categoryId: route.params.categoryId,
    language: i18n.language,
  })

  const [localNominations, setLocalNominations] = useState<Nomination[]>([])

  const sortedNominations = data?.nominations.sort((a, b) => {
    if (a.rank === undefined && b.rank === undefined) return 0
    if (a.rank === undefined) return 1
    if (b.rank === undefined) return -1
    return a.rank - b.rank
  })

  const hasChanges = JSON.stringify(sortedNominations) !== JSON.stringify(localNominations)

  usePreventRemove(hasChanges, ({ data }) => {
    Alert.alert(t('category:discard_title'), t('category:discard_message'), [
      { text: t('category:cancel'), onPress: (): void => {} },
      { text: t('category:discard'), onPress: (): void => navigation.dispatch(data.action), style: 'destructive' },
    ])
  })

  useEffect(() => {
    if (!sortedNominations) return

    setLocalNominations((old) => {
      if (old.length === 0) return sortedNominations
      return old.map((oldNomination) => {
        const newNomination = sortedNominations.find((n) => n.nominationId === oldNomination.nominationId)
        return { ...oldNomination, wish: newNomination?.wish ?? oldNomination.wish }
      })
    })
  }, [sortedNominations])

  const handleReset = async (): Promise<void> => {
    if (!sortedNominations) return
    setLocalNominations(sortedNominations)
  }
  const handleRankNominations = async (): Promise<void> => {
    rankNominations({
      votes: localNominations.map((nomination) => ({
        nominationId: nomination.nominationId,
        rank: nomination.rank,
      })),
    })
  }

  const handleReorder: ReorderableListProps<Nomination>['onReorder'] = (event) => {
    const { from, to } = event
    const updatedNominations = [...localNominations]
    const [item] = updatedNominations.splice(from, 1)
    updatedNominations.splice(to, 0, item)
    setLocalNominations(updatedNominations.map((nomination, index) => ({ ...nomination, rank: index + 1 })))
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
    watched: item.watched,
    image: `https://image.tmdb.org/t/p/w200${item.image}`,
    description: item.description,
    extra: item.extra,
    winner: item.winner,
    mainAction: {
      onPress: () => navigation.navigate('movie', { tmdbId: item.tmdbId }),
    },
    secondaryActions: [
      {
        icon: <IconFingersCrossed />,
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

  const distanceFromNow = new Date(edition.date).getTime() - new Date().getTime()

  return (
    <>
      <ReorderableList
        onReorder={handleReorder}
        style={styles.watched}
        contentContainerStyle={styles.watchedContent}
        data={localNominations}
        ListHeaderComponent={header}
        ItemSeparatorComponent={() => <View style={styles.gap} />}
        renderItem={({ item, index }) => {
          if (edition.complete && distanceFromNow > 0)
            return (
              <DraggableListItem
                index={item.rank}
                {...overlapingProps(item, index)}
              />
            )
          return <ListItem {...overlapingProps(item, index)} />
        }}
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
            title={t('category:cast_ballot')}
          />
        </Animated.View>
      )}
    </>
  )
}

export default Category
