import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import { RefreshControl } from 'react-native-gesture-handler'
import { Authenticated, Unauthenticated, useConvexAuth, useMutation } from 'convex/react'
import { api } from 'convex_api'
import { useTranslation } from 'react-i18next'

import useStyles from './styles'
import Avatar from '@components/avatar'
import Button from '@components/button'
import Column from '@components/column'
import EmptyState from '@components/empty_state'
import Header from '@components/header'
import { IconOscar, IconSettings } from '@components/icon'
import Row from '@components/row'
import SegmentedControl from '@components/segmented_control'
import SmallCard from '@components/small_card'
import { TinyCheckmark, TinyPlus, TinyX } from '@components/tiny_icon'
import Typography from '@components/typography'
import useHeaderAnimation from '@hooks/useHeaderAnimation'
import { useEdition } from '@providers/edition'
import { useUser } from '@providers/user'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { ScreenType } from '@router/types'

const Profile: ScreenType<'profile'> = ({ navigation, route }) => {
  const styles = useStyles()
  const { t } = useTranslation()
  const { user, followers, following, refreshFollowers, refreshFollowing } = useUser()
  const { movies } = useEdition()
  const [refreshing, setRefreshing] = React.useState(false)

  const { isAuthenticated, isLoading } = useConvexAuth()
  const { onScroll, animation } = useHeaderAnimation()
  const startFollowing = useMutation(api.user.startFollowing)
  const stopFollowing = useMutation(api.user.stopFollowing)

  const [flow, setFlow] = useState('following')
  const tabBarHeight = useBottomTabBarHeight()

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigation.navigate('auth')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)

    if (flow === 'followers') refreshFollowers()
    if (flow === 'following') refreshFollowing()
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [refreshFollowers, refreshFollowing, flow])

  const sections = {
    following: t('profile:following'),
    followers: t('profile:followers'),
  } as const

  const header = (
    <View style={styles.root}>
      <Column
        style={styles.avatar}
        middle
      >
        <Avatar
          image={user?.imageURL}
          name={user?.name}
        />

        <Unauthenticated>
          <Row center>
            <Button
              icon={<IconOscar />}
              variant="brand"
              title={t('profile:sign_in')}
              onPress={() => navigation.navigate('auth')}
            />
          </Row>
        </Unauthenticated>

        <Authenticated>
          <View>
            <Typography center>{user?.name}</Typography>
            <Typography
              center
              description
            >
              {user?.username}
            </Typography>
          </View>
        </Authenticated>
      </Column>

      <Authenticated>
        <Row center>
          <SegmentedControl
            selected={flow}
            onChange={setFlow}
            options={sections}
          />
        </Row>
      </Authenticated>

      <Unauthenticated>
        <EmptyState
          loading={isLoading}
          title={t('profile:empty_title_unauthenticated')}
          description={t('profile:empty_description_unauthenticated')}
        />
      </Unauthenticated>
    </View>
  )

  const renderFollowing = (
    <FlatList
      refreshing={refreshing}
      onRefresh={onRefresh}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      onScroll={onScroll}
      ListHeaderComponent={header}
      ListEmptyComponent={
        <Authenticated>
          <EmptyState
            loading={isLoading}
            title={t('profile:empty_following_title')}
            description={t('profile:empty_following_description')}
          />
        </Authenticated>
      }
      data={following.sort((a, b) => b.watched - a.watched)}
      style={styles.list}
      contentContainerStyle={styles.content}
      renderItem={({ item }) => (
        <SmallCard
          _id={item._id}
          squared
          image={item.imageURL}
          title={item.name}
          badge={{
            title: `${item.watched}/${movies.length}`,
            variant: item.watched === movies.length ? 'brand' : 'container',
          }}
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
      refreshing={refreshing}
      onRefresh={onRefresh}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      onScroll={onScroll}
      ListHeaderComponent={header}
      ListEmptyComponent={
        <Authenticated>
          <EmptyState
            loading={isLoading}
            title={t('profile:empty_followers_title')}
            description={t('profile:empty_followers_description')}
          />
        </Authenticated>
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
      <Header
        animation={animation}
        button={{
          icon: <IconSettings />,
          onPress: () => navigation.navigate('settings'),
        }}
      />
      {flow === 'following' && renderFollowing}
      {flow === 'followers' && renderFollowers}
      <View style={{ height: tabBarHeight + 20 }} />
    </>
  )
}

export default Profile
