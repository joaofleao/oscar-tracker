import { FlatList, Text } from 'react-native'

// import NominationCaroussel from './nomination_caroussel'
import Global from '@components/Global'
// import { useCategories } from '@providers/categories'
// import { useEdition } from '@providers/edition'
import { TabType } from '@router/types'

const Movies: TabType<'movies'> = () => {
  // const edition = useEdition()
  // const { categories_list } = useCategories()

  // const filteredCategories = categories_list.filter((item) => edition.categories.includes(item))

  const renderNominationCaroussel = (item) => {
    return <Text>{item}</Text>
    //   return (
    //     <></>
    //     // <>{edition?.categories?.includes(item) && <NominationCaroussel categoryId={item.item} />}</>
    //   )
  }

  return (
    <Global.Screen isTabScreen>
      <FlatList
        data={[]}
        renderItem={renderNominationCaroussel}
        ItemSeparatorComponent={Global.Separator}
        ListHeaderComponent={Global.HeaderBarSeparator}
        ListFooterComponent={Global.NavBarSeparator}
        stickyHeaderIndices={[0]}
      />
    </Global.Screen>
  )
}

export default Movies
