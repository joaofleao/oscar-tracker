import { Animated, Pressable, Text } from 'react-native'

import useStyles from './styles'
import { NominationCardProps } from './types'
import Poster from '@components/Poster'
import usePressableAnimation from '@hooks/usePressableAnimation'
import { useEdition } from '@providers/edition'
import { useUser } from '@providers/user'
import { useWatchedMovies } from '@providers/watchedMovies'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackProps } from '@router/types'
import { getImage } from '@services/tmdb/api'
// import routes from '@utils/routes'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const NominationCard = (props: NominationCardProps): React.ReactElement => {
  const { nomination, winnerTitle, winnerDescription } = props
  const edition = useEdition()
  const { preferences, language } = useUser()
  const { isMovieWatched } = useWatchedMovies()
  const navigation = useNavigation<NativeStackNavigationProp<StackProps>>()
  const movie = edition.movies[nomination.movie ?? '']
  const person = edition.people[nomination.person ?? '']
  const winner = edition.winners?.[nomination.category] === nomination.id
  const watched = isMovieWatched(movie?.imdb)
  const isBestPicture = nomination.category === 'picture'
  const styles = useStyles({ large: isBestPicture })
  const image = person != null ? person.image : movie.image[language]
  const text = person != null ? person.name : movie?.name[language]
  const handleClick = (): void => {
    navigation.navigate('movie_details', { movieId: movie.imdb })
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
