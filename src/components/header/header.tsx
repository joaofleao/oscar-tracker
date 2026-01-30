import React, { useEffect } from 'react'
import { Alert, Linking, TouchableOpacity, View } from 'react-native'
import { useQuery } from 'convex/react'
import { api } from 'convex_api'
import { LinearGradient } from 'expo-linear-gradient'
import { deleteItemAsync, getItem, setItem } from 'expo-secure-store'
import { useTranslation } from 'react-i18next'

import packageJson from '../../../package.json'
import useStyles from './styles'
import { HeaderProps } from './types'
import HeaderBlur from '@components/header_blur'
import ProgressBar from '@components/progress_bar'
import Typography from '@components/typography'
import { useSettings } from '@providers/settings'
import { useTheme } from '@providers/theme'
import { useNavigation } from '@react-navigation/native'
import { ordinal } from '@utils/ordinals'

const Header = ({ animation }: HeaderProps): React.ReactElement => {
  const styles = useStyles()
  const navigation = useNavigation()
  const { semantics } = useTheme()
  const { edition, editions } = useSettings()
  const { t, i18n } = useTranslation()

  const latest = useQuery(api.user.getLatestVersion, {
    app: 'oscar-tracker',
    language: i18n.language,
  })

  useEffect(() => {
    if (latest === undefined) return
    const ver = getItem('version')

    if (ver === null) {
      setItem('version', packageJson.version)
      return
    }

    if (ver !== latest.version)
      Alert.alert(
        t('home:new_version'),
        latest.changelog.length > 0 ? latest.changelog : t('home:update'),
        [
          {
            text: t('home:update_now'),
            isPreferred: true,
            onPress: (): void => {
              deleteItemAsync('version')
              Linking.openURL(latest.url)
            },
          },
        ],
        { cancelable: false },
      )
  }, [latest, t])

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
          {/* <Animated.View style={[styles.background, animation]}> */}
          {/* </Animated.View> */}

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
                  {`${ordinal(edition?.number ?? 0, i18n.language, true)} ${t('home:edition')} - ${edition?.year}`}
                </Typography>
              )}
            </TouchableOpacity>
            <ProgressBar
              value={edition?.moviesWatched ?? 0}
              maxValue={edition?.moviesNominated ?? 0}
            />
          </View>

          {/* {state.index !== 2 && (
        <IconButton
        placeholder={!edition?.complete}
        icon={edition?.hasVoted ? <IconTrophy /> : <IconInformation />}
        variant={edition?.hasVoted ? 'brand' : 'container'}
        onPress={() => navigation.navigate('awards')}
        />
        )} */}
        </View>
      </HeaderBlur>
    </>
  )
}

export default Header
