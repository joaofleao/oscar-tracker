import { FlatList, View } from 'react-native'
import { useQuery } from 'convex/react'
import { api } from 'convex_api'
import { useTranslation } from 'react-i18next'

import useStyles from './styles'
import ListViewItem from '@components/list_view/list_view_item'
import Typography from '@components/typography'
import { useEdition } from '@providers/edition'
import { ScreenType } from '@router/types'

const Category: ScreenType<'category'> = ({ navigation, route }) => {
  const styles = useStyles()
  const { i18n } = useTranslation()
  const { currentEdition } = useEdition()

  const data = useQuery(api.oscars.getNominationsByCategory, {
    editionId: currentEdition,
    categoryId: route.params.categoryId,
  })

  if (!data) return <></>

  return (
    <View style={styles.root}>
      <Typography>{data.category.name[i18n.language]}</Typography>
      <FlatList
        data={data.nominations ?? []}
        renderItem={({ item }) => (
          <ListViewItem
            _id={item.nominationId}
            title={item.title.en_US}
            image={item.image.en_US}
            description={item.description?.en_US}
          />
        )}
      />
    </View>
  )
}

export default Category
