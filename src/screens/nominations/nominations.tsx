import { FlatList, ListRenderItem, View } from 'react-native'
import { useQuery } from 'convex/react'
import { api } from 'convex_api'
import { useTranslation } from 'react-i18next'

import useStyles from './styles'
import BigCaroussel from '@components/big_caroussel'
import Caroussel from '@components/caroussel'
import EmptyState from '@components/empty_state'
import MediumCard from '@components/medium_card'
import Section from '@components/section'
import Select from '@components/select'
import SmallCard from '@components/small_card'
import Typography from '@components/typography'
import { useEdition } from '@providers/edition'
import useSettings from '@providers/settings/useSettings'
import { useTheme } from '@providers/theme'
import { TabType } from '@router/types'

const Nominations: TabType<'nominations'> = ({ navigation }) => {
  const { currentEdition, setCurrentEdition, editions } = useEdition()
  const { semantics } = useTheme()
  const { spoilers } = useSettings()
  const styles = useStyles()

  const nominations = useQuery(api.oscars.getNominations, { editionId: currentEdition }) || []

  const { i18n, t } = useTranslation()

  const header = (
    <View style={styles.header}>
      <Typography
        center
        color={semantics.accent.base.default}
      >
        oscar tracker
      </Typography>

      <Select
        label={t('home:select_edition')}
        data={editions?.map((edition) => ({
          name: `${t('home:edition')} ${edition.number} - ${edition.year}`,
          id: edition._id,
        }))}
        onSelect={setCurrentEdition}
        selected={currentEdition}
        renderAnchor={({ selectedOption, setVisible, visible }) => (
          <Typography
            onPress={() => setVisible(!visible)}
            center
            legend
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
      title: t('nominations:expand'),
    }

    const enrichedNominations = item.nominations.map((el) => {
      return {
        _id: el.nominationId,
        image: `https://image.tmdb.org/t/p/w500${el.posterPath[i18n.language]}`,
        title: el.title[i18n.language],
        description: el.description ? el.description[i18n.language] : undefined,
        onPress: (): void => navigation.navigate('movie', { tmdbId: el.tmdbId }),
        watched: el.watched,
        spoiler: item.type === 'person' ? !spoilers.hidePlot : spoilers.hidePoster,
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
        <Section
          title={item.category.name[i18n.language]}
          button={button}
        >
          <Caroussel
            data={enrichedNominations}
            item={SmallCard}
          />
        </Section>
      )

    return (
      <Section
        title={item.category.name[i18n.language]}
        button={button}
      >
        <Caroussel
          data={enrichedNominations}
          item={MediumCard}
        />
      </Section>
    )
  }

  return (
    <FlatList
      ListHeaderComponent={header}
      contentContainerStyle={styles.flatlists}
      data={nominations}
      renderItem={renderCaroussel}
      ListEmptyComponent={
        <EmptyState
          style={styles.empty}
          title={t('nominations:empty_nominations_title')}
          description={t('nominations:empty_nominations_description')}
        />
      }
    />
  )
}

export default Nominations
