import { useEffect, useState } from 'react'
import { ActivityIndicator, Platform } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Animated, { FadeInDown, FadeInRight, FadeOutDown, FadeOutUp } from 'react-native-reanimated'
import { useConvexAuth, useMutation, useQuery } from 'convex/react'
import { api } from 'convex_api'
import { useTranslation } from 'react-i18next'

import useStyles from './styles'
import Blur from '@components/blur'
import Caroussel from '@components/caroussel'
import { IconX } from '@components/icon'
import IconButton from '@components/icon_button'
import MediumCard from '@components/medium_card'
import Row from '@components/row/row'
import SearchInput from '@components/search_input'
import Section from '@components/section'
import SmallCard from '@components/small_card'
import { TinyPlus } from '@components/tiny_icon'
import Typography from '@components/typography'
import { useSettings } from '@providers/settings'
import { useTheme } from '@providers/theme'
import { ScreenType } from '@router/types'

const Search: ScreenType<'search'> = ({ navigation, route }) => {
  const { edition, spoilers } = useSettings()
  const styles = useStyles()
  const { i18n, t } = useTranslation()
  const { semantics } = useTheme()

  const [name, setName] = useState<string | undefined>()
  const results = useQuery(api.oscars.search, { name, editionId: edition?._id, language: i18n.language })
  const startFollowing = useMutation(api.user.startFollowing)
  const { isAuthenticated } = useConvexAuth()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (results !== undefined) setLoading(false)
  }, [results])

  const handleSearch = async (query: string): Promise<void> => {
    if (query.trim() === '') {
      setLoading(false)
      setName(undefined)
      return
    }
    setLoading(true)
    setName(query.trim())
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
          debounce={2000}
          onChangeText={(text) => {
            if (text.trim() !== '') {
              setLoading(true)
            } else {
              setLoading(false)
              setName(undefined)
            }
          }}
          onDebouncedText={handleSearch}
          onClear={() => {
            setLoading(false)
            setName(undefined)
          }}
        />
        {Platform.OS === 'ios' && (
          <IconButton
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

  const loadingState = (
    <Animated.View
      style={styles.empty}
      entering={FadeInDown}
      exiting={FadeOutUp}
    >
      <ActivityIndicator color={semantics.container.foreground.default} />
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
        {loading && loadingState}
        {!loading && name === undefined && emptyState}
        {!loading && name !== undefined && (
          <>
            <Section
              title={t('search:categories')}
              entering={FadeInDown}
              exiting={FadeOutDown}
            >
              {((results !== undefined && results?.categories.length) ?? -1 > 0) ? (
                <Caroussel
                  item={SmallCard}
                  data={results?.categories.map((category, index) => ({
                    entering: FadeInRight.delay(index * 100),
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
              {((results !== undefined && results?.users.length) ?? -1 > 0) ? (
                <Caroussel
                  item={SmallCard}
                  data={results?.users.map((user, index) => ({
                    ...user,
                    entering: FadeInRight.delay(index * 100),
                    squared: true,
                    image: user.imageURL,
                    title: user.name,
                    description: user.username,
                    additional: user.follows ? t('search:follows_you') : undefined,
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
              {((results !== undefined && results?.movies.length) ?? -1 > 0) ? (
                <Caroussel
                  item={MediumCard}
                  data={results?.movies.map((movie, index) => ({
                    ...movie,
                    entering: FadeInRight.delay(index * 100),
                    spoiler: spoilers.hidePoster && !movie.watched,
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
