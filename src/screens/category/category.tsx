import React, { useEffect, useState } from 'react'
import { Alert, View } from 'react-native'
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated'
import ReorderableList, { ReorderableListProps } from 'react-native-reorderable-list'
import { useConvexAuth, useMutation, useQuery } from 'convex/react'
import { api } from 'convex_api'
import { useTranslation } from 'react-i18next'

import useStyles from './styles'
import Blur from '@components/blur'
import Button from '@components/button'
import DraggableListItem from '@components/dragable_list_item'
import { IconDiscard, IconFingersCrossed, IconVote } from '@components/icon'
import Typography from '@components/typography'
import { useEdition } from '@providers/edition'
import { usePreventRemove } from '@react-navigation/native'
import { ScreenType } from '@router/types'

type Nomination = (typeof api.oscars.getNominationsByCategory._returnType.nominations)[number]

const Category: ScreenType<'category'> = ({ navigation, route }) => {
  const styles = useStyles()
  const { t, i18n } = useTranslation()
  const { edition } = useEdition()
  const unwish = useMutation(api.oscars.unwishOscarNomination)
  const wish = useMutation(api.oscars.wishOscarNomination)
  const rankNominations = useMutation(api.oscars.rankNomination)

  const { isAuthenticated } = useConvexAuth()
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

  const hasChanges = JSON.stringify(sortedNominations?.map((e) => e.tmdbId)) !== JSON.stringify(localNominations?.map((e) => e.tmdbId))

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

  const distanceFromNow = new Date(edition?.date ?? 0).getTime() - new Date().getTime()

  return (
    <>
      <Blur style={[styles.header]}>
        <Typography>{data.category.name}</Typography>
      </Blur>
      <ReorderableList
        onReorder={handleReorder}
        style={styles.root}
        contentContainerStyle={hasChanges ? styles.contentCompensation : styles.content}
        data={localNominations}
        ItemSeparatorComponent={() => <View style={styles.gap} />}
        renderItem={({ item }) => {
          return (
            <DraggableListItem
              disabled={!edition?.complete || distanceFromNow < 0}
              index={item.rank}
              id={item.nominationId}
              title={item.title}
              watched={item.watched}
              image={`https://image.tmdb.org/t/p/w200${item.image}`}
              description={item.description}
              extra={item.extra}
              winner={item.winner}
              mainAction={{
                onPress: () => navigation.navigate('movie', { tmdbId: item.tmdbId }),
              }}
              secondaryActions={[
                {
                  icon: <IconFingersCrossed />,
                  selectedIcon: <IconFingersCrossed filled />,
                  selected: item.wish,

                  onPress: async (): Promise<void> => {
                    if (!isAuthenticated) return navigation.navigate('auth')
                    if (wishLoading) return
                    setWishLoading(item.nominationId)
                    try {
                      if (item.wish) await unwish({ nominationId: item.nominationId })
                      else await wish({ nominationId: item.nominationId })
                    } finally {
                      setWishLoading(undefined)
                    }
                  },
                  disabled: wishLoading === item.nominationId,
                },
              ]}
            />
          )
        }}
      />
      {hasChanges && (
        <Animated.View
          style={styles.footer}
          entering={FadeInDown.delay(300)}
          exiting={FadeOutUp.delay(300)}
        >
          <Button
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
