import { FlatList, ListRenderItem, View } from 'react-native'
import { useQuery } from 'convex/react'
import { api } from 'convex_api'
import { useTranslation } from 'react-i18next'

import useStyles from './styles'
import BigCaroussel from '@components/big_caroussel'
import MediumCaroussel from '@components/medium_caroussel'
import Select from '@components/select'
import SmallCaroussel from '@components/small_caroussel'
import Typography from '@components/typography'
import { useEdition } from '@providers/edition'
import { useTheme } from '@providers/theme'
import { TabType } from '@router/types'

const Nominations: TabType<'nominations'> = ({ navigation }) => {
  const { currentEdition, setCurrentEdition, editions } = useEdition()
  const { semantics } = useTheme()
  const styles = useStyles()

  const nominations = useQuery(api.oscars.getNominations, { editionId: currentEdition }) || []

  const { i18n, t } = useTranslation()

  const header = (
    <View style={{ alignSelf: 'center', marginBottom: 80 }}>
      <Typography
        center
        color={semantics.accent.base.default}
      >
        oscar tracker
      </Typography>

      <Select
        label={t('nominations:select_edition')}
        data={editions?.map((edition) => ({
          name: `${t('nominations:edition')} ${edition.number} - ${edition.year}`,
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
  )

  const renderCaroussel: ListRenderItem<(typeof nominations)[number]> = ({ item }) => {
    const button = {
      action: (): void => navigation.navigate('category', { categoryId: item.category._id }),
      title: 'expand',
    }

    const enrichedNominations = item.nominations.map((el) => {
      return {
        image: el.posterPath[i18n.language],
        title: el.title[i18n.language],
        description: el.description ? el.description[i18n.language] : undefined,
      }
    })

    if (item.type === 'picture')
      return (
        <BigCaroussel
          nominations={enrichedNominations}
          title={item.category.name[i18n.language]}
          button={button}
        />
      )

    if (item.type === 'person' || item.type === 'song')
      return (
        <SmallCaroussel
          nominations={enrichedNominations}
          title={item.category.name[i18n.language]}
          button={button}
        />
      )

    return (
      <MediumCaroussel
        nominations={enrichedNominations}
        title={item.category.name[i18n.language]}
        button={button}
      />
    )
  }

  return (
    <FlatList
      ListHeaderComponent={header}
      contentContainerStyle={styles.flatlists}
      data={nominations}
      renderItem={renderCaroussel}
    />
  )
}

export default Nominations
