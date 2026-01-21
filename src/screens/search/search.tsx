import { useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { createAnimatedComponent, FadeInDown, FadeOutDown } from 'react-native-reanimated'
import { useMutation, useQuery } from 'convex/react'
import { api } from 'convex_api'
import { BlurView } from 'expo-blur'
import { useTranslation } from 'react-i18next'

import useStyles from './styles'
import Caroussel from '@components/caroussel'
import { IconX } from '@components/icon'
import IconButton from '@components/icon_button'
import MediumCard from '@components/medium_card'
import SearchInput from '@components/search_input'
import Section from '@components/section'
import SmallCard from '@components/small_card'
import { TinyPlus } from '@components/tiny_icon'
import Typography from '@components/typography'
import { useSettings } from '@providers/settings'
import { useTheme } from '@providers/theme'
import { ScreenType } from '@router/types'
const AnimatedActivityIndicator = createAnimatedComponent(ActivityIndicator)

const Search: ScreenType<'search'> = ({ navigation, route }) => {
  const { edition, spoilers } = useSettings()
  const styles = useStyles()
  const { i18n, t } = useTranslation()
  const theme = useTheme()
  const [name, setName] = useState('')

  const results = useQuery(api.oscars.search, { name, editionId: edition?._id, language: i18n.language })
  const startFollowing = useMutation(api.user.startFollowing)

  const [loading, setLoading] = useState(false)
  const empty = name.trim() === ''

  const handleSearch = async (query: string): Promise<void> => {
    if (query.trim() === '') {
      setLoading(false)
      return
    }
    setLoading(true)
    setName(query.trim())
    if (results !== undefined) setLoading(false)
  }

  const footer = (
    <View style={[styles.footer]}>
      <SearchInput
        autoComplete="off"
        autoCorrect={false}
        autoCapitalize="none"
        autoFocus
        style={styles.input}
        debounce={2000}
        onChangeText={() => {
          setLoading(true)
        }}
        onDebouncedText={handleSearch}
        onClear={() => {
          setLoading(false)
        }}
      />
      <IconButton
        onPress={navigation.goBack}
        icon={<IconX />}
      />
    </View>
  )

  const noResultsState = (
    <View style={styles.noResults}>
      <Typography legend>{t('search:no_results')}</Typography>
    </View>
  )

  const loadingState = (
    <View style={styles.noContent}>
      <AnimatedActivityIndicator entering={FadeInDown} />
    </View>
  )

  const emptyState = (
    <View style={styles.noContent}>
      <Typography
        center
        color={theme.semantics.background.foreground.light}
      >
        {t('search:empty_state')}
      </Typography>
    </View>
  )

  return (
    <>
      <BlurView
        collapsable={false}
        intensity={8}
        style={styles.header}
      >
        <Typography center>{t('search:title')}</Typography>
      </BlurView>

      <ScrollView
        automaticallyAdjustKeyboardInsets
        style={styles.root}
        contentContainerStyle={styles.content}
      >
        {loading && loadingState}
        {!loading && empty && emptyState}
        {!loading && !empty && (
          <>
            <Section
              title={t('search:categories')}
              entering={FadeInDown}
              exiting={FadeOutDown}
            >
              {(results?.categories.length ?? -1 > 0) ? (
                <Caroussel
                  item={SmallCard}
                  data={results?.categories.map((category) => ({
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
              {(results?.users.length ?? -1 > 0) ? (
                <Caroussel
                  item={SmallCard}
                  data={results?.users.map((user) => ({
                    ...user,
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
              {(results?.movies.length ?? -1 > 0) ? (
                <Caroussel
                  item={MediumCard}
                  data={results?.movies.map((movie) => ({
                    ...movie,
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

        {footer}
      </ScrollView>
    </>
  )
}

export default Search
