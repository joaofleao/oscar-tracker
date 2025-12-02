import React from 'react'
import { StatusBar, View } from 'react-native'
import * as Fonts from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'

import Navigation from './Navigation'
import useStyles from './styles'
import ToastNotification from '@components/ToastNotification'
import LoadingModal from '@containers/LoadingModal'
import NetworkModal from '@containers/NetworkModal'
import { useTheme } from '@providers/theme'
import { print } from '@utils/functions'

SplashScreen.preventAutoHideAsync()

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
})

const localFonts = {
  'Tienne-Black': require('@assets/fonts/tienne/Tienne-Black.ttf'),
  'Tienne-Bold': require('@assets/fonts/tienne/Tienne-Bold.ttf'),
  'Tienne-Regular': require('@assets/fonts/tienne/Tienne-Regular.ttf'),

  'Inconsolata-Black': require('@assets/fonts/inconsolata/Inconsolata-Black.ttf'),
  'Inconsolata-Bold': require('@assets/fonts/inconsolata/Inconsolata-Bold.ttf'),
  'Inconsolata-Regular': require('@assets/fonts/inconsolata/Inconsolata-Regular.ttf'),

  'Inconsolata_SemiExpanded-Black': require('@assets/fonts/inconsolata/Inconsolata_SemiExpanded-Black.ttf'),
  'Inconsolata_SemiExpanded-Bold': require('@assets/fonts/inconsolata/Inconsolata_SemiExpanded-Bold.ttf'),
  'Inconsolata_SemiExpanded-Regular': require('@assets/fonts/inconsolata/Inconsolata_SemiExpanded-Regular.ttf'),

  'Spartan-Bold': require('@assets/fonts/spartan/Spartan-Bold.ttf'),
  'Spartan-Regular': require('@assets/fonts/spartan/Spartan-Regular.ttf'),
  'Spartan-Light': require('@assets/fonts/spartan/Spartan-Light.ttf'),
}

const Router = (): JSX.Element => {
  const [appIsReady, setAppIsReady] = React.useState(false)

  // const announcements = useAnnouncements()

  const styles = useStyles()

  const { colors } = useTheme()

  React.useEffect(() => {
    async function prepare(): Promise<void> {
      try {
        await Fonts.loadAsync(localFonts)
        await new Promise((resolve) => {
          return setTimeout(resolve, 2000)
        })
      } catch (e) {
        print('error on start', e, 'blue')
      } finally {
        setAppIsReady(true)
      }
    }

    prepare()
  }, [])

  const onLayoutRootView = React.useCallback(() => {
    if (appIsReady) SplashScreen.hide()
  }, [appIsReady])

  if (!appIsReady) {
    return null
  }
  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor={colors.background.default}
        barStyle={'light-content'}
      />

      <LoadingModal />
      {/* <NewVersionModal /> */}
      {/* <NetworkModal /> */}

      <ToastNotification />
      <View
        onLayout={onLayoutRootView}
        style={styles.container}
      >
        {Navigation}
      </View>
    </>
  )
}

export default Router
