import { Animated, Pressable, Text } from 'react-native'

import useStyles from './styles'
import Poster from '@components/Poster'
import { useEdition } from '@providers/edition'
import { useUser } from '@providers/user'
import { useWatchedMovies } from '@providers/watchedMovies'
import usePressableAnimation from '@hooks/usePressableAnimation'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { getImage } from '@services/tmdb/api'
import { Nomination, ScreenTypes } from '@types'
import routes from '@utils/routes'

interface NominationCardProps {
  nomination: Nomination
  winnerTitle?: string
  winnerDescription?: string
}
const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const NominationCard = (props: NominationCardProps): JSX.Element => {
  const { nomination, winnerTitle, winnerDescription } = props
  const edition = useEdition()
  const { preferences, language } = useUser()
  const { isMovieWatched } = useWatchedMovies()

  const navigation = useNavigation<NativeStackNavigationProp<ScreenTypes, 'logged'>>()

  const movie = edition.movies[nomination.movie ?? '']
  const person = edition.people[nomination.person ?? '']
  const winner = edition.winners?.[nomination.category] === nomination.id
  const watched = isMovieWatched(movie?.imdb)
  const isBestPicture = nomination.category === 'picture'

  const styles = useStyles({ large: isBestPicture })

  const image = person != null ? person.image : movie.image[language]

  const text = person != null ? person.name : movie?.name[language]

  const handleClick = (): void => {
    navigation.navigate(routes.movie, { movieId: movie.imdb })
  }

  const { animationPressIn, animationPressOut, scale } = usePressableAnimation()

  return (
    <AnimatedPressable
      style={[styles.container, { transform: [{ scale }] }]}
      onPressIn={animationPressIn}
      onPressOut={animationPressOut}
      onPress={handleClick}
    >
      <Poster
        dimmAndLock
        winner={winner}
        size={isBestPicture ? 'large' : 'small'}
        spoiler={preferences.plot}
        image={getImage(image)}
        isWatched={watched}
        winnerTitle={winnerTitle}
        winnerDescription={winnerDescription}
      />

      <Text
        style={styles.title}
        numberOfLines={2}
      >
        {text}
      </Text>
    </AnimatedPressable>
  )
}

export default NominationCard
