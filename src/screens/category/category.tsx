import { FlatList, View } from 'react-native'
import { useQuery } from 'convex/react'
import { GenericId } from 'convex/values'
import { api } from 'convex_api'
import { LinearGradient } from 'expo-linear-gradient'
import { useTranslation } from 'react-i18next'

import useStyles from './styles'
import ListViewItem from '@components/list_view/list_view_item'
import Typography from '@components/typography'
import { useSettings } from '@providers/settings'
import { ScreenType } from '@router/types'

const Category: ScreenType<'category'> = ({ navigation, route }) => {
  const styles = useStyles()
  const { i18n } = useTranslation()
  const { currentEdition } = useSettings()

  const data = useQuery(api.oscars.getNominationsByCategory, {
    editionId: currentEdition as GenericId<'oscarEditions'>,
    categoryId: route.params.categoryId,
    language: i18n.language,
  })

  if (!data) return <></>

  return (
    <View style={styles.root}>
      <Typography center>{data.category.name}</Typography>
      <View>
        <FlatList
          contentContainerStyle={styles.data}
          data={data.nominations ?? []}
          renderItem={({ item }) => (
            <ListViewItem
              _id={item.nominationId}
              title={item.title}
              image={`https://image.tmdb.org/t/p/w500${item.image}`}
              description={item.description}
              extra={item.extra}
            />
          )}
        />
        <LinearGradient
          colors={['rgba(13, 13, 13, 1)', 'rgba(13, 13, 13, 0.70)', 'rgba(13, 13, 13, 0)']}
          style={styles.gradient}
        />
      </View>
    </View>
  )
}

export default Category
