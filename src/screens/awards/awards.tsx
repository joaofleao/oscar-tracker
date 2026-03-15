import React, { useEffect, useState } from 'react'
import { Dimensions, ScrollView, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { FadeIn, FadeInDown, FadeOut, FadeOutDown, FadeOutUp, LinearTransition } from 'react-native-reanimated'
import { useQuery } from 'convex/react'
import { api } from 'convex_api'
import { useTranslation } from 'react-i18next'

import useStyles from './styles'
import Blur from '@components/blur'
import Button from '@components/button'
import Chip from '@components/chip'
import Column from '@components/column'
import { IconCheckCircle, IconShare, IconTrophy } from '@components/icon'
import LeaderboardCard from '@components/leaderboard_card'
import MegaTypography from '@components/mega_typography'
import ProgressBar from '@components/progress_bar'
import Row from '@components/row'
import Typography from '@components/typography'
import { useEdition } from '@providers/edition'
import { useTheme } from '@providers/theme'
import { useUser } from '@providers/user'
import { ScreenType } from '@router/types'
import { ordinal } from '@utils/ordinals'

const Awards: ScreenType<'awards'> = ({ navigation, route }) => {
  const styles = useStyles()
  const TIMER_SECONDS = 5
  const TIMER_TICK_MS = 100

  const { edition, nominations, awards } = useEdition()
  const { t, i18n } = useTranslation()
  const { user } = useUser()

  const { semantics } = useTheme()

  const votedCategories = useQuery(api.ballots.getVotedCategories, {
    editionId: edition?._id,
  })

  const [focusedIndex, setFocusedIndex] = React.useState(0)
  const listRef = React.useRef<FlatList>(null)
  const [time, setTime] = React.useState(TIMER_SECONDS)
  const [isUserScrolling, setIsUserScrolling] = React.useState(false)
  const [isLeaderboardExpanded, setIsLeaderboardExpanded] = useState(false)
  const scrollStartIndexRef = React.useRef(0)
  const isMomentumScrollingRef = React.useRef(false)
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  const leaderboard = React.useMemo(() => awards?.leaderboard ?? [], [awards?.leaderboard])

  const compactLeaderboard = React.useMemo(() => {
    if (leaderboard.length <= 5) return leaderboard

    const currentUserId = user?._id
    if (!currentUserId) return leaderboard.slice(0, 5)

    const currentUserPosition = leaderboard.findIndex((item) => item.userId === currentUserId)

    if (currentUserPosition === -1 || currentUserPosition < 5) {
      return leaderboard.slice(0, 5)
    }

    return [...leaderboard.slice(0, 4), leaderboard[currentUserPosition]]
  }, [leaderboard, user?._id])

  const displayedLeaderboard = isLeaderboardExpanded ? leaderboard : compactLeaderboard
  const hasMoreLeaders = leaderboard.length > compactLeaderboard.length

  useEffect(() => {
    const distanceFromNow = new Date(edition?.date ?? 0).getTime() - new Date().getTime()
    const updateCountdown = (): void => {
      const distanceFromNow = new Date(edition?.date ?? 0).getTime() - new Date().getTime()
      setCountdown({
        days: Math.floor(distanceFromNow / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distanceFromNow % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distanceFromNow % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distanceFromNow % (1000 * 60)) / 1000),
      })
    }
    updateCountdown()
    if (distanceFromNow > 0 && distanceFromNow < 60) {
      const interval = setInterval(updateCountdown, 1000)
      return (): void => clearInterval(interval)
    }
  }, [edition?.date])

  const getUnit = (value: number, unit: 'hours' | 'minutes' | 'seconds' | 'days'): string => {
    if (unit === 'days') return value > 1 ? t('awards:days') : t('awards:day')
    if (unit === 'hours') return value > 1 ? t('awards:hours') : t('awards:hour')
    if (unit === 'minutes') return value > 1 ? t('awards:minutes') : t('awards:minute')
    if (unit === 'seconds') return value > 1 ? t('awards:seconds') : t('awards:second')
    return ''
  }

  const getCountdown = (): string => {
    if (countdown.days > 0) return t('awards:will').replace('{countdown}', countdown.days.toString()).replace('{time_unit}', getUnit(countdown.days, 'days'))
    if (countdown.hours > 0) return t('awards:will').replace('{countdown}', countdown.hours.toString()).replace('{time_unit}', getUnit(countdown.hours, 'hours'))
    if (countdown.minutes > 0) return t('awards:will').replace('{countdown}', countdown.minutes.toString()).replace('{time_unit}', getUnit(countdown.minutes, 'minutes'))
    if (countdown.seconds > 0) return t('awards:will').replace('{countdown}', countdown.seconds.toString()).replace('{time_unit}', getUnit(countdown.seconds, 'seconds'))
    return t('awards:has').replace('{date}', new Date(edition?.date ?? 0).toLocaleDateString())
  }

  const { height } = Dimensions.get('window')

  const handleUserScrollStart = React.useCallback((): void => {
    scrollStartIndexRef.current = focusedIndex
    setIsUserScrolling(true)
  }, [focusedIndex])

  const handleUserScrollStop = React.useCallback((): void => {
    setIsUserScrolling(false)

    if (scrollStartIndexRef.current !== focusedIndex) {
      setTime(TIMER_SECONDS)
    }
  }, [focusedIndex])

  const unvotedCategories = nominations.filter((nom) => !votedCategories?.includes(nom.category._id) && nom.nominations.some((n) => n.watched))

  const pages = [
    {
      key: 'home',
      accent: false,
      name: t('awards:home'),
      content: (
        <View style={styles.listContainer}>
          <View style={styles.container}>
            <Column middle>
              <MegaTypography description>{t('awards:call').replace('{count}', ordinal(edition?.number ?? 0, i18n.language))}</MegaTypography>
              <MegaTypography title>{t('awards:name')}</MegaTypography>
            </Column>
            <MegaTypography description>{getCountdown()}</MegaTypography>
            {!edition?.finished && (
              <Column middle>
                <Typography
                  legend
                  color={semantics.negative.foreground.default}
                >
                  {t('awards:unvoted')}
                </Typography>
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  style={styles.categories}
                  horizontal
                >
                  <Row>
                    {unvotedCategories.map((nomination) => (
                      <Chip
                        onPress={(): void => navigation.navigate('category', { categoryId: nomination.category._id })}
                        key={nomination.category._id}
                        title={nomination.category.name}
                      />
                    ))}
                  </Row>
                </ScrollView>
              </Column>
            )}
          </View>

          <Column
            middle
            layout={LinearTransition}
            entering={FadeInDown}
            exiting={FadeOutDown}
          >
            {!edition?.finished && <Typography description>{t('awards:submit')}</Typography>}

            <Button
              disabled={!awards?.personal.participated}
              entering={FadeInDown}
              exiting={FadeOutUp}
              layout={LinearTransition}
              variant="brand"
              icon={!awards?.personal.participated && edition?.finished ? undefined : <IconTrophy />}
              title={!awards?.personal.participated && edition?.finished ? t('awards:did_not_participate') : t('awards:show_me_winners')}
              onPress={() => listRef.current?.scrollToOffset({ offset: (focusedIndex + 1) * height, animated: true })}
            />
          </Column>
        </View>
      ),
    },
    {
      key: 'watched_movies',
      accent: false,
      name: t('awards:watched_movies'),
      content: (
        <View style={styles.container}>
          <Column middle>
            {focusedIndex >= 1 && (
              <MegaTypography
                entering={FadeInDown.delay(400).duration(600)}
                exiting={FadeOutDown.delay(400).duration(600)}
                big
              >
                {awards?.personal?.movies}
              </MegaTypography>
            )}

            {focusedIndex >= 1 && (
              <MegaTypography
                entering={FadeInDown.delay(450).duration(600)}
                exiting={FadeOutDown.delay(400).duration(600)}
                subtitle
              >
                {t('awards:watched_movies')}
              </MegaTypography>
            )}
          </Column>
        </View>
      ),
    },
    {
      key: 'stats',
      accent: true,
      name: t('awards:stats'),
      content: (
        <View style={styles.container}>
          <Column>
            <Column>
              {focusedIndex >= 2 && (
                <MegaTypography
                  left
                  medium
                  entering={FadeInDown.delay(400).duration(600)}
                  exiting={FadeOutDown.delay(400).duration(600)}
                >
                  {awards?.personal?.satisfaction}
                  <MegaTypography
                    entering={FadeInDown.delay(900).duration(600)}
                    exiting={FadeOutDown.delay(400).duration(600)}
                    small
                  >
                    %
                  </MegaTypography>
                </MegaTypography>
              )}
              {focusedIndex >= 2 && (
                <MegaTypography
                  left
                  entering={FadeInDown.delay(450).duration(600)}
                  exiting={FadeOutDown.delay(400).duration(600)}
                  subtitle
                >
                  {t('awards:satisfaction')}
                </MegaTypography>
              )}
            </Column>
            <Column>
              {focusedIndex >= 2 && (
                <MegaTypography
                  entering={FadeInDown.delay(900).duration(600)}
                  exiting={FadeOutDown.delay(400).duration(600)}
                  small
                >
                  {awards?.personal?.categories}
                  <MegaTypography
                    entering={FadeInDown.delay(900).duration(600)}
                    exiting={FadeOutDown.delay(400).duration(600)}
                    extrasmall
                  >
                    /{nominations.length}
                  </MegaTypography>
                </MegaTypography>
              )}

              {focusedIndex >= 2 && (
                <MegaTypography
                  entering={FadeInDown.delay(950).duration(600)}
                  exiting={FadeOutDown.delay(400).duration(600)}
                  subtitle
                >
                  {t('awards:finished_categories')}
                </MegaTypography>
              )}
            </Column>
            <Column>
              {focusedIndex >= 2 && (
                <MegaTypography
                  entering={FadeInDown.delay(1400).duration(600)}
                  exiting={FadeOutDown.delay(400).duration(600)}
                  small
                >
                  {awards?.personal?.hours && ((awards.personal.hours / 60) % 1 === 0 ? (awards.personal.hours / 60).toFixed(0) : ((awards.personal.hours - 4) / 60).toFixed(1))}
                </MegaTypography>
              )}

              {focusedIndex >= 2 && (
                <MegaTypography
                  left
                  entering={FadeInDown.delay(1450).duration(600)}
                  exiting={FadeOutDown.delay(400).duration(600)}
                  subtitle
                >
                  {t('awards:watched_hours')}
                </MegaTypography>
              )}
            </Column>
          </Column>
        </View>
      ),
    },
    {
      key: 'points',
      accent: false,
      name: t('awards:points'),
      content: (
        <View style={styles.container}>
          <Column middle>
            {focusedIndex >= 3 && (
              <MegaTypography
                entering={FadeInDown.delay(400).duration(600)}
                exiting={FadeOutDown.delay(400).duration(600)}
                big
              >
                {awards?.personal?.points}
              </MegaTypography>
            )}

            {focusedIndex >= 3 && (
              <MegaTypography
                entering={FadeInDown.delay(450).duration(600)}
                exiting={FadeOutDown.delay(400).duration(600)}
                subtitle
              >
                {t('awards:points')}
              </MegaTypography>
            )}
          </Column>
        </View>
      ),
    },
    {
      key: 'leaderboard',
      accent: false,
      name: t('awards:leaderboard'),
      content: (
        <View style={styles.listContainer}>
          <Blur
            variant="container"
            style={styles.header}
          >
            <View style={styles.headerContent}>
              <MegaTypography subtitle>{t('awards:leaderboard')}</MegaTypography>
            </View>
          </Blur>

          <FlatList
            alwaysBounceVertical={false}
            style={styles.leaderboard}
            contentContainerStyle={styles.leaderboardContent}
            data={displayedLeaderboard}
            keyExtractor={(item) => item.userId}
            renderItem={({ item }) => (
              <LeaderboardCard
                layout={LinearTransition}
                entering={FadeIn}
                exiting={FadeOut}
                label={item.name ?? item.username}
                image={item.imageURL}
                sublabel={item.username}
                description={`${item.movies} ${t('awards:watched_movies')}`}
                badge={item.participated ? `${ordinal(item.rank, i18n.language, true)} ${t('awards:place')}` : t('awards:not_ranked')}
                points={item.points}
                pointsLabel={t('awards:points')}
                variant={item.username === user?.username ? 'brand' : 'container'}
              />
            )}
          />

          {hasMoreLeaders && (
            <Column
              middle
              style={styles.expandLeaderboardButton}
            >
              <Button
                variant="container"
                small
                title={isLeaderboardExpanded ? t('awards:show_top_leaders') : t('awards:show_all_leaders')}
                onPress={() => setIsLeaderboardExpanded((previous) => !previous)}
              />
            </Column>
          )}

          {focusedIndex >= 4 && (
            <Row
              center
              layout={LinearTransition}
              entering={FadeInDown}
              exiting={FadeOutDown}
            >
              <Button
                variant="brand"
                icon={<IconShare />}
                title={t('awards:share')}
                onPress={() => navigation.navigate('share')}
              />
              <Button
                variant="accent"
                iconPosition="leading"
                icon={<IconCheckCircle />}
                title={t('awards:done')}
                onPress={() => navigation.goBack()}
              />
            </Row>
          )}
        </View>
      ),
    },
  ]

  React.useEffect((): void | (() => void) => {
    if (focusedIndex === 0 || focusedIndex >= pages.length - 1 || isUserScrolling) return

    const interval = setInterval(() => {
      setTime((previousTime) => Math.max(previousTime - TIMER_TICK_MS / 1000, 0))
    }, TIMER_TICK_MS)

    return () => clearInterval(interval)
  }, [focusedIndex, isUserScrolling, pages.length])

  React.useEffect((): void => {
    if (time !== 0 || focusedIndex >= pages.length - 1) return

    listRef.current?.scrollToOffset({ offset: (focusedIndex + 1) * height, animated: true })
    setTime(TIMER_SECONDS)
  }, [focusedIndex, height, pages.length, time])

  return (
    <>
      <FlatList
        scrollEnabled={awards?.personal.participated}
        onScroll={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.y / height)
          setFocusedIndex(index)
        }}
        onScrollBeginDrag={handleUserScrollStart}
        onScrollEndDrag={() => {
          if (!isMomentumScrollingRef.current) {
            handleUserScrollStop()
          }
        }}
        onMomentumScrollBegin={() => {
          isMomentumScrollingRef.current = true
        }}
        onMomentumScrollEnd={() => {
          isMomentumScrollingRef.current = false
          handleUserScrollStop()
        }}
        ref={listRef}
        showsVerticalScrollIndicator={false}
        data={pages}
        decelerationRate={'fast'}
        snapToOffsets={pages.map((_, index) => index * height)}
        style={styles.list}
        contentContainerStyle={styles.content}
        scrollIndicatorInsets={{
          bottom: 0,
        }}
        renderItem={({ item, index }) => <View style={[styles.page, item.accent && styles.accent]}>{item.content}</View>}
      />

      {focusedIndex !== 0 && focusedIndex < pages.length - 1 && (
        <Row
          entering={FadeInDown}
          exiting={FadeOutDown}
          style={styles.footer}
          center
        >
          {pages[focusedIndex].accent && (
            <ProgressBar
              transparentBackground
              variant={'container'}
              hideNumbers
              thickness={8}
              maxValue={TIMER_SECONDS}
              value={time}
            />
          )}
          {!pages[focusedIndex].accent && (
            <ProgressBar
              transparentBackground
              variant={'accent'}
              hideNumbers
              thickness={8}
              maxValue={TIMER_SECONDS}
              value={time}
            />
          )}
        </Row>
      )}
    </>
  )
}

export default Awards
