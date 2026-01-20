import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList, Image, View } from 'react-native'
import Animated, { FadeIn, FadeInDown, interpolate, useAnimatedStyle, useSharedValue, withTiming, ZoomIn, ZoomOut } from 'react-native-reanimated'
import { useQuery } from 'convex/react'
import { api } from 'convex_api'
import { useTranslation } from 'react-i18next'

import useStyles from './styles'
import Accordion from '@components/accordion'
import Button from '@components/button'
import Chip from '@components/chip'
import { IconTrophy } from '@components/icon'
import { TriangleLogo } from '@components/logo'
import Row from '@components/row'
import { TinyArrow } from '@components/tiny_icon'
import Typography from '@components/typography'
import { useSettings } from '@providers/settings'
import { useTheme } from '@providers/theme'
import { ScreenType } from '@router/types'
import { ordinal } from '@utils/ordinals'

const Awards: ScreenType<'awards'> = ({ navigation, route }) => {
  const styles = useStyles()
  const curtainsOpen = useSharedValue(0)
  const { width } = Dimensions.get('window')
  const { edition } = useSettings()

  const [showing, setShowing] = React.useState(0)
  const { semantics } = useTheme()
  const { t, i18n } = useTranslation()

  const results =
    useQuery(api.oscars.getBallotResults, {
      editionId: edition?._id,
      language: i18n.language,
    }) ?? []

  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const distanceFromNow = new Date(edition.date).getTime() - new Date().getTime()
    const updateCountdown = (): void => {
      const distanceFromNow = new Date(edition.date).getTime() - new Date().getTime()
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
  }, [edition.date])

  const handleShowMeResults = (): void => {
    curtainsOpen.value = withTiming(1, { duration: 800 })
    setTimeout(() => {
      setShowing((value) => value + 1)
    }, 800)
    setTimeout(() => {
      curtainsOpen.value = withTiming(0, { duration: 800 })
    }, 1000)
  }

  const handleNext = (): void => {
    setShowing((value) => value + 1)
  }
  const handleBack = (): void => {
    setShowing((value) => value - 1)
  }

  const leftCurtainStyle = useAnimatedStyle(() => ({ transform: [{ translateX: interpolate(curtainsOpen.value, [0, 1], [-width, 0]) }] }))
  const rightCurtainStyle = useAnimatedStyle(() => ({ transform: [{ translateX: interpolate(curtainsOpen.value, [0, 1], [width, 0]) }] }))

  const selectedItem = results.toReversed()[showing]

  const getUnit = (value: number, unit: 'hours' | 'minutes' | 'seconds' | 'days'): string => {
    if (unit === 'days') return value > 1 ? t('awards:days') : t('awards:day')
    if (unit === 'hours') return value > 1 ? t('awards:hours') : t('awards:hour')
    if (unit === 'minutes') return value > 1 ? t('awards:minutes') : t('awards:minute')
    if (unit === 'seconds') return value > 1 ? t('awards:seconds') : t('awards:second')
    return ''
  }

  const getCountdown = (): React.ReactElement => {
    if (countdown.days > 0) return <Typography center>{t('awards:will').replace('{countdown}', countdown.days.toString()).replace('{time_unit}', getUnit(countdown.days, 'days'))}</Typography>
    if (countdown.hours > 0) return <Typography center>{t('awards:will').replace('{countdown}', countdown.hours.toString()).replace('{time_unit}', getUnit(countdown.hours, 'hours'))}</Typography>
    if (countdown.minutes > 0) return <Typography center>{t('awards:will').replace('{countdown}', countdown.minutes.toString()).replace('{time_unit}', getUnit(countdown.minutes, 'minutes'))}</Typography>
    if (countdown.seconds > 0) return <Typography center>{t('awards:will').replace('{countdown}', countdown.seconds.toString()).replace('{time_unit}', getUnit(countdown.seconds, 'seconds'))}</Typography>
    return <Typography center>{t('awards:has').replace('{date}', new Date(edition.date).toLocaleDateString())}</Typography>
  }

  return (
    <>
      <View style={styles.root}>
        {showing === 0 && (
          <View style={{ padding: 20, width: '100%', gap: 40, flex: 1, alignItems: 'center' }}>
            <TriangleLogo
              style={styles.triangle}
              color={semantics.accent.base.default}
            />
            <View>
              <Typography
                header
                color={semantics.background.foreground.light}
                center
              >
                {t('awards:call').replace('{count}', ordinal(edition?.number ?? 0, i18n.language))}
              </Typography>
              <Typography
                display
                center
              >
                {t('awards:name')}
              </Typography>
            </View>
            {getCountdown()}

            {edition.hasVoted && (
              <View style={styles.footer}>
                <Typography
                  legend
                  center
                >
                  {t('awards:coming_soon')}
                </Typography>
                <Button
                  variant="brand"
                  icon={<IconTrophy />}
                  title={'show me the winners'}
                  onPress={handleShowMeResults}
                />
              </View>
            )}
          </View>
        )}

        {showing !== 0 && (
          <>
            <FlatList
              alwaysBounceVertical={false}
              ListHeaderComponent={
                <Animated.View
                  key={selectedItem?.group.groupId}
                  style={{ marginTop: 20, gap: 20, marginBottom: 120 }}
                  entering={FadeIn.duration(1000)}
                >
                  <Typography
                    display
                    center
                  >
                    {selectedItem?.group.name}
                  </Typography>
                  <Typography
                    description
                    center
                  >
                    {selectedItem?.group.tagline}
                  </Typography>
                </Animated.View>
              }
              collapsable={false}
              contentContainerStyle={{ gap: 16, padding: 20, paddingTop: 120, paddingBottom: 160 }}
              style={{ width: '100%' }}
              data={selectedItem?.categories}
              renderItem={({ item, index }) => (
                <Accordion
                  key={item.categoryId}
                  entering={FadeInDown.delay(100 * index)}
                  header={{
                    title: item.name,
                    trailingArea: (
                      <Typography>
                        <Typography
                          legend
                          color={semantics.brand.foreground.default}
                        >
                          + {item.points}{' '}
                        </Typography>
                        {item.bonus > 0 && (
                          <Typography
                            legend
                            color={semantics.positive.foreground.default}
                          >
                            + {item.bonus}{' '}
                          </Typography>
                        )}
                        {item.penalty > 0 && (
                          <Typography
                            legend
                            color={semantics.negative.foreground.default}
                          >
                            + {item.penalty}{' '}
                          </Typography>
                        )}
                      </Typography>
                    ),
                  }}
                  content={
                    <View style={{ gap: 8 }}>
                      <Typography legend>{item.nominations.length > 0 ? t('awards:your_rank') : t('awards:not_ranked')}</Typography>

                      {item.nominations.length > 0 && (
                        <FlatList
                          horizontal
                          showsHorizontalScrollIndicator={false}
                          style={{ marginHorizontal: -16, paddingHorizontal: 16, marginBottom: 8 }}
                          contentContainerStyle={{ gap: 12 }}
                          data={item.nominations}
                          renderItem={({ item: movie, index }) => (
                            <View>
                              <Image
                                source={{ uri: `https:image.tmdb.org/t/p/w200${movie.posterPath}` }}
                                style={{ width: 60, aspectRatio: 2 / 3 }}
                              />
                              <View style={{ position: 'absolute', backgroundColor: 'rgba(0,0,0,0.7)', bottom: 0, left: 0, right: 0, top: 0, alignItems: 'center', justifyContent: 'center', padding: 4, borderWidth: 1, borderColor: movie.winner ? semantics.brand.foreground.default : semantics.container.stroke.default }}>
                                <Chip
                                  title={`+${Math.max(5 - index, 1)}`}
                                  variant={movie.winner ? 'brand' : 'container'}
                                />
                                <View></View>
                              </View>
                            </View>
                          )}
                        />
                      )}
                    </View>
                  }
                />
              )}
            />

            <View style={styles.footer}>
              <Row>
                {results.toReversed().map((item, index) => {
                  if (index < showing)
                    return (
                      <Row
                        key={item.group.groupId}
                        entering={ZoomIn.springify().delay(100)}
                        exiting={ZoomOut.springify()}
                      >
                        {index !== 0 && <Typography>+</Typography>}

                        <Chip
                          key={item.group.groupId}
                          title={item.categories.reduce((acc, category) => acc + category.points + category.bonus + category.penalty, 0)}
                        />
                      </Row>
                    )
                })}
              </Row>
              <Row>
                <Button
                  icon={<TinyArrow orientation="left" />}
                  title={'back'}
                  onPress={handleBack}
                  iconPosition="trailing"
                />
                <Button
                  variant="brand"
                  icon={<TinyArrow orientation="right" />}
                  title={'next'}
                  onPress={handleNext}
                />
              </Row>
            </View>
          </>
        )}
      </View>

      <Animated.View style={[styles.curtain, styles.leftCurtain, leftCurtainStyle]} />
      <Animated.View style={[styles.curtain, styles.rightCurtain, rightCurtainStyle]} />
    </>
  )
}

export default Awards
