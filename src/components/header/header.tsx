import React, { useEffect, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { FadeIn, FadeOut } from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'
import { useTranslation } from 'react-i18next'

import useStyles from './styles'
import { HeaderProps } from './types'
import Button from '@components/button'
import HeaderBlur from '@components/header_blur'
import ProgressBar from '@components/progress_bar'
import Row from '@components/row'
import Typography from '@components/typography'
import { useEdition } from '@providers/edition'
import { useTheme } from '@providers/theme'
import { useNavigation } from '@react-navigation/native'
import { ordinal } from '@utils/ordinals'

const Header = ({ animation, button }: HeaderProps): React.ReactElement => {
  const navigation = useNavigation()
  const { semantics } = useTheme()
  const { edition, editions, movies, userWatches } = useEdition()
  const { t, i18n } = useTranslation()
  const [leftWidth, setLeftWidth] = useState(0)
  const [rightWidth, setRightWidth] = useState(0)
  const [showDays, setShowDays] = useState(false)

  const minWidth = Math.max(leftWidth, rightWidth)
  const daysUntilEdition = edition ? Math.ceil((new Date(edition.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : null

  useEffect(() => {
    const interval = setInterval(() => {
      setShowDays((prev) => !prev)
    }, 5000)

    return (): void => clearInterval(interval)
  }, [])

  const styles = useStyles({ minWidth })

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
          <Row
            between
            middle
          >
            <View style={styles.left}>
              <View onLayout={(e) => setLeftWidth(e.nativeEvent.layout.width)} />
            </View>

            <View style={styles.center}>
              <TouchableOpacity onPress={() => navigation.navigate('select_edition' as never)}>
                <Typography
                  center
                  color={semantics.accent.base.default}
                >
                  academy tracker
                </Typography>

                {editions.length > 0 && (
                  <>
                    {showDays && daysUntilEdition !== null ? (
                      <Typography
                        center
                        key="days"
                        legend
                        color={semantics.background.foreground.light}
                        entering={FadeIn.delay(200).duration(500)}
                        exiting={FadeOut}
                      >
                        {daysUntilEdition > 0 ? `${daysUntilEdition} ${t('home:days_until_edition')}` : t('home:edition_finished')}
                      </Typography>
                    ) : (
                      <Typography
                        center
                        key="edition"
                        legend
                        entering={FadeIn.delay(200).duration(500)}
                        exiting={FadeOut}
                        color={semantics.background.foreground.light}
                      >
                        {`${ordinal(edition?.number ?? 0, i18n.language, false)} ${t('home:edition')} - ${edition?.year}`}
                      </Typography>
                    )}
                  </>
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.right}>
              <Button
                onLayout={(e) => setRightWidth(e.nativeEvent.layout.width)}
                small
                variant="ghost"
                icon={button.icon}
                onPress={button.onPress}
              />
            </View>
          </Row>
          <ProgressBar
            value={userWatches.length}
            maxValue={movies.length}
          />
        </View>
      </HeaderBlur>
    </>
  )
}

export default Header
