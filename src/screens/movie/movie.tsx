import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'
import LottieView from 'lottie-react-native'
import { Alert, Image, Linking, ScrollView, View } from 'react-native'
import { SvgUri } from 'react-native-svg'
import { useConvexAuth, useMutation, useQuery } from 'convex/react'
import { api } from 'convex_api'
import { LinearGradient } from 'expo-linear-gradient'
import { useTranslation } from 'react-i18next'

import useStyles from './styles'
import Button from '@components/button'
import Caroussel from '@components/caroussel'
import Chip from '@components/chip'
import Dropdown from '@components/dropdown'
import { IconCalendar, IconEyeClosed, IconEyeOpen, IconIMDB, IconLanguages, IconOscar, IconRuntime, IconStar } from '@components/icon'
import IconButton from '@components/icon_button'
import Modal from '@components/modal'
import Paragraph from '@components/paragraph'
import Poster from '@components/poster'
import Row from '@components/row'
import Section from '@components/section'
import SmallCard, { SmallCardProps } from '@components/small_card'
import Tag from '@components/tag'
import { TinyPlus, TinyX } from '@components/tiny_icon'
import Typography from '@components/typography'
import useConvexErrorHandler from '@hooks/useConvexErrorHandler'
import { useSettings } from '@providers/settings'
import { useTheme } from '@providers/theme'
import { TabType } from '@router/types'
import { runtime } from '@utils/runtime'

const Movie: TabType<'movie'> = ({ navigation, route }) => {
  const { tmdbId } = route.params
  const styles = useStyles()
  const { t, i18n } = useTranslation()
  const { spoilers } = useSettings()
  const catchConvexError = useConvexErrorHandler()
  const { isAuthenticated } = useConvexAuth()

  const [confetti, setConfetti] = useState(false)

  const movie = useQuery(api.oscars.getMovieDetail, { tmdbId, language: i18n.language })

  const { semantics } = useTheme()
  const [hideInfo, setHideInfo] = useState(true)

  const markAsWatched = useMutation(api.movies.markAsWatched)
  const markAsUnWatched = useMutation(api.movies.removeFromWatchedMovies)

  const [date, setDate] = useState<Date>(new Date(Date.now()))
  const [calendarModal, setCalendarModal] = useState(false)
  const [unwatchModal, setUnwatchModal] = useState(false)

  // Optimistic state
  const [optimisticWatched, setOptimisticWatched] = useState<number | null>(null)

  const [localSpoiler, setLocalSpoiler] = useState(spoilers)

  const toggleSpoiler = (type: string): void => {
    setLocalSpoiler((prev) => {
      const newState = { ...prev, [type]: !prev[type as keyof typeof prev] }
      return newState
    })
  }

  if (!movie) return <></>

  const watched = optimisticWatched !== null ? optimisticWatched : movie.latestWatch

  const translatedTitle = movie.title[i18n.language]
  const academyTitle = movie.title.en_US
  const originalTitle = movie.title.original

  const showAcademyTitle = academyTitle !== translatedTitle
  const showOriginalTitle = originalTitle !== translatedTitle && originalTitle !== academyTitle
  const showAllTitles = showAcademyTitle && showOriginalTitle

  const unwatchMovie = async (): Promise<void> => {
    if (!movie || !movie.latestWatch) return

    // Optimistic update
    const previousWatchId = movie.latestWatch
    setOptimisticWatched(0)
    setUnwatchModal(false)

    try {
      await markAsUnWatched({ watchId: previousWatchId })
    } catch (error) {
      // Revert optimistic update
      setOptimisticWatched(null)
      catchConvexError(error)
      Alert.alert(t('movie:error_title') || 'Error', t('movie:unwatch_error') || 'Failed to unwatch movie. Please try again.', [{ text: t('movie:ok') || 'OK' }])
    }
  }

  const watchMovie = async (): Promise<void> => {
    if (!movie) return

    const watchTimestamp = date.getTime()
    setOptimisticWatched(watchTimestamp)
    setCalendarModal(false)
    setConfetti(true)

    try {
      await markAsWatched({ movieId: movie._id, watchedAt: watchTimestamp })
    } catch (error) {
      setOptimisticWatched(null)
      setConfetti(false)
      catchConvexError(error)
      Alert.alert(t('movie:error_title'), t('movie:watch_error'), [{ text: t('movie:ok') }])
    }
  }

  return (
    <>
      <View style={styles.backdropContainer}>
        <Image
          blurRadius={1}
          source={{ uri: `https://image.tmdb.org/t/p/w200${movie.backdropPath}` }}
          style={styles.backdropImage}
        />
        <LinearGradient
          colors={semantics.background.base.gradient as any}
          style={[styles.backdropGradient, styles.backdropGradientTop]}
        />
        <LinearGradient
          colors={semantics.background.base.gradient.toReversed() as any}
          style={styles.backdropGradient}
        />
        {movie.originCountry?.some((e) => e.code === 'BR') && (
          <LottieView
            loop={true}
            autoPlay={true}
            speed={0.8}
            source={require('@assets/animations/fireworks.json')}
            style={styles.animation}
          />
        )}
      </View>

      <ScrollView contentContainerStyle={styles.root}>
        <View style={styles.main}>
          <View style={styles.posterContainer}>
            <IconButton
              placeholder
              icon={hideInfo ? <IconEyeOpen /> : <IconEyeClosed />}
              onPress={() => setHideInfo((prev) => !prev)}
            />

            <Poster
              source={{ uri: `https://image.tmdb.org/t/p/w500${movie.posterPath}` }}
              toggleSpoiler={spoilers.hidePoster ? toggleSpoiler : undefined}
              spoiler={!watched && hideInfo && localSpoiler.hidePoster}
            />

            <IconButton
              placeholder={!!watched || (!spoilers.hidePlot && !spoilers.hideRate && !spoilers.hidePoster && !spoilers.hideCast)}
              icon={hideInfo ? <IconEyeOpen /> : <IconEyeClosed />}
              onPress={() => setHideInfo((prev) => !prev)}
            />
          </View>

          <View>
            <Typography
              center
              display
            >
              {translatedTitle}
            </Typography>
            {(showAcademyTitle || showOriginalTitle) && (
              <Typography
                center
                legend
              >
                {showAcademyTitle && academyTitle}
                {showAllTitles && ' | '}
                {showOriginalTitle && originalTitle}
              </Typography>
            )}
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            alwaysBounceHorizontal={false}
            contentContainerStyle={styles.chips}
          >
            {movie.releaseDate && (
              <Chip
                icon={<IconCalendar />}
                title={new Date(movie.releaseDate).toLocaleDateString()}
              />
            )}

            {movie.voteAverage && (
              <Chip
                icon={<IconStar />}
                title={movie.voteAverage.toFixed(2)}
                toggleSpoiler={spoilers.hideRate ? toggleSpoiler : undefined}
                spoiler={!watched && hideInfo && localSpoiler.hideRate}
              />
            )}

            {movie.originalLanguage && (
              <Chip
                icon={<IconLanguages />}
                title={movie.originalLanguage}
              />
            )}

            {movie.runtime && (
              <Chip
                icon={<IconRuntime />}
                title={runtime(movie.runtime)}
              />
            )}
          </ScrollView>

          <Button
            variant={watched ? 'container' : 'accent'}
            title={watched ? t('movie:unwatch') : t('movie:watch')}
            icon={watched ? <TinyX /> : <TinyPlus />}
            onPress={() => (!isAuthenticated ? navigation.navigate('auth') : watched ? setUnwatchModal(true) : watchMovie())}
            onLongPress={() => setCalendarModal(true)}
            tooltip={t('movie:hold_to_choose_date')}
          />
        </View>

        <View style={styles.content}>
          <Section title={t('movie:nominations')}>
            <Caroussel
              data={movie.nominations.map((nomination) => ({
                title: nomination.categoryName,
                variant: nomination.winner ? ('brand' as const) : ('container' as const),
                icon: nomination.winner ? <IconOscar filled /> : undefined,
                onPress: () => navigation.navigate('category', { categoryId: nomination.categoryId }),
              }))}
              item={Tag}
            />
          </Section>

          <Section title={t('movie:country')}>
            <Caroussel
              data={movie.originCountry?.map((country) => ({
                title: country.name,
                icon: (
                  <SvgUri
                    style={styles.flag}
                    uri={`https://hatscripts.github.io/circle-flags/flags/${country.code.toLowerCase()}.svg`}
                    width={20}
                    height={20}
                  />
                ),
              }))}
              item={Chip}
            />
          </Section>

          <Section title={t('movie:friends')}>
            <Caroussel<SmallCardProps>
              empty={t('movie:friends_empty')}
              item={SmallCard}
              data={movie.friends.map((friend) => ({
                _id: friend._id,
                title: friend.name?.split(' ')[0],
                description: friend.username,
                image: friend.imageURL,
                squared: true,
              }))}
            />
          </Section>

          {/* <Typography>{t('movie:streaming')}</Typography>
          <Typography>{t('movie:cast')}</Typography> */}
          {movie.plot && (
            <>
              <Typography>{t('movie:plot')}</Typography>
              <Paragraph
                text={movie.plot}
                toggleSpoiler={spoilers.hidePlot ? toggleSpoiler : undefined}
                spoiler={!watched && hideInfo && localSpoiler.hidePlot}
              />
            </>
          )}
        </View>

        <View style={styles.footer}>
          <Button
            onPress={() => Linking.openURL(`https://www.imdb.com/title/${movie.imdbId}`)}
            title={t('movie:imdb')}
            icon={<IconIMDB />}
          />
        </View>
      </ScrollView>

      <Dropdown
        visible={calendarModal}
        setVisible={setCalendarModal}
      >
        <DateTimePicker
          maximumDate={new Date(Date.now())}
          style={styles.datepicker}
          themeVariant="dark"
          display="inline"
          value={date}
          onChange={(_, date) => {
            if (date) setDate(date)
          }}
          accentColor={semantics.brand.foreground.light}
        />
        <Row end>
          <Button
            title={t('movie:cancel')}
            onPress={() => setCalendarModal(false)}
          />
          <Button
            title={t('movie:submit')}
            variant="accent"
            onPress={watchMovie}
          />
        </Row>
      </Dropdown>
      <Modal
        setVisible={setUnwatchModal}
        visible={unwatchModal}
        label={t('movie:unwatch')}
        description={t('movie:unwatch_description').replace('%movie', movie.title[i18n.language] ?? '')}
      >
        <Row end>
          <Button
            title={t('movie:cancel')}
            onPress={() => setUnwatchModal(false)}
          />
          <Button
            title={t('movie:continue')}
            variant="negative"
            onPress={unwatchMovie}
          />
        </Row>
      </Modal>
      {confetti && (
        <LottieView
          onAnimationFinish={() => setConfetti(false)}
          loop={false}
          autoPlay={true}
          source={movie.originCountry?.some((e) => e.code === 'BR') ? require(`@assets/animations/confetti_brazil.json`) : require(`@assets/animations/confetti.json`)}
          style={[styles.animation, styles.bottom]}
        />
      )}
    </>
  )
}

export default Movie
