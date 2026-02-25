import { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import Animated, { FadeInDown, FadeInRight, FadeOutLeft, FadeOutUp, LinearTransition } from 'react-native-reanimated'
import { useTranslation } from 'react-i18next'

import useStyles from './styles'
import Blur from '@components/blur'
import Button from '@components/button'
import Chip from '@components/chip'
import Column from '@components/column'
import { IconCheckCircle, IconDiscard } from '@components/icon'
import Row from '@components/row'
import Typography from '@components/typography'
import { useEdition } from '@providers/edition'
import { useUser } from '@providers/user'
import { ScreenType } from '@router/types'

const FilterMovies: ScreenType<'filter_movies'> = ({ navigation }) => {
  const styles = useStyles()
  const { t } = useTranslation()
  const { user, following } = useUser()

  const { movies, statusFilter, setStatusFilter, friendFilter, setFriendFilter, providersFilter, setProvidersFilter } = useEdition()

  const [localStatus, setLocalStatus] = useState(statusFilter)
  const [localFriends, setLocalFriends] = useState<string[]>(friendFilter)
  const [localProviders, setLocalProviders] = useState<number[]>(providersFilter)

  const providers = movies.reduce<
    {
      logo_path: string
      provider_id: number
      provider_name: string
      type: 'buy' | 'flatrate' | 'rent'
    }[]
  >((providers, movie) => {
    movie.providers.forEach((provider) => {
      if (!providers.find((p) => p.provider_id === provider.provider_id)) {
        providers.push(provider)
      }
    })
    return providers
  }, [])

  const [showingFriends, setShowingFriends] = useState(Math.min(5, following.length))
  const [showingProviders, setShowingProviders] = useState(Math.min(5, providers.length))

  const handleSave = (): void => {
    setStatusFilter(localStatus)
    setFriendFilter(localFriends)
    setProvidersFilter(localProviders)
    navigation.goBack()
  }

  const handleDiscard = (): void => {
    setLocalStatus(statusFilter)
    setLocalFriends(friendFilter)
    setLocalProviders(providersFilter)
  }

  const handleClear = (): void => {
    setLocalStatus('all')
    setStatusFilter('all')
    if (user) {
      setLocalFriends([user._id])
      setFriendFilter([user._id])
    } else {
      setLocalFriends([])
      setFriendFilter([])
    }
    setLocalProviders([])
    setProvidersFilter([])
    navigation.goBack()
  }

  const hasChanges = localStatus !== statusFilter || localFriends !== friendFilter || localProviders !== providersFilter
  const isDefault = statusFilter === 'all' && friendFilter.length === 1 && providersFilter.length === 0

  return (
    <>
      <Blur style={styles.header}>
        <Typography>{t('filter_movies:filter')}</Typography>
      </Blur>

      <ScrollView
        style={styles.root}
        contentContainerStyle={styles.content}
      >
        {user !== undefined && user !== null && (
          <Column>
            <Typography legend>{t('filter_movies:with_status')}</Typography>
            <Row
              middle
              wrap
              start
            >
              <Chip
                title={t('filter_movies:all')}
                variant={localStatus === 'all' ? 'brand' : 'container'}
                onPress={() => setLocalStatus('all')}
              />
              <Chip
                title={t('filter_movies:watched')}
                variant={localStatus === 'watched' ? 'brand' : 'container'}
                onPress={() => setLocalStatus('watched')}
              />
              <Chip
                title={t('filter_movies:unwatched')}
                variant={localStatus === 'unwatched' ? 'brand' : 'container'}
                onPress={() => setLocalStatus('unwatched')}
              />
            </Row>
          </Column>
        )}
        {user !== undefined && user !== null && (
          <Column>
            <Typography legend>{t('filter_movies:by_friends')}</Typography>
            <Row
              wrap
              middle
              start
            >
              <Chip
                image={user.imageURL ?? ''}
                key={user._id}
                onPress={() => setLocalFriends((prev) => (prev.includes(user._id) ? (prev.length === 1 ? prev : prev.filter((id) => id !== user._id)) : [...prev, user._id]))}
                title={user.name ?? ''}
                variant={localFriends.includes(user._id) ? 'brand' : 'container'}
              />

              {following
                .sort((a, b) => (a.name && b.name ? a.name.localeCompare(b.name) : 0))
                .slice(0, showingFriends)
                .map((friend, index) => (
                  <Chip
                    entering={FadeInRight.delay(10 * index)}
                    exiting={FadeOutLeft.delay(10 * index)}
                    image={friend.imageURL ?? ''}
                    key={friend._id}
                    onPress={() => setLocalFriends((prev) => (prev.includes(friend._id) ? (prev.length === 1 ? prev : prev.filter((id) => id !== friend._id)) : [...prev, friend._id]))}
                    title={friend.name}
                    variant={localFriends.includes(friend._id) ? 'brand' : 'container'}
                  />
                ))}

              {following.length > 5 && (
                <Chip
                  layout={LinearTransition}
                  key={'more_friends'}
                  onPress={() => setShowingFriends(showingFriends === 5 ? -1 : 5)}
                  title={showingFriends === 5 ? t('filter_movies:show_more') : t('filter_movies:show_less')}
                  variant={'container'}
                />
              )}
            </Row>
          </Column>
        )}

        <Column layout={LinearTransition}>
          <Typography legend>{t('filter_movies:by_provider')}</Typography>
          <Row
            middle
            wrap
            start
          >
            <Chip
              title={t('filter_movies:all')}
              onPress={() => setLocalProviders([])}
              variant={localProviders.length === 0 ? 'brand' : 'container'}
            />
            {providers.slice(0, showingProviders).map((provider, index) => (
              <Chip
                entering={FadeInRight.delay(10 * index)}
                exiting={FadeOutLeft.delay(10 * index)}
                image={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                key={provider.provider_id}
                onPress={() => setLocalProviders((prev) => (prev.includes(provider.provider_id) ? prev.filter((p) => p !== provider.provider_id) : [...prev, provider.provider_id]))}
                title={provider.provider_name}
                variant={localProviders.includes(provider.provider_id) ? 'brand' : 'container'}
              />
            ))}
            {providers.length > 5 && (
              <Chip
                layout={LinearTransition}
                key={'more_providers'}
                onPress={() => setShowingProviders(showingProviders === 5 ? -1 : 5)}
                title={showingProviders === 5 ? t('filter_movies:show_more') : t('filter_movies:show_less')}
                variant={'container'}
              />
            )}
          </Row>
        </Column>
      </ScrollView>

      <Animated.View
        style={styles.footer}
        entering={FadeInDown.delay(300)}
        exiting={FadeOutUp.delay(300)}
      >
        {hasChanges && (
          <>
            <Button
              icon={<IconDiscard />}
              onPress={handleDiscard}
            />

            <Button
              onPress={handleSave}
              icon={<IconCheckCircle />}
              variant="brand"
              title={t('filter_movies:save')}
            />
          </>
        )}
        {!hasChanges && !isDefault && (
          <Button
            onPress={handleClear}
            icon={<IconDiscard />}
            variant="brand"
            title={t('filter_movies:restore_defaults')}
          />
        )}
      </Animated.View>
    </>
  )
}

export default FilterMovies
