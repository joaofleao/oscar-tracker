import { useEffect, useState } from 'react'
import { Dimensions, FlatList, View } from 'react-native'
import { Authenticated, Unauthenticated, useConvexAuth, useQuery } from 'convex/react'
import { api } from 'convex_api'
import { useTranslation } from 'react-i18next'

import useStyles from './styles'
import Avatar from '@components/avatar'
import Button from '@components/button'
import EmptyState from '@components/empty_state'
import GalleryView from '@components/gallery_view'
import { IconOscar } from '@components/icon'
import SegmentedControl from '@components/segmented_control'
import SmallCard from '@components/small_card'
import Typography from '@components/typography'
import useAnimations from '@providers/animations/useAnimations'
import { useSettings } from '@providers/settings'
import { ScreenType } from '@router/types'

const Profile: ScreenType<'profile'> = ({ navigation, route }) => {
  const styles = useStyles()
  const { i18n, t } = useTranslation()
  const { edition } = useSettings()

  const { isAuthenticated, isLoading } = useConvexAuth()
  const { onScrollProfile, profileRef } = useAnimations()

  const [flow, setFlow] = useState('movies')

  const watchedMovies = useQuery(api.oscars.getWatchedMoviesFromEdition, { editionId: edition?._id, language: i18n.language }) || []
  const followers = useQuery(api.user.getFollowers) || []
  const following = useQuery(api.user.getFollowing) || []

  const user = useQuery(api.user.getCurrentUser)

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigation.navigate('auth')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const sections = {
    movies: t('profile:movies'),
    following: t('profile:following'),
    followers: t('profile:followers'),
  } as const

  const header = (
    <View style={styles.root}>
      <Avatar
        image={user?.image}
        name={user?.name}
      />

      <Authenticated>
        <View style={styles.profile}>
          <Typography>{user?.name}</Typography>
          <Typography description>{user?.username}</Typography>
        </View>
      </Authenticated>
      <Unauthenticated>
        <Button
          icon={<IconOscar />}
          variant="brand"
          title={t('profile:sign_in')}
          onPress={() => navigation.navigate('auth')}
        />
      </Unauthenticated>

      <View style={styles.centerContainer}>
        <SegmentedControl
          selected={flow}
          onChange={setFlow}
          options={sections}
        />
      </View>

      {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 4, alignItems: 'center', gap: 8, width: '100%' }}>
        <Typography legend>02</Typography>
        <View style={{ height: 4, flex: 1, backgroundColor: semantics.brand.foreground.light }} />
        <Typography legend>56</Typography>
      </View> */}
    </View>
  )

  const renderFollowing = (
    <FlatList
      onScroll={onScrollProfile}
      ref={profileRef}
      ListHeaderComponent={header}
      ListEmptyComponent={
        isAuthenticated ? (
          <EmptyState
            loading={isLoading}
            title={t('profile:empty_following_title')}
            description={t('profile:empty_following_description')}
          />
        ) : (
          <EmptyState
            loading={isLoading}
            title={t('profile:empty_title_unauthenticated')}
            description={t('profile:empty_description_unauthenticated')}
          />
        )
      }
      data={following}
      style={styles.galleryListContainer}
      columnWrapperStyle={styles.galleryColumnWrapper}
      contentContainerStyle={styles.galleryContentContainer}
      numColumns={2}
      renderItem={({ item }) => (
        <SmallCard
          _id={item._id}
          squared
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
      onScroll={onScrollProfile}
      ref={profileRef}
      ListHeaderComponent={header}
      ListEmptyComponent={
        isAuthenticated ? (
          <EmptyState
            loading={isLoading}
            title={t('profile:empty_followers_title')}
            description={t('profile:empty_followers_description')}
          />
        ) : (
          <EmptyState
            loading={isLoading}
            title={t('profile:empty_title_unauthenticated')}
            description={t('profile:empty_description_unauthenticated')}
          />
        )
      }
      data={followers}
      style={styles.galleryListContainer}
      columnWrapperStyle={styles.galleryColumnWrapper}
      contentContainerStyle={styles.galleryContentContainer}
      numColumns={2}
      renderItem={({ item }) => (
        <SmallCard
          _id={item._id}
          squared
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
      contentContainerStyle={styles.galleryContentContainer}
      onScroll={onScrollProfile}
      ref={profileRef}
      header={header}
      empty={
        isAuthenticated ? (
          <EmptyState
            loading={isLoading}
            title={t('profile:empty_movies_title')}
            description={t('profile:empty_movies_description')}
          />
        ) : (
          <EmptyState
            loading={isLoading}
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
      {flow === 'movies' && renderMovies}
      {flow === 'following' && renderFollowing}
      {flow === 'followers' && renderFollowers}
    </>
  )
}

export default Profile
