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

const Nominations: TabType<'nominations'> = () => {
  const { currentEdition, setCurrentEdition, editions } = useEdition()
  const { semantics } = useTheme()
  const styles = useStyles()

  const nominations = useQuery(api.oscars.getNominations, { editionId: currentEdition }) || []

  const { i18n, t } = useTranslation()

  const bestPicture = (
    <View style={{ gap: 120 }}>
      <View style={{ alignSelf: 'center' }}>
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

      <BigCaroussel
        button={{
          action: console.log,
          title: 'expand',
        }}
        title={nominations[0]?.category.name[i18n.language]}
        nominations={nominations[0]?.nominations.map((el) => {
          return {
            image: el.posterPath[i18n.language],
            title: el.title[i18n.language],
          }
        })}
      />
    </View>
  )

  const renderCaroussel: ListRenderItem<(typeof nominations)[number]> = ({ item }) => {
    if (item.type === 'person' || item.type === 'song')
      return (
        <SmallCaroussel
          nominations={item.nominations.map((el) => {
            return {
              image: el.posterPath[i18n.language],
              title: el.title[i18n.language],
              description: el.description ? el.description[i18n.language] : undefined,
            }
          })}
          title={item.category.name[i18n.language]}
          button={{
            action: console.log,
            title: 'expand',
          }}
        />
      )

    return (
      <MediumCaroussel
        nominations={item.nominations.map((el) => {
          return {
            image: el.posterPath[i18n.language],
            title: el.title[i18n.language],
          }
        })}
        title={item.category.name[i18n.language]}
        button={{
          action: console.log,
          title: 'expand',
        }}
      />
    )
  }

  return (
    <FlatList
      ListHeaderComponent={bestPicture}
      contentContainerStyle={styles.flatlists}
      data={nominations.slice(1)}
      renderItem={renderCaroussel}
    />
  )
}

export default Nominations
