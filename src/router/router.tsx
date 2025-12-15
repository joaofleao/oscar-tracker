import React from 'react'
import { StatusBar, View } from 'react-native'
import * as Fonts from 'expo-font'
import { LinearGradient } from 'expo-linear-gradient'
import * as SecureStore from 'expo-secure-store'
import * as SplashScreen from 'expo-splash-screen'
import { use as run } from 'i18next'
import { initReactI18next, useTranslation } from 'react-i18next'

import useStyles from './styles'
import { StackProps } from './types'
import { IconFilm, IconOscar } from '@components/icon'
import NavBar from '@components/nav_bar'
import { fontImports, useTheme } from '@providers/theme'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Auth from '@screens/auth'
// import { IconBookmarks, IconFilm } from '@components/icon'
// import NavBar from '@components/nav_bar'
// import { fontImports, useTheme } from '@providers/theme'
// import { routes } from '@router'
// import Auth from '@screens/auth'
// import Movie from '@screens/movie'
// import Onboarding from '@screens/onboarding'
// import PasswordRecovery from '@screens/password_recovery'
// import Profile from '@screens/profile'
// import Search from '@screens/search'
// import WatchedMovie from '@screens/watched_movie'
// import WatchedMovies from '@screens/watched_movies'
import Movies from '@screens/movies'
import Nominations from '@screens/nominations'
import Profile from '@screens/profile'
import enUS from '@translations/locales/en_US.json'
import ptBR from '@translations/locales/pt_BR.json'
import print from '@utils/print'
// import print from '@utils/print'

const Stack = createNativeStackNavigator<StackProps>()
const Tabs = createBottomTabNavigator<StackProps>()

const initI18n = async (): Promise<void> => {
  const lng = SecureStore.getItem('language') ?? 'en_US'
  run(initReactI18next).init({
    resources: {
      pt_BR: ptBR,
      en_US: enUS,
    },
    lng,
    interpolation: { escapeValue: false },
  })
}

initI18n()

SplashScreen.preventAutoHideAsync()

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
})

const Router = (): React.ReactNode => {
  const [appReady, setAppReady] = React.useState(false)
  const { semantics } = useTheme()
  const styles = useStyles()
  const { t } = useTranslation()

  React.useEffect(() => {
    async function prepare(): Promise<void> {
      try {
        await Fonts.loadAsync(fontImports)
        await new Promise((resolve) => {
          return setTimeout(resolve, 2000)
        })
      } catch (e: any) {
        print('error on start', e, 'blue')
      } finally {
        setAppReady(true)
      }
    }
    prepare()
  }, [])

  if (!appReady) return null

  const renderTabs = (): React.ReactElement => {
    return (
      <Tabs.Navigator
        backBehavior="none"
        screenOptions={{
          headerShown: false,
          sceneStyle: {
            backgroundColor: semantics.background.base.default,
          },
        }}
        tabBar={(props) => (
          <NavBar
            tabs={[
              { icon: <IconOscar />, label: t('home:nominations'), id: 'nominations' },
              { icon: <IconFilm />, label: t('home:movies'), id: 'movies' },
            ]}
            {...props}
          />
        )}
      >
        <Tabs.Screen
          name={'nominations'}
          component={Nominations}
        />
        <Tabs.Screen
          name={'movies'}
          component={Movies}
        />
      </Tabs.Navigator>
    )
  }

  return (
    <NavigationContainer>
      <StatusBar
        animated={true}
        backgroundColor={semantics.background.base.default}
        barStyle={'light-content'}
      />

      <View
        style={styles.container}
        onLayout={SplashScreen.hideAsync}
      >
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: semantics.background.base.default,
            },
          }}
        >
          <Stack.Screen name={'home'}>{renderTabs}</Stack.Screen>

          <Stack.Screen
            name={'auth'}
            component={Auth}
            options={{
              presentation: 'formSheet',
              sheetAllowedDetents: 'fitToContents',
              contentStyle: {
                backgroundColor: semantics.container.base.original,
              },
            }}
          />
          <Stack.Screen
            name={'profile'}
            component={Profile}
            options={{
              presentation: 'formSheet',
              sheetAllowedDetents: 'fitToContents',
              contentStyle: {
                backgroundColor: semantics.container.base.original,
              },
            }}
          />

          {/* 

          <Stack.Screen
            name={'password_recovery'}
            component={PasswordRecovery}
          />

          <Stack.Screen
            name={'search'}
            component={Search}
            options={{
              presentation: 'formSheet',
              sheetExpandsWhenScrolledToEdge: false,
              sheetInitialDetentIndex: 'last',
              sheetAllowedDetents: 'fitToContents',

              contentStyle: {
                backgroundColor: semantics.container.base.original,
              },
            }}
          />

          <Stack.Screen
            name={'watched_movie'}
            component={WatchedMovie}
            options={{
              presentation: 'formSheet',
              sheetAllowedDetents: 'fitToContents',
              contentStyle: {
                backgroundColor: semantics.container.base.original,
              },
            }}
          />
          <Stack.Screen
            name={'profile'}
            component={Profile}
            options={{
              presentation: 'formSheet',
              sheetAllowedDetents: 'fitToContents',
              contentStyle: {
                backgroundColor: semantics.container.base.original,
              },
            }}
          />

          <Stack.Screen
            name={'auth'}
            component={Auth}
            options={{
              presentation: 'formSheet',
              sheetAllowedDetents: 'fitToContents',
              contentStyle: {
                backgroundColor: semantics.container.base.original,
              },
            }}
          />
          <Stack.Screen
            name={'onboarding'}
            component={Onboarding}
            options={{
              animation: 'slide_from_left',
            }}
          /> */}
        </Stack.Navigator>

        <LinearGradient
          colors={['rgba(0, 0, 0, 0.60)', 'rgba(0, 0, 0, 0.30)', 'rgba(0, 0, 0, 0.15)', 'rgba(0, 0, 0, 0)']}
          style={styles.topBlur}
        />
        <LinearGradient
          colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.15)', 'rgba(0, 0, 0, 0.30)', 'rgba(0, 0, 0, 0.60)']}
          style={styles.bottomBlur}
        />
      </View>
    </NavigationContainer>
  )
}

export default Router
