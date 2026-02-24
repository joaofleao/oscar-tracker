import { useEffect, useMemo, useRef } from 'react'
import { FlatList } from 'react-native'
import { useTranslation } from 'react-i18next'

import useStyles from './styles'
import Blur from '@components/blur'
import Button from '@components/button'
import Typography from '@components/typography'
import { useEdition } from '@providers/edition'
import { ScreenType } from '@router/types'
import { ordinal } from '@utils/ordinals'

const ITEM_HEIGHT = 42 // Adjust based on your Button height

const SelectEdition: ScreenType<'select_edition'> = ({ navigation }) => {
  const styles = useStyles()
  const { t, i18n } = useTranslation()

  const { editions, edition, selectEdition } = useEdition()
  const flatlistRef = useRef<FlatList>(null)

  const options = useMemo(
    () =>
      editions?.map((ed) => ({
        name: `${ordinal(ed.number, i18n.language)} ${t('select_edition:edition')} - ${ed.year}`,
        id: ed._id,
        selected: ed._id === edition?._id,
      })) ?? [],
    [edition, editions, i18n.language, t],
  )

  useEffect(() => {
    if (!options) return
    const index = options.findIndex((edition) => edition.selected)
    if (index !== -1) {
      setTimeout(() => {
        flatlistRef.current?.scrollToIndex({ index, animated: true, viewPosition: 0 })
      }, 100)
    }
  }, [options, edition])

  return (
    <>
      <Blur style={styles.header}>
        <Typography center>{t('select_edition:select_edition')}</Typography>
      </Blur>

      <FlatList
        nestedScrollEnabled
        ref={flatlistRef}
        style={styles.scroll}
        contentContainerStyle={styles.content}
        renderItem={({ item }) => (
          <Button
            title={item.name}
            variant={item.selected ? 'brand' : 'ghost'}
            onPress={(): void => {
              void selectEdition(item.id)
              navigation.goBack()
            }}
          />
        )}
        data={options}
        getItemLayout={(data, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
      />
    </>
  )
}

export default SelectEdition
