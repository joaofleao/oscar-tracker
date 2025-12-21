import { useEffect, useState } from 'react'
import { Dimensions, FlatList, Image, View } from 'react-native'
import { Authenticated, Unauthenticated, useConvexAuth, useQuery } from 'convex/react'
import { api } from 'convex_api'
import { useTranslation } from 'react-i18next'

import useStyles from './styles'
import Button from '@components/button'
import EmptyState from '@components/empty_state'
import GalleryView from '@components/gallery_view'
import { IconPerson, IconSettings } from '@components/icon'
import IconButton from '@components/icon_button'
import SegmentedControl from '@components/segmented_control'
import Select from '@components/select'
import SmallCard from '@components/small_card'
import Typography from '@components/typography'
import useEditions from '@providers/edition/use_edition'
import { useTheme } from '@providers/theme'
import { ScreenType } from '@router/types'

const Profile: ScreenType<'profile'> = ({ navigation, route }) => {
  const styles = useStyles()
  const { t } = useTranslation()
  const { editions, currentEdition, setCurrentEdition } = useEditions()
  const { semantics } = useTheme()
  const { isAuthenticated } = useConvexAuth()

  const [flow, setFlow] = useState('movies')

  const watchedMovies = useQuery(api.oscars.getWatchedMoviesFromEdition, { editionId: currentEdition }) || []
  const followers = useQuery(api.user.getFollowers) || []
  const following = useQuery(api.user.getFollowing) || []

  const user = useQuery(api.user.getCurrentUser)

  useEffect(() => {
    if (!isAuthenticated) navigation.navigate('auth')
  }, [])

  const sections = {
    movies: t('profile:movies'),
    following: t('profile:following'),
    followers: t('profile:followers'),
  } as const

  const renderFollowing = (
    <FlatList
      ListEmptyComponent={
        isAuthenticated ? (
          <EmptyState
            title={t('profile:empty_following_title')}
            description={t('profile:empty_following_description')}
          />
        ) : (
          <EmptyState
            title={t('profile:empty_title_unauthenticated')}
            description={t('profile:empty_description_unauthenticated')}
          />
        )
      }
      data={following}
      style={{ width: '100%', padding: 20 }}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      numColumns={2}
      renderItem={({ item }) => (
        <SmallCard
          _id={item._id}
          style={{ width: (Dimensions.get('window').width - 56) / 2 }}
          image={item.image}
          title={item.name}
          description={item.username}
        />
      )}
    />
  )
  const renderFollowers = (
    <FlatList
      ListEmptyComponent={
        isAuthenticated ? (
          <EmptyState
            title={t('profile:empty_followers_title')}
            description={t('profile:empty_followers_description')}
          />
        ) : (
          <EmptyState
            title={t('profile:empty_title_unauthenticated')}
            description={t('profile:empty_description_unauthenticated')}
          />
        )
      }
      data={followers}
      style={{ width: '100%', padding: 20 }}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      numColumns={2}
      renderItem={({ item }) => (
        <SmallCard
          _id={item._id}
          style={{ width: (Dimensions.get('window').width - 56) / 2 }}
          image={item.image}
          title={item.name}
          description={item.username}
        />
      )}
    />
  )
  const renderMovies = (
    <GalleryView
      empty={
        isAuthenticated ? (
          <EmptyState
            title={t('profile:empty_movies_title')}
            description={t('profile:empty_movies_description')}
          />
        ) : (
          <EmptyState
            title={t('profile:empty_title_unauthenticated')}
            description={t('profile:empty_description_unauthenticated')}
          />
        )
      }
      data={watchedMovies.map((el) => {
        return {
          _id: el._id,
          title: el.title,
          posterPath: el.posterPath,
          date: new Date(el.watchedAt).toLocaleDateString(),
          onPress: (): void => {
            navigation.navigate('movie', { tmdbId: el.tmdbId })
          },
        }
      })}
    />
  )

  return (
    <>
      <View style={styles.root}>
        <View style={{ alignSelf: 'center' }}>
          <Typography
            center
            color={semantics.accent.base.default}
          >
            OSCAR TRACKER
          </Typography>

          <Select
            label={t('home:select_edition')}
            data={editions?.map((edition) => ({
              name: `${t('home:edition')} ${edition.number} - ${edition.year}`,
              id: edition._id,
            }))}
            onSelect={setCurrentEdition}
            selected={currentEdition}
            renderAnchor={({ selectedOption, setVisible, visible }) => (
              <Typography
                onPress={() => setVisible(!visible)}
                center
                legend
                color={semantics.background.foreground.light}
              >
                {selectedOption?.name}
              </Typography>
            )}
          />
        </View>
        {user?.image ? (
          <Image
            style={styles.avatar}
            source={{ uri: user.image }}
          />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <IconPerson
              size={40}
              color={semantics.background.foreground.light}
            />
          </View>
        )}

        <Authenticated>
          <View style={styles.profile}>
            <Typography>{user?.name}</Typography>
            <Typography description>{user?.username}</Typography>
          </View>
        </Authenticated>
        <Unauthenticated>
          <Button
            variant="accent"
            title={t('profile:sign_in')}
            onPress={() => navigation.navigate('auth')}
          />
        </Unauthenticated>
      </View>

      <View style={{ alignItems: 'center', gap: 16 }}>
        <SegmentedControl
          selected={flow}
          onChange={setFlow}
          options={sections}
        />
      </View>

      {flow === 'movies' && renderMovies}
      {flow === 'following' && renderFollowing}
      {flow === 'followers' && renderFollowers}

      <View style={styles.floatingHeader}>
        <IconButton
          icon={<IconSettings />}
          onPress={() => navigation.navigate('settings')}
        />
      </View>
    </>
  )
}

export default Profile
