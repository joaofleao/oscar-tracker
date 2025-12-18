import { useState } from 'react'
import { ActivityIndicator, FlatList, View } from 'react-native'
import { useMutation, useQuery } from 'convex/react'
import { api } from 'convex_api'
import { useTranslation } from 'react-i18next'

import useStyles from './styles'
import { IconX } from '@components/icon'
import IconButton from '@components/icon_button'
import SearchInput from '@components/search_input'
import SmallCard from '@components/small_caroussel/small_card'
import { TinyPlus } from '@components/tiny_icon'
import Typography from '@components/typography'
import { useTheme } from '@providers/theme'
import { ScreenType } from '@router/types'

const Search: ScreenType<'search'> = ({ navigation, route }) => {
  const styles = useStyles()
  const { t } = useTranslation()
  const theme = useTheme()
  const [name, setName] = useState('')

  const searchName = useQuery(api.user.searchByName, { name }) ?? []
  const startFollowing = useMutation(api.user.startFollowing)

  const [loading, setLoading] = useState(false)

  const handleSearch = async (query: string): Promise<void> => {
    if (!query.trim()) {
      setLoading(false)
      return
    }
    setLoading(true)
    setName(query.trim())
    if (searchName !== undefined) setLoading(false)
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
    <View style={styles.content}>
      <Typography>{t('search:no_results')}</Typography>
    </View>
  )
  const emptyState = <View style={styles.content}>{loading ? <ActivityIndicator /> : <Typography color={theme.semantics.background.foreground.light}>{t('search:empty_state')}</Typography>}</View>

  return (
    <FlatList
      alwaysBounceVertical={false}
      style={styles.list}
      ListHeaderComponent={footer}
      ListEmptyComponent={name.length === 0 ? emptyState : noResultsState}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="always"
      automaticallyAdjustKeyboardInsets
      renderItem={({ item }) => (
        <SmallCard
          _id={item._id}
          image={item.image}
          label={item.title}
          description={item.description}
          additional={item.follows ? t('search:follows_you') : undefined}
          button={{
            icon: item.following ? undefined : <TinyPlus />,
            disabled: item.following,
            title: item.following ? t('search:following') : t('search:follow'),
            onPress: () => {
              startFollowing({ friendId: item._id })
            },
          }}
        />
      )}
      data={searchName?.map((user) => ({
        ...user,
        title: user.name,
        description: user.username,
      }))}
    />
  )
}

export default Search
