import { useState } from 'react'
import { Platform } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Animated, { CurvedTransition, FadeInDown, FadeOutDown, FadeOutUp } from 'react-native-reanimated'
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
import Typography from '@components/typography'
import { useEdition } from '@providers/edition'
import { useTheme } from '@providers/theme'
import { useUser } from '@providers/user'
import { ScreenType } from '@router/types'

const Search: ScreenType<'search'> = ({ navigation, route }) => {
  const { spoilers } = useUser()

  const { movies, nominations, userWatches } = useEdition()
  const styles = useStyles()
  const { t } = useTranslation()
  const { semantics } = useTheme()

  const [query, setQuery] = useState<string>('')

  const results = {
    categories: nominations.filter((item) => item.category.name.toLowerCase().includes(query?.toLowerCase() ?? '')).map((item) => item.category),
    movies: movies.filter((movie) => movie.title.toLowerCase().includes(query?.toLowerCase() ?? '')),
  }

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
                  data={results?.categories}
                  render={(category, index) => (
                    <SmallCard
                      _id={category._id}
                      entering={FadeInDown.delay(index * 100)}
                      exiting={FadeOutDown}
                      layout={CurvedTransition}
                      title={category.name}
                      onPress={(): void => navigation.navigate('category', { categoryId: category._id })}
                    />
                  )}
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
                  data={results?.movies}
                  render={(movie, index) => (
                    <MediumCard
                      key={movie._id}
                      entering={FadeInDown.delay(index * 100)}
                      exiting={FadeOutDown}
                      layout={CurvedTransition}
                      spoiler={spoilers.hidePoster && !userWatches.find((movieId) => movieId === movie._id)}
                      image={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                      onPress={(): void => {
                        navigation.navigate('movie', { tmdbId: movie.tmdbId })
                      }}
                    />
                  )}
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
