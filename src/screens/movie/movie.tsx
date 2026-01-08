import React, { useRef, useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'
import LottieView from 'lottie-react-native'
import { Image, Linking, ScrollView, View } from 'react-native'
import { useMutation, useQuery } from 'convex/react'
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
import { languages } from '@utils/languages'
import { runtime } from '@utils/runtime'

const Movie: TabType<'movie'> = ({ navigation, route }) => {
  const { tmdbId } = route.params
  const styles = useStyles()
  const { t, i18n } = useTranslation()
  const { spoilers } = useSettings()
  const catchConvexError = useConvexErrorHandler()
  const confettiRef = useRef<LottieView>(null)

  const movie = useQuery(api.oscars.getMovieDetail, { tmdbId })

  const { semantics } = useTheme()
  const [hideInfo, setHideInfo] = useState(true)

  const markAsWatched = useMutation(api.movies.markAsWatched)
  const markAsUnWatched = useMutation(api.movies.removeFromWatchedMovies)

  const [date, setDate] = useState<Date>(new Date(Date.now()))
  const [calendarModal, setCalendarModal] = useState(false)
  const [unwatchModal, setUnwatchModal] = useState(false)

  const [localSpoiler, setLocalSpoiler] = useState(spoilers)

  const toggleSpoiler = (type: string): void => {
    setLocalSpoiler((prev) => {
      const newState = { ...prev, [type]: !prev[type as keyof typeof prev] }
      return newState
    })
  }

  if (!movie) return <></>

  const watched = !!movie.latestWatch

  const translatedTitle = movie.title[i18n.language]
  const academyTitle = movie.title.en_US
  const originalTitle = movie.title.original

  const showAcademyTitle = academyTitle !== translatedTitle
  const showOriginalTitle = originalTitle !== translatedTitle && originalTitle !== academyTitle
  const showAllTitles = showAcademyTitle && showOriginalTitle

  const unwatchMovie = async (): Promise<void> => {
    if (!movie || !movie.latestWatch) return
    try {
      await markAsUnWatched({ watchId: movie.latestWatch })
    } catch (error) {
      catchConvexError(error)
    } finally {
      setUnwatchModal(false)
    }
  }

  const watchMovie = async (): Promise<void> => {
    if (!movie) return

    try {
      await markAsWatched({ movieId: movie._id, watchedAt: date.getTime() })
    } catch (error) {
      catchConvexError(error)
    } finally {
      confettiRef.current?.play()

      setCalendarModal(false)
    }
  }

  return (
    <>
      <View style={styles.backdropContainer}>
        <Image
          blurRadius={3}
          source={{ uri: `https://image.tmdb.org/t/p/w500${movie.backdropPath}` }}
          style={styles.backdropImage}
        />
        <LinearGradient
          colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.15)', 'rgba(0, 0, 0, 0.60)', 'rgba(0, 0, 0, 1)']}
          style={styles.backdropGradient}
        />
        {movie.originCountry?.includes('BR') && (
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
              source={{ uri: `https://image.tmdb.org/t/p/w500${movie.posterPath[i18n.language]}` }}
              toggleSpoiler={spoilers.hidePoster ? toggleSpoiler : undefined}
              spoiler={!watched && hideInfo && localSpoiler.hidePoster}
            />

            <IconButton
              placeholder={watched || (!spoilers.hidePlot && !spoilers.hideRate && !spoilers.hidePoster && !spoilers.hideCast)}
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
                title={languages[movie.originalLanguage][i18n.language]}
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
            onPress={() => (watched ? setUnwatchModal(true) : watchMovie())}
            onLongPress={() => setCalendarModal(true)}
            tooltip={t('movie:hold_to_choose_date')}
          />
        </View>

        <View style={styles.content}>
          <Section title={t('movie:nominations')}>
            <Caroussel
              data={movie.nominations.map((nomination) => ({
                title: nomination.categoryName[i18n.language],
                icon: nomination.winner ? (
                  <IconOscar
                    color={semantics.accent.base.default}
                    filled
                  />
                ) : undefined,
                onPress: () => navigation.navigate('category', { categoryId: nomination.categoryId }),
              }))}
              item={Tag}
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
                image: friend.image,
                squared: true,
              }))}
            />
          </Section>

          <Typography>{t('movie:streaming')}</Typography>
          <Typography>{t('movie:cast')}</Typography>

          <Typography>{t('movie:plot')}</Typography>
          <Paragraph
            text={movie.overview}
            toggleSpoiler={spoilers.hidePlot ? toggleSpoiler : undefined}
            spoiler={!watched && hideInfo && localSpoiler.hidePlot}
          />
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
          accentColor={semantics.accent.base.default}
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

      <LottieView
        ref={confettiRef}
        loop={false}
        autoPlay={false}
        source={movie.originCountry?.includes('BR') ? require(`@assets/animations/confetti_brazil.json`) : require(`@assets/animations/confetti.json`)}
        style={[styles.animation, styles.bottom]}
      />
    </>
  )
}

export default Movie
