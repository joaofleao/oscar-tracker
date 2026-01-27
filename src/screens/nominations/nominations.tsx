import React from 'react'
import { ActivityIndicator, FlatList, ListRenderItem } from 'react-native'
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
import { useTheme } from '@providers/theme'
import { TabType } from '@router/types'

const Nominations: TabType<'nominations'> = ({ navigation }) => {
  const { spoilers, edition } = useSettings()
  const { onScrollNominations, nominationsRef } = useAnimations()
  const { semantics } = useTheme()

  const styles = useStyles()
  const { t, i18n } = useTranslation()
  const nominations = useQuery(api.oscars.getNominations, { editionId: edition?._id as GenericId<'oscarEditions'>, language: i18n.language }) || []

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
        winner: el.winner,
        image: `https://image.tmdb.org/t/p/w500${el.posterPath}`,
        onPress: (): void => navigation.navigate('movie', { tmdbId: el.tmdbId }),
        spoiler: item.type === 'person' ? !spoilers.hidePlot : spoilers.hidePoster,
      }
    })

    if (item.type === 'picture')
      return (
        <BigCaroussel
          extra={t('overall:winner')}
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

  const daysUntilAnnouncement = edition?.announcement ? Math.ceil((new Date(edition.announcement).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : null
  const daysUntilEdition = edition?.date ? Math.ceil((new Date(edition.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : null

  const emptyState = (): React.ReactElement => {
    if (daysUntilAnnouncement !== null && daysUntilEdition !== null) {
      if (daysUntilAnnouncement < 0)
        return (
          <EmptyState
            title={t('nominations:announcement_made_title')}
            description={t('nominations:announcement_made_description')}
          />
        )
      if (daysUntilAnnouncement === 0)
        return (
          <EmptyState
            title={t('nominations:announcement_today_title')}
            description={t('nominations:announcement_today_description')}
          />
        )
      if (daysUntilAnnouncement === 1)
        return (
          <EmptyState
            title={t('nominations:until_announcement_title_singular').replace('{count}', '1')}
            description={t('nominations:until_announcement_description_singular').replace('{count}', '1')}
          />
        )
      if (daysUntilAnnouncement > 1)
        return (
          <EmptyState
            title={t('nominations:until_announcement_title').replace('{count}', Math.abs(daysUntilAnnouncement)?.toString())}
            description={t('nominations:until_announcement_description').replace('{count}', Math.abs(daysUntilEdition)?.toString())}
          />
        )
    }
    return <ActivityIndicator color={semantics.accent.foreground.default} />
  }

  return (
    <FlatList
      ref={nominationsRef}
      onScroll={onScrollNominations}
      contentContainerStyle={styles.flatlists}
      data={nominations}
      renderItem={renderCaroussel}
      ListEmptyComponent={emptyState()}
    />
  )
}

export default Nominations
