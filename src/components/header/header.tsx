import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useTranslation } from 'react-i18next'

import useStyles from './styles'
import { HeaderProps } from './types'
import HeaderBlur from '@components/header_blur'
import ProgressBar from '@components/progress_bar'
import Typography from '@components/typography'
import { useEdition } from '@providers/edition'
import { useTheme } from '@providers/theme'
import { useNavigation } from '@react-navigation/native'
import { ordinal } from '@utils/ordinals'

const Header = ({ animation }: HeaderProps): React.ReactElement => {
  const styles = useStyles()
  const navigation = useNavigation()
  const { semantics } = useTheme()
  const { edition, editions, movies, userWatches } = useEdition()
  const { t, i18n } = useTranslation()

  return (
    <>
      <LinearGradient
        colors={semantics.background.base.gradient as any}
        style={styles.gradient}
      />
      <HeaderBlur
        animation={animation}
        variant="background"
      >
        <View style={styles.root}>
          <View style={styles.content}>
            <TouchableOpacity onPress={() => navigation.navigate('select_edition' as never)}>
              <Typography
                center
                color={semantics.accent.base.default}
              >
                academy tracker
              </Typography>

              {editions.length > 0 && (
                <Typography
                  center
                  legend
                  color={semantics.background.foreground.light}
                >
                  {`${ordinal(edition?.number ?? 0, i18n.language, false)} ${t('home:edition')} - ${edition?.year}`}
                </Typography>
              )}
            </TouchableOpacity>
            <ProgressBar
              value={userWatches.length}
              maxValue={movies.length}
            />
          </View>
        </View>
      </HeaderBlur>
    </>
  )
}

export default Header
