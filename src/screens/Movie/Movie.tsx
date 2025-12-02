import { useEffect, useRef, useState } from 'react'
import LottieView from 'lottie-react-native'
import {
  FlatList,
  Image,
  Linking,
  type ListRenderItemInfo,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import useStyles from './styles'
import Button from '@components/Button'
import Coachmark from '@components/Coachmark'
import Global from '@components/Global'
import Icon from '@components/Icon'
import { formatDate, languageNames } from '@components/Loading/utils'
import Poster from '@components/Poster'
import Spoiler from '@components/Spoiler'
import { useCategories } from '@providers/categories'
import { useEdition } from '@providers/edition'
import { useMovies } from '@providers/movies'
import { useTheme } from '@providers/theme'
import { useUser } from '@providers/user'
import { useWatchedMovies } from '@providers/watchedMovies'
import { getImage } from '@services/tmdb/api'
import type {
  MovieProps,
  MovieType,
  Nomination,
  ProductionCompany,
  TMDBPerson,
  WatchProvider,
} from '@types'
import { formatRuntime } from '@utils/functions'
import routes from '@utils/routes'

const Movie = ({ navigation, route }: MovieProps): JSX.Element => {
  const { movieId } = route.params
  const edition = useEdition()
  const { preferences, isLogged, language } = useUser()
  const { setMovieUnwatched, setMovieWatched, isMovieWatched } = useWatchedMovies()
  const movies = useMovies()
  const { categories_map } = useCategories()
  const theme = useTheme()
  const styles = useStyles()

  const markAsWatchedButtonRef = useRef(null)

  const image = edition.movies[movieId].image[language]
  const name = edition.movies[movieId].name[language]

  const [movieData, setMovieData] = useState<MovieType>()
  const [movieCast, setMovieCast] = useState([])
  const [movieProviders, setMovieProviders] = useState([])
  const [nominations, setNominations] = useState<Nomination[]>([])

  // const animationRef = useRef<LottieView>(null)

  const watched = isMovieWatched(movieId)

  const [loginFirstCoachmark, setLoginFirstCoachmark] = useState<boolean>(false)

  const imdbLink = `https://www.imdb.com/title/${movieId}`

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const nominationsData = await edition.getMovieNominations(movieId)
      setNominations(nominationsData)
      const movie = await movies.getMovie(movieId)
      const cast = await movies.getCast(movieId)
      const providers = await movies.getProviders(movieId)

      setMovieProviders(() => {
        return providers?.results?.BR?.flatrate?.filter((provider: WatchProvider) => {
          return provider.provider_id !== 1796
        })
      })
      setMovieData(movie)
      setMovieCast(cast.cast.slice(0, 10))
    }
    fetchData()
  }, [edition, movieId, movies])

  const markAsWatched = (current: boolean): void => {
    if (!isLogged) setLoginFirstCoachmark(true)
    else if (current) {
      setMovieUnwatched(movieId)
    } else {
      setMovieWatched(movieId, new Date())
      // animationRef.current?.play()
    }
  }

  const renderCast = ({ item }: ListRenderItemInfo<TMDBPerson>): JSX.Element => {
    const picture = getImage(item.profile_path)

    return (
      <Spoiler
        style={styles.castSpoiler}
        show={preferences.cast}
        watched={watched}
        text="Click to show cast member"
      >
        <TouchableOpacity
          style={styles.cast}
          onPress={(): void => {
            Linking.openURL(`https://www.themoviedb.org/person/${item.id}`)
          }}
        >
          <View style={styles.castImageContainer}>
            {picture && <Text style={styles.castNoImage}>No Image</Text>}
            <Image
              style={styles.castImage}
              source={{ uri: picture }}
            />
          </View>

          <Text
            style={styles.castName}
            numberOfLines={2}
          >
            {item.name}
          </Text>
          <Text
            style={styles.castCharacter}
            numberOfLines={2}
          >
            {item.character}
          </Text>
        </TouchableOpacity>
      </Spoiler>
    )
  }

  const renderItem = ({ item }: ListRenderItemInfo<Nomination>): JSX.Element => {
    const winner = item.id === edition.winners?.[item.category]
    return (
      <TouchableOpacity
        style={styles.nomination}
        onPress={(): void => {
          navigation.navigate(routes.category, { categoryId: item.category })
        }}
      >
        {winner && (
          <Icon.Oscar
            filled
            width={18}
            height={18}
          />
        )}
        <Text style={styles.nominationText}>{categories_map?.[item.category]?.name[language]}</Text>
      </TouchableOpacity>
    )
  }

  const renderProvider = ({ item }: ListRenderItemInfo<ProductionCompany>): JSX.Element => {
    return (
      <Image
        style={styles.provider}
        source={{ uri: getImage(item.logo_path) }}
      />
    )
  }

  return (
    <>
      <Global.Screen>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.mainContent}>
            <Spoiler
              style={styles.spoilerPoster}
              show={preferences.poster}
              watched={watched}
              text="Show Poster"
            >
              <Poster
                spoiler={true}
                size="full"
                image={getImage(image, 1280)}
                isWatched={watched}
              />
            </Spoiler>
          </View>
          <Text style={styles.title}>{name}</Text>
          {(movieData?.vote_average || movieData?.runtime || movieData?.original_language) && (
            <View style={styles.basicData}>
              {movieData?.vote_average && (
                <Spoiler
                  text="Show"
                  show={preferences.ratings}
                  watched={watched}
                >
                  <View style={styles.iconInformation}>
                    <Icon.Star
                      width={18}
                      height={18}
                      color={theme.colors.text.default}
                    />
                    <Text style={styles.iconInformationText}>
                      {movieData?.vote_average != null &&
                        Math.round(movieData?.vote_average * 10) / 10}
                    </Text>
                  </View>
                </Spoiler>
              )}
              {movieData?.runtime && (
                <View style={styles.iconInformation}>
                  <Icon.Clock
                    width={18}
                    height={18}
                    color={theme.colors.text.default}
                  />
                  <Text style={styles.iconInformationText}>
                    {formatRuntime(movieData?.runtime, language)}
                  </Text>
                </View>
              )}

              {movieData?.original_language && (
                <View style={styles.iconInformation}>
                  <Icon.Globe
                    width={18}
                    height={18}
                    color={theme.colors.text.default}
                  />
                  <Text style={styles.iconInformationText}>
                    {languageNames[movieData?.original_language]?.[language]}
                  </Text>
                </View>
              )}
            </View>
          )}
          <View>
            <View style={styles.carousselHeader}>
              <Text style={styles.subTitle}>Nominations</Text>
            </View>

            <FlatList
              style={styles.list}
              horizontal
              showsHorizontalScrollIndicator={false}
              data={nominations}
              renderItem={renderItem}
              ItemSeparatorComponent={Global.SmallSeparator}
              ListHeaderComponent={Global.Separator}
              ListFooterComponent={Global.Separator}
            />
          </View>

          <View>
            <View style={styles.carousselHeader}>
              <Text style={styles.subTitle}>Where to Watch</Text>
            </View>

            {movieProviders?.length > 0 ? (
              <FlatList
                style={styles.list}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={movieProviders}
                renderItem={renderProvider}
                ItemSeparatorComponent={Global.Separator}
                ListHeaderComponent={Global.Separator}
                ListFooterComponent={Global.Separator}
              />
            ) : (
              <Text style={styles.emptyState}>No streaming services available</Text>
            )}
          </View>

          <View>
            <View style={styles.carousselHeader}>
              <Text style={styles.subTitle}>Release Date</Text>
            </View>
            <Text style={styles.emptyState}>{formatDate(movieData?.release_date)}</Text>
          </View>

          <View>
            <View style={styles.carousselHeader}>
              <Text style={styles.subTitle}>Plot</Text>
            </View>
            {movieCast.length < 1 ? (
              <Text style={styles.emptyState}>Plot not available</Text>
            ) : (
              <Spoiler
                show={preferences.plot}
                watched={watched}
              >
                <Text style={styles.plot}>{movieData?.overview}</Text>
              </Spoiler>
            )}
          </View>

          <View>
            <View style={styles.carousselHeader}>
              <Text style={styles.subTitle}>Cast</Text>
            </View>

            {movieCast.length < 1 ? (
              <Text style={styles.emptyState}>Cast not available</Text>
            ) : (
              <FlatList
                style={styles.list}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={movieCast}
                renderItem={renderCast}
                ItemSeparatorComponent={Global.Separator}
                ListHeaderComponent={Global.Separator}
                ListFooterComponent={Global.Separator}
              />
            )}
          </View>
          <Button
            onPress={(): void => {
              Linking.openURL(imdbLink)
            }}
            variant="tertiary"
            label="Open On IMDB"
          />
        </ScrollView>

        {/* <LottieView
          style={styles.animation}
          source={getAnimation('confetti')}
          autoPlay={false}
          loop={false}
          ref={animationRef}
        /> */}

        <View style={styles.footer}>
          <Button
            onPress={navigation.goBack}
            icon={<Icon.ArrowLeft />}
            size="action"
            variant="secondary"
          />
          <Button
            customRef={markAsWatchedButtonRef}
            onPress={(): void => {
              markAsWatched(watched)
            }}
            label={`mark as ${watched ? 'unwatched' : 'watched'}`}
            size="action"
            variant={watched ? 'secondary' : 'primary'}
          />
        </View>
      </Global.Screen>
      <Coachmark
        intrusive
        close={(): void => {
          return setLoginFirstCoachmark(false)
        }}
        visible={loginFirstCoachmark}
        title={'Looks like you are not logged yet'}
        description={'Please login to mark this movie as watched'}
        anchor={markAsWatchedButtonRef}
        completeMessage="Sign in"
        onComplete={(): void => {
          navigation.navigate(routes.signIn)
          setLoginFirstCoachmark(false)
        }}
      />
    </>
  )
}

export default Movie
