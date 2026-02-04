import React from 'react'
import { ActivityIndicator, ListRenderItem } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { LinearTransition } from 'react-native-reanimated'
import { useTranslation } from 'react-i18next'

import useStyles from './styles'
import BigCaroussel from '@components/big_caroussel'
import Caroussel from '@components/caroussel'
import EmptyState from '@components/empty_state'
import Header from '@components/header'
import { IconFilter } from '@components/icon'
import MediumCard from '@components/medium_card'
import Section from '@components/section'
import SmallCard from '@components/small_card'
import useHeaderAnimation from '@hooks/useHeaderAnimation'
import { useEdition } from '@providers/edition'
import { useTheme } from '@providers/theme'
import { useUser } from '@providers/user'
import { TabType } from '@router/types'

const Nominations: TabType<'nominations'> = ({ navigation }) => {
  const { edition, nominations } = useEdition()
  const { spoilers } = useUser()
  const { onScroll, animation } = useHeaderAnimation()
  const { semantics } = useTheme()

  const styles = useStyles()
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
        winner: el.winner,
        image: `https://image.tmdb.org/t/p/w500${el.posterPath}`,
        onPress: (): void => navigation.navigate('movie', { tmdbId: el.tmdbId }),
        spoiler: item.type === 'person' ? spoilers.hideCast : spoilers.hidePoster,
      }
    })
    const progress = enrichedNominations.filter((nom) => nom.watched).length
    const total = enrichedNominations.length

    if (item.type === 'picture')
      return (
        <BigCaroussel
          extra={t('overall:winner')}
          nominations={enrichedNominations}
          title={item.category.name}
          chip={{
            title: ` ${progress}/${total} `,
            variant: progress === total ? 'brand' : 'container',
          }}
          button={button}
        />
      )

    if (item.type === 'person' || item.type === 'song')
      return (
        <Section
          layout={LinearTransition}
          title={item.category.name}
          chip={{
            title: ` ${progress}/${total} `,
            variant: progress === total ? 'brand' : 'container',
          }}
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
        layout={LinearTransition}
        title={item.category.name}
        chip={{
          title: ` ${progress}/${total} `,
          variant: progress === total ? 'brand' : 'container',
        }}
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
    <>
      <Header
        animation={animation}
        button={{
          icon: <IconFilter />,
          onPress: () => navigation.navigate('filter'),
        }}
      />
      {nominations.length === 0 && emptyState()}
      <FlatList
        overScrollMode="never"
        onScroll={onScroll}
        style={styles.root}
        contentContainerStyle={styles.content}
        data={nominations}
        renderItem={renderCaroussel}
      />
    </>
  )
}

export default Nominations
