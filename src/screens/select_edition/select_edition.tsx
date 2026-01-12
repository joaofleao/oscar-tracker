import { useEffect, useMemo, useRef } from 'react'
import { FlatList } from 'react-native'
import { BlurView } from 'expo-blur'
import { useTranslation } from 'react-i18next'

import useStyles from './styles'
import Button from '@components/button'
import Typography from '@components/typography'
import { useSettings } from '@providers/settings'
import { ScreenType } from '@router/types'

const SelectEdition: ScreenType<'select_edition'> = ({ navigation }) => {
  const styles = useStyles()
  const { t } = useTranslation()

  const { editions, currentEdition, setCurrentEdition } = useSettings()
  const flatlistRef = useRef<FlatList>(null)

  const options = useMemo(
    () =>
      editions
        .filter((edition) => edition.complete)
        ?.map((edition) => ({
          name: `${t('select_edition:edition')} ${edition.number} - ${edition.year}`,
          id: edition._id,
          selected: edition._id === currentEdition,
        }))
        .sort((a, b) => b.name.localeCompare(a.name)) ?? [],
    [currentEdition, editions, t],
  )

  useEffect(() => {
    if (!options) return
    const index = options.findIndex((edition) => edition.selected)
    if (index !== -1) {
      setTimeout(() => {
        flatlistRef.current?.scrollToIndex({ index, animated: true, viewPosition: 0 })
      }, 100)
    }
  }, [options, currentEdition])

  return (
    <>
      <FlatList
        ref={flatlistRef}
        alwaysBounceVertical={false}
        style={styles.list}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <Button
            title={item.name}
            variant={item.selected ? 'brand' : 'ghost'}
            onPress={(): void => {
              setCurrentEdition(item.id)
              navigation.goBack()
            }}
          />
        )}
        data={options}
      />
      <BlurView
        collapsable={false}
        intensity={8}
        style={styles.header}
      >
        <Typography center>{t('select_edition:select_edition')}</Typography>
      </BlurView>
    </>
  )
}

export default SelectEdition
