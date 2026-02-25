import { useEffect, useRef } from 'react'
import { FlatList } from 'react-native'
import { useTranslation } from 'react-i18next'

import useStyles from './styles'
import Blur from '@components/blur'
import Button from '@components/button'
import Typography from '@components/typography'
import useEdition from '@providers/edition/useEdition'
import { ScreenType } from '@router/types'
import { countries } from '@utils/constants'

const ITEM_HEIGHT = 42

const SelectCountry: ScreenType<'select_country'> = ({ navigation }) => {
  const styles = useStyles()
  const { t, i18n } = useTranslation()

  const { country, setCountry, refreshMoviesProviders } = useEdition()
  const flatlistRef = useRef<FlatList>(null)

  const enrichedCountries = Object.entries(countries)

  useEffect(() => {
    if (!countries) return
    const index = enrichedCountries.findIndex((edition) => edition[0] === country)
    if (index !== -1) {
      setTimeout(() => {
        flatlistRef.current?.scrollToIndex({ index, animated: true })
      }, 100)
    }
  }, [enrichedCountries, country])

  return (
    <>
      <Blur style={styles.header}>
        <Typography center>{t('select_country:select_country')}</Typography>
      </Blur>

      <FlatList
        initialNumToRender={300}
        nestedScrollEnabled
        ref={flatlistRef}
        style={styles.scroll}
        contentContainerStyle={styles.content}
        renderItem={({ item }) => (
          <Button
            title={item[1][i18n.language]}
            variant={item[0] === country ? 'brand' : 'ghost'}
            onPress={(): void => {
              setCountry(item[0])
              refreshMoviesProviders()
              navigation.goBack()
            }}
          />
        )}
        data={enrichedCountries}
        getItemLayout={(_, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
      />
    </>
  )
}

export default SelectCountry
