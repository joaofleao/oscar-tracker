import { useEffect, useState } from 'react'
import { FlatList, ListRenderItemInfo, View } from 'react-native'

import Card from './Card'
import useStyles from './styles'
import WinnerModal from './WinnerModal'
import Button from '@components/Button'
import Global from '@components/Global'
import Header from '@components/Header'
import Icon from '@components/Icon'
import Poster from '@components/Poster'
import { useBallots } from '@providers/ballots'
import { useCategories } from '@providers/categories'
import { useEdition } from '@providers/edition'
import { useUser } from '@providers/user'
import { useWatchedMovies } from '@providers/watchedMovies'
import { getImage } from '@services/tmdb/api'
import { type CategoryProps, Nomination } from '@types'
import routes from '@utils/routes'

const Category = ({ navigation, route }: CategoryProps): JSX.Element => {
  const { categoryId } = route.params
  const { categories_map } = useCategories()
  const { language, preferences, adminMode } = useUser()
  const ballots = useBallots()
  const edition = useEdition()
  const { isMovieWatched } = useWatchedMovies()

  const styles = useStyles()

  const [wishes, setWishes] = useState(undefined)
  const [bets, setBets] = useState(undefined)
  const [newWinner, setNewWinner] = useState<[string, string, string] | null>(null)
  const upToDate = !(bets !== ballots.bets?.[categoryId] || wishes !== ballots.wishes?.[categoryId])
  const categoryNominations = edition.nominations[categoryId]

  useEffect(() => {
    if (ballots.bets?.[categoryId]) setBets(ballots.bets?.[categoryId])
    if (ballots.wishes?.[categoryId]) setWishes(ballots.wishes?.[categoryId])
  }, [ballots.bets, ballots.wishes, categoryId])

  useEffect(() => {
    return navigation.addListener('beforeRemove', async () => {
      if (!upToDate) await ballots.vote(categoryId, bets, wishes)
    })
  }, [ballots, bets, categoryId, navigation, upToDate, wishes])

  const renderCard = ({ item }: ListRenderItemInfo<Nomination>): JSX.Element => {
    const isWish = wishes?.includes(item.id)
    const isFirstBet = bets?.first === item.id
    const isSecondBet = bets?.second === item.id

    const place = (type: 'bet' | 'wish'): void => {
      if (type === 'wish')
        if (isWish) {
          setWishes((value) => {
            return value?.filter((wish) => {
              return wish !== item.id
            })
          })
        } else {
          setWishes((value = []) => {
            return [...value, item.id]
          })
        }
      else if (type === 'bet') {
        if ((bets?.first && bets?.second) || (!bets?.first && !bets?.second)) {
          setBets({
            first: item.id,
            second: undefined,
          })
        }
        if (bets?.first && isFirstBet && !bets?.second) {
          setBets({
            first: undefined,
            second: undefined,
          })
        }
        if (bets?.first && !isFirstBet && !bets?.second) {
          setBets((value) => {
            return {
              ...value,
              second: item.id,
            }
          })
        }
      }
    }

    const image = item.person
      ? getImage(edition.people[item.person].image)
      : getImage(edition.movies[item.movie].image[language])

    const title = item.person
      ? edition.people[item.person].name
      : item.song
      ? item.song
      : edition.movies[item.movie].name[language]

    const subtitle = item.person
      ? `as ${item.character}`
      : item.country
      ? item.country
      : item.nominees

    const description =
      item.person || item.song ? edition.movies[item.movie].name[language] : undefined

    return (
      <View style={styles.card}>
        <Card
          title={title}
          subtitle={subtitle}
          description={description}
          image={
            <Poster
              winner={edition.winners?.[item.category] === item.id}
              image={image}
              isWatched={isMovieWatched(item.movie)}
              spoiler={preferences.poster}
            />
          }
          icon={edition.winners?.[item.category] === item.id && <Icon.Oscar filled />}
          onPress={(): void => {
            navigation.navigate(routes.movie, { movieId: item.movie })
          }}
          onLongPress={(): void => {
            if (!adminMode) return

            const possibleWinner = item.song
              ? item.song
              : item.person
              ? edition.people[item.person].name
              : edition.movies[item.movie].name['en-US']
            setNewWinner([possibleWinner, item.id, edition.movies[item.movie].name['en-US']])
          }}
          bottomArea={
            <View style={styles.interactiveArea}>
              <Button
                onPress={(): void => {
                  place('wish')
                }}
                icon={<Icon.FingersCrossed filled={isWish} />}
                variant={isWish ? 'primary' : 'tertiary'}
                label="wish"
                width="full"
              />
              <Button
                width="full"
                onPress={(): void => {
                  place('bet')
                }}
                icon={<Icon.Oscar filled={isFirstBet || isSecondBet} />}
                variant={isFirstBet || isSecondBet ? 'primary' : 'tertiary'}
                label={isFirstBet ? '1 bet' : isSecondBet ? '2 bet' : 'bet'}
              />
            </View>
          }
        />
      </View>
    )
  }

  return (
    <Global.Screen>
      <Header.Root>
        <Button
          onPress={navigation.goBack}
          icon={<Icon.ArrowLeft />}
          size="action"
          variant="secondary"
        />
        <Header.Title numberOfLines={1}>
          {categories_map?.[categoryId]?.name[language]}
        </Header.Title>
        <Header.Placeholder />
      </Header.Root>

      <FlatList
        style={styles.content}
        indicatorStyle="black"
        data={categoryNominations}
        renderItem={renderCard}
        ItemSeparatorComponent={Global.Separator}
        ListHeaderComponent={Global.Separator}
        ListFooterComponent={Global.Separator}
      />

      <WinnerModal
        categoryId={categoryId}
        newWinner={newWinner}
        setNewWinner={setNewWinner}
      />
    </Global.Screen>
  )
}

export default Category
