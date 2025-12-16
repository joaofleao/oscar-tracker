import { View } from 'react-native'
import { useTranslation } from 'react-i18next'

import useStyles from './styles'
import Typography from '@components/typography'
import { ScreenType } from '@router/types'

const Category: ScreenType<'category'> = ({ navigation, route }) => {
  const styles = useStyles()
  const { t } = useTranslation()
  // const categoryId = route.params?.categoryId

  return (
    <View style={styles.root}>
      <Typography>{t('category:category')}</Typography>
    </View>
  )
}

export default Category
