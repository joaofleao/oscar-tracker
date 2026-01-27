import { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import { Authenticated, Unauthenticated, useConvexAuth, useMutation, useQuery } from 'convex/react'
import { api } from 'convex_api'
import { useTranslation } from 'react-i18next'

import useStyles from './styles'
import Avatar from '@components/avatar'
import Button from '@components/button'
import EmptyState from '@components/empty_state'
import { IconOscar, IconSettings } from '@components/icon'
import Row from '@components/row'
import SegmentedControl from '@components/segmented_control'
import SmallCard from '@components/small_card'
import { TinyCheckmark, TinyPlus, TinyX } from '@components/tiny_icon'
import Typography from '@components/typography'
import useAnimations from '@providers/animations/useAnimations'
import { ScreenType } from '@router/types'

const Profile: ScreenType<'profile'> = ({ navigation, route }) => {
  const styles = useStyles()
  const { t } = useTranslation()

  const { isAuthenticated, isLoading } = useConvexAuth()
  const { onScrollProfile, profileRef } = useAnimations()
  const startFollowing = useMutation(api.user.startFollowing)
  const stopFollowing = useMutation(api.user.stopFollowing)

  const [flow, setFlow] = useState('following')

  const followers = useQuery(api.user.getFollowers) || []
  const following = useQuery(api.user.getFollowing) || []

  const user = useQuery(api.user.getCurrentUser)

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigation.navigate('auth')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const sections = {
    following: t('profile:following'),
    followers: t('profile:followers'),
  } as const

  const header = (
    <View style={styles.root}>
      <Avatar
        image={user?.imageURL}
        name={user?.name}
      />

      <Authenticated>
        <View style={styles.profile}>
          <Typography>{user?.name}</Typography>
          <Typography description>{user?.username}</Typography>
        </View>
      </Authenticated>

      <Row>
        <Button
          icon={<IconSettings />}
          title={t('profile:settings')}
          onPress={() => navigation.navigate('settings')}
        />

        <Unauthenticated>
          <Button
            icon={<IconOscar />}
            variant="brand"
            title={t('profile:sign_in')}
            onPress={() => navigation.navigate('auth')}
          />
        </Unauthenticated>
      </Row>

      <View style={styles.centerContainer}>
        <SegmentedControl
          selected={flow}
          onChange={setFlow}
          options={sections}
        />
      </View>
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
      style={styles.list}
      contentContainerStyle={styles.content}
      renderItem={({ item }) => (
        <SmallCard
          _id={item._id}
          squared
          image={item.imageURL}
          title={item.name}
          description={item.username}
          additional={item.followsYou ? t('search:follows_you') : undefined}
          button={{
            icon: <TinyX />,
            title: t('profile:stop_following'),
            onPress: (): void => {
              stopFollowing({ friendId: item._id })
            },
          }}
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
      style={styles.list}
      contentContainerStyle={styles.content}
      renderItem={({ item }) => (
        <SmallCard
          _id={item._id}
          squared
          image={item.imageURL}
          title={item.name}
          description={item.username}
          button={{
            icon: item.following ? <TinyCheckmark /> : <TinyPlus />,
            disabled: item.following,
            title: item.following ? t('profile:following') : t('profile:follow'),
            onPress: (): void => {
              startFollowing({ friendId: item._id })
            },
          }}
        />
      )}
    />
  )

  return (
    <>
      {flow === 'following' && renderFollowing}
      {flow === 'followers' && renderFollowers}
    </>
  )
}

export default Profile
