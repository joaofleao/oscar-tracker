import { useState } from 'react'
import { Dimensions, FlatList, Image, View } from 'react-native'
import { useQuery } from 'convex/react'
import { api } from 'convex_api'
import { useTranslation } from 'react-i18next'

import useStyles from './styles'
import EmptyState from '@components/empty_state'
import GalleryView from '@components/gallery_view'
import { IconSettings } from '@components/icon'
import IconButton from '@components/icon_button'
import SegmentedControl from '@components/segmented_control'
import Select from '@components/select'
import SmallCard from '@components/small_caroussel/small_card'
import Typography from '@components/typography'
import useEditions from '@providers/edition/use_edition'
import { useTheme } from '@providers/theme'
import { ScreenType } from '@router/types'

const Profile: ScreenType<'profile'> = ({ navigation, route }) => {
  const styles = useStyles()
  const { t } = useTranslation()
  const { editions, currentEdition, setCurrentEdition } = useEditions()
  const { semantics } = useTheme()

  const [flow, setFlow] = useState('movies')

  const watchedMovies = useQuery(api.oscars.getWatchedMoviesFromEdition, { editionId: currentEdition }) || []
  const followers = useQuery(api.user.getFollowers) || []
  const following = useQuery(api.user.getFollowing) || []

  const user = useQuery(api.user.getCurrentUser)

  const sections = {
    movies: t('profile:movies'),
    following: t('profile:following'),
    followers: t('profile:followers'),
  } as const

  const renderFollowing = (
    <FlatList
      ListEmptyComponent={
        <EmptyState
          title={t('profile:empty_following_title')}
          description={t('profile:empty_following_description')}
        />
      }
      data={following}
      style={{ width: '100%', padding: 20 }}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      numColumns={2}
      renderItem={({ item }) => (
        <SmallCard
          style={{ width: (Dimensions.get('window').width - 56) / 2 }}
          image={item.image}
          label={item.name}
          description={item.username}
        />
      )}
    />
  )
  const renderFollowers = (
    <FlatList
      ListEmptyComponent={
        <EmptyState
          title={t('profile:empty_followers_title')}
          description={t('profile:empty_followers_description')}
        />
      }
      data={followers}
      style={{ width: '100%', padding: 20 }}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      numColumns={2}
      renderItem={({ item }) => (
        <SmallCard
          style={{ width: (Dimensions.get('window').width - 56) / 2 }}
          image={item.image}
          label={item.name}
          description={item.username}
        />
      )}
    />
  )

  const renderMovies = (
    <GalleryView
      empty={
        <EmptyState
          title={t('profile:empty_movies_title')}
          description={t('profile:empty_movies_description')}
        />
      }
      data={watchedMovies.map((el) => {
        return { _id: el._id, title: el.title, posterPath: el.posterPath, date: new Date(el.watchedAt).toLocaleDateString() }
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
          <View style={styles.avatarPlaceholder} />
        )}

        <View style={styles.profile}>
          <Typography>{user?.name}</Typography>
          <Typography description>{user?.username}</Typography>
        </View>
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
