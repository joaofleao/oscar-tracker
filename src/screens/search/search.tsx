import { useState } from 'react'
import { Platform } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Animated, { CurvedTransition, FadeInDown, FadeOutDown, FadeOutUp } from 'react-native-reanimated'
import { useConvexAuth, useMutation } from 'convex/react'
import { api } from 'convex_api'
import { useTranslation } from 'react-i18next'

import useStyles from './styles'
import Blur from '@components/blur'
import Button from '@components/button'
import Caroussel from '@components/caroussel'
import { IconX } from '@components/icon'
import MediumCard from '@components/medium_card'
import Row from '@components/row/row'
import SearchInput from '@components/search_input'
import Section from '@components/section'
import SmallCard from '@components/small_card'
import { TinyPlus } from '@components/tiny_icon'
import Typography from '@components/typography'
import { useEdition } from '@providers/edition'
import { useTheme } from '@providers/theme'
import { useUser } from '@providers/user'
import { ScreenType } from '@router/types'

const Search: ScreenType<'search'> = ({ navigation, route }) => {
  const { spoilers, followers, following } = useUser()

  const { movies, nominations, userWatches } = useEdition()
  const styles = useStyles()
  const { t } = useTranslation()
  const { semantics } = useTheme()

  const [query, setQuery] = useState<string>('')

  const refinedFollowers = followers.map((user) => ({
    ...user,
    followsYou: true,
  }))
  const refinedFollowing = following.map((user) => ({
    ...user,
    following: true,
  }))

  const users = [refinedFollowers, refinedFollowing].flat().reduce(
    (acc, current) => {
      const x = acc.find((item) => item._id === current._id)
      if (!x) {
        return acc.concat([current])
      }
      return acc
    },
    [] as typeof refinedFollowers,
  )

  const results = {
    categories: nominations.filter((item) => item.category.name.toLowerCase().includes(query?.toLowerCase() ?? '')).map((item) => item.category),
    movies: movies.filter((movie) => movie.title.toLowerCase().includes(query?.toLowerCase() ?? '')),
    users: users.filter((user) => (user.name ? user.name.toLowerCase().includes(query?.toLowerCase() ?? '') : false || user.username ? user.username.toLowerCase().includes(query?.toLowerCase() ?? '') : false)),
  }

  const startFollowing = useMutation(api.user.startFollowing)
  const { isAuthenticated } = useConvexAuth()

  const handleSearch = async (query: string): Promise<void> => {
    if (query.trim() === '') {
      setQuery('')
      return
    }

    setQuery(query.trim())
  }

  const header = (
    <Blur style={[styles.header]}>
      <Typography center>{t('search:title')}</Typography>

      <Row>
        <SearchInput
          placeholder=""
          autoComplete="off"
          autoCorrect={false}
          autoCapitalize="none"
          autoFocus
          style={styles.input}
          debounce={200}
          onChangeText={(text) => {
            if (text.trim() === '') setQuery('')
          }}
          onDebouncedText={handleSearch}
          onClear={() => setQuery('')}
        />
        {Platform.OS === 'ios' && (
          <Button
            onPress={navigation.goBack}
            icon={<IconX />}
          />
        )}
      </Row>
    </Blur>
  )

  const noResultsState = (
    <Animated.View
      style={styles.empty}
      entering={FadeInDown}
      exiting={FadeOutUp}
    >
      <Typography legend>{t('search:no_results')}</Typography>
    </Animated.View>
  )

  const emptyState = (
    <Animated.View
      style={styles.empty}
      entering={FadeInDown}
      exiting={FadeOutUp}
    >
      <Typography
        center
        color={semantics.background.foreground.light}
      >
        {t('search:empty_state')}
      </Typography>
    </Animated.View>
  )

  return (
    <>
      {header}
      <ScrollView
        automaticallyAdjustKeyboardInsets
        style={styles.root}
        contentContainerStyle={styles.content}
      >
        {query === '' && emptyState}
        {query !== '' && (
          <>
            <Section
              title={t('search:categories')}
              entering={FadeInDown}
              exiting={FadeOutDown}
            >
              {results?.categories.length > 0 ? (
                <Caroussel
                  item={SmallCard}
                  data={results?.categories.map((category, index) => ({
                    entering: FadeInDown.delay(index * 100),
                    exiting: FadeOutDown,
                    layout: CurvedTransition,
                    ...category,
                    title: category.name,
                    onPress: (): void => {
                      navigation.navigate('category', { categoryId: category._id })
                    },
                  }))}
                />
              ) : (
                noResultsState
              )}
            </Section>
            <Section
              title={t('search:users')}
              entering={FadeInDown}
              exiting={FadeOutDown}
            >
              {results.users.length > 0 ? (
                <Caroussel
                  item={SmallCard}
                  data={results.users.map((user, index) => ({
                    ...user,
                    entering: FadeInDown.delay(index * 100),
                    exiting: FadeOutDown,
                    layout: CurvedTransition,
                    squared: true,
                    image: user.imageURL,
                    title: user.name,
                    description: user.username,
                    additional: user.followsYou ? t('search:follows_you') : undefined,
                    button: {
                      icon: user.following ? undefined : <TinyPlus />,
                      disabled: user.following,
                      title: user.following ? t('search:following') : t('search:follow'),
                      onPress: (): void => {
                        if (!isAuthenticated) return navigation.navigate('auth')
                        startFollowing({ friendId: user._id })
                      },
                    },
                  }))}
                />
              ) : (
                noResultsState
              )}
            </Section>
            <Section
              title={t('search:movies')}
              entering={FadeInDown}
              exiting={FadeOutDown}
            >
              {results?.movies.length > 0 ? (
                <Caroussel
                  item={MediumCard}
                  data={results?.movies.map((movie, index) => ({
                    key: movie._id,
                    ...movie,
                    entering: FadeInDown.delay(index * 100),
                    exiting: FadeOutDown,
                    layout: CurvedTransition,

                    spoiler: spoilers.hidePoster && !userWatches.find((movieId) => movieId === movie._id),
                    squared: true,
                    image: `https://image.tmdb.org/t/p/w500${movie.posterPath}`,
                    description: movie.nominationCount,
                    onPress: (): void => {
                      navigation.navigate('movie', { tmdbId: movie.tmdbId })
                    },
                  }))}
                />
              ) : (
                noResultsState
              )}
            </Section>
          </>
        )}
      </ScrollView>
    </>
  )
}

export default Search
