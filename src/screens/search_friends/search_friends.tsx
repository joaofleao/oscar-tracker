import { useEffect, useState } from 'react'
import { ActivityIndicator, Platform } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Animated, { CurvedTransition, FadeInDown, FadeOutDown, FadeOutUp } from 'react-native-reanimated'
import { useConvexAuth, useMutation, useQuery } from 'convex/react'
import { api } from 'convex_api'
import { useTranslation } from 'react-i18next'

import useStyles from './styles'
import Blur from '@components/blur'
import Button from '@components/button'
import Caroussel from '@components/caroussel'
import { IconX } from '@components/icon'
import Row from '@components/row/row'
import SearchInput from '@components/search_input'
import Section from '@components/section'
import SmallCard from '@components/small_card'
import { TinyPlus } from '@components/tiny_icon'
import Typography from '@components/typography'
import { useTheme } from '@providers/theme'
import { ScreenType } from '@router/types'

const SearchFriends: ScreenType<'search_friends'> = ({ navigation, route }) => {
  const styles = useStyles()
  const { t } = useTranslation()
  const { semantics } = useTheme()

  const [query, setQuery] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const results = useQuery(api.user.searchUsers, { name: query })

  const startFollowing = useMutation(api.user.startFollowing)
  const { isAuthenticated } = useConvexAuth()

  useEffect(() => {
    if (results !== undefined) setLoading(false)
  }, [results])

  const handleSearch = async (query: string): Promise<void> => {
    if (query.trim() === '') {
      setLoading(false)
      setQuery('')
      return
    }
    setLoading(true)
    setQuery(query.trim())
  }

  const header = (
    <Blur style={[styles.header]}>
      <Typography center>{t('search_friends:title')}</Typography>

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
              setQuery('')
            }
          }}
          onDebouncedText={handleSearch}
          onClear={() => {
            setLoading(false)
            setQuery('')
          }}
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
      <Typography legend>{t('search_friends:no_results')}</Typography>
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
        {t('search_friends:empty_state')}
      </Typography>
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

  return (
    <>
      {header}
      <ScrollView
        automaticallyAdjustKeyboardInsets
        style={styles.root}
        contentContainerStyle={styles.content}
      >
        {loading && loadingState}

        {!loading && query === '' && emptyState}
        {!loading && results !== undefined && query !== '' && (
          <Section
            title={t('search_friends:users')}
            entering={FadeInDown}
            exiting={FadeOutDown}
          >
            {results.length > 0 ? (
              <Caroussel
                item={SmallCard}
                data={results.map((user, index) => ({
                  ...user,
                  entering: FadeInDown.delay(index * 100),
                  exiting: FadeOutDown,
                  layout: CurvedTransition,
                  squared: true,
                  image: user.imageURL,
                  title: user.name,
                  description: user.username,
                  additional: user.follows ? t('search_friends:follows_you') : undefined,
                  button: {
                    icon: user.following ? undefined : <TinyPlus />,
                    disabled: user.following,
                    title: user.following ? t('search_friends:following') : t('search_friends:follow'),
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
        )}
      </ScrollView>
    </>
  )
}

export default SearchFriends
