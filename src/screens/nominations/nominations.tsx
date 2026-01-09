import React from 'react'
import { FlatList, ListRenderItem } from 'react-native'
import { useQuery } from 'convex/react'
import { GenericId } from 'convex/values'
import { api } from 'convex_api'
import { useTranslation } from 'react-i18next'

import useStyles from './styles'
import BigCaroussel from '@components/big_caroussel'
import Caroussel from '@components/caroussel'
import EmptyState from '@components/empty_state'
import MediumCard from '@components/medium_card'
import Section from '@components/section'
import SmallCard from '@components/small_card'
import useAnimations from '@providers/animations/useAnimations'
import useSettings from '@providers/settings/useSettings'
import { TabType } from '@router/types'

const Nominations: TabType<'nominations'> = ({ navigation }) => {
  const { spoilers, currentEdition } = useSettings()
  const { onScrollNominations, nominationsRef } = useAnimations()

  const styles = useStyles()

  const nominations = useQuery(api.oscars.getNominations, { editionId: currentEdition as GenericId<'oscarEditions'> }) || []

  const { t } = useTranslation()

  const renderCaroussel: ListRenderItem<(typeof nominations)[number]> = ({ item }) => {
    const button = {
      action: (): void => navigation.navigate('category', { categoryId: item.category._id }),
      title: t('nominations:expand'),
    }

    const enrichedNominations = item.nominations.map((el) => {
      return {
        _id: el.nominationId,
        title: el.title,
        description: el.description,
        watched: el.watched,
        image: `https://image.tmdb.org/t/p/w500${el.posterPath}`,
        onPress: (): void => navigation.navigate('movie', { tmdbId: el.tmdbId }),
        spoiler: item.type === 'person' ? !spoilers.hidePlot : spoilers.hidePoster,
      }
    })

    if (item.type === 'picture')
      return (
        <BigCaroussel
          nominations={enrichedNominations}
          title={item.category.name}
          button={button}
        />
      )

    if (item.type === 'person' || item.type === 'song')
      return (
        <Section
          title={item.category.name}
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
        title={item.category.name}
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
      ref={nominationsRef}
      onScroll={onScrollNominations}
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
