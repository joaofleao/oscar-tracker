import React, { useEffect, useState } from 'react'
import { Alert, View } from 'react-native'
import { FadeInDown, FadeOutUp } from 'react-native-reanimated'
import ReorderableList, { ReorderableListProps } from 'react-native-reorderable-list'
import { useConvexAuth, useMutation, useQuery } from 'convex/react'
import { api } from 'convex_api'
import { useTranslation } from 'react-i18next'

import useStyles from './styles'
import Button from '@components/button'
import Column from '@components/column'
import DraggableListItem from '@components/dragable_list_item'
import { IconDiscard, IconFingersCrossed, IconStar, IconVote } from '@components/icon'
import Row from '@components/row'
import Sheet from '@components/sheet'
import Typography from '@components/typography'
import { useEdition } from '@providers/edition'
import { useUser } from '@providers/user'
import { usePreventRemove } from '@react-navigation/native'
import { ScreenType } from '@router/types'

type Nomination = (typeof api.oscars.getNominationsByCategory._returnType.nominations)[number]

const Category: ScreenType<'category'> = ({ navigation, route }) => {
  const styles = useStyles()
  const { t, i18n } = useTranslation()
  const { user } = useUser()
  const { edition } = useEdition()

  const rankNominations = useMutation(api.ballots.rankNomination)
  const toggleWish = useMutation(api.ballots.toggleWishNomination)
  const markAsWinner = useMutation(api.oscar.markAsWinner)

  const { isAuthenticated } = useConvexAuth()
  const [wishLoading, setWishLoading] = React.useState<string | undefined>(undefined)

  const data = useQuery(api.ballots.getCategoriesWithBallots, {
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
      categoryId: route.params.categoryId,
      editionId: edition?._id!,
      votes: localNominations.map((nomination) => nomination.nominationId),
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
      <Sheet
        reordable
        header={<Typography>{data.category.name}</Typography>}
        footer={
          <>
            {hasChanges && (
              <Column
                middle
                entering={FadeInDown.delay(300)}
                exiting={FadeOutUp.delay(300)}
              >
                <Typography
                  center
                  description
                >
                  {t('category:can_change')}
                </Typography>

                <Row>
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
                </Row>
              </Column>
            )}
          </>
        }
      >
        <ReorderableList
          onReorder={handleReorder}
          data={localNominations}
          ListHeaderComponent={() => <View style={styles.gap} />}
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
                        await toggleWish({ nominationId: item.nominationId, categoryId: route.params.categoryId, editionId: edition?._id! })
                      } finally {
                        setWishLoading(undefined)
                      }
                    },
                    disabled: wishLoading === item.nominationId,
                  },
                  ...(user?.username === 'joaofleao'
                    ? [
                        {
                          icon: <IconStar size={16} />,
                          selectedIcon: <IconStar filled />,
                          selected: item.winner,
                          onPress: async (): Promise<void> => {
                            try {
                              await markAsWinner({ nominationId: item.nominationId })
                            } catch {
                              Alert.alert('erro ao marcar vencedor')
                            }
                          },
                        },
                      ]
                    : []),
                ]}
              />
            )
          }}
        />
      </Sheet>
    </>
  )
}

export default Category
