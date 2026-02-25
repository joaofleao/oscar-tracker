import React from 'react'
import { Platform, StatusBar, View } from 'react-native'
import { createMMKV } from 'react-native-mmkv'
import * as Fonts from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { use as run } from 'i18next'
import { initReactI18next, useTranslation } from 'react-i18next'

import useStyles from './styles'
import { StackProps } from './types'
import { IconFilm, IconOscar, IconPerson } from '@components/icon'
import NavBar from '@components/nav_bar'
import { fontImports, useTheme } from '@providers/theme'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Auth from '@screens/auth'
import Awards from '@screens/awards'
import Category from '@screens/category'
import FilterMovies from '@screens/filter_movies'
import FilterNominations from '@screens/filter_nominations'
import Movie from '@screens/movie'
import Movies from '@screens/movies'
import Nominations from '@screens/nominations'
import Profile from '@screens/profile'
import Search from '@screens/search'
import SearchFriends from '@screens/search_friends'
import SelectEdition from '@screens/select_edition'
import Settings from '@screens/settings'
import enUS from '@translations/locales/en_US.json'
import ptBR from '@translations/locales/pt_BR.json'
import print from '@utils/print'

export const storage = createMMKV()
const Stack = createNativeStackNavigator<StackProps>()
const Tabs = createBottomTabNavigator<StackProps>()

const initI18n = async (): Promise<void> => {
  const lng = storage.getString('user.language') ?? 'en_US'
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
    // Create shared values for scroll tracking on each tab

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
              { icon: <IconPerson />, label: t('home:profile'), id: 'profile' },
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
        <Tabs.Screen
          name={'profile'}
          component={Profile}
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
              sheetAllowedDetents: Platform.OS === 'ios' ? 'fitToContents' : [0.6],
              contentStyle: { backgroundColor: semantics.container.base.default },
            }}
          />
          <Stack.Screen
            name={'settings'}
            component={Settings}
            options={{
              presentation: Platform.OS === 'ios' ? 'pageSheet' : undefined,
              contentStyle: { backgroundColor: semantics.container.base.default },
            }}
          />
          <Stack.Screen
            name={'filter_nominations'}
            component={FilterNominations}
            options={{
              presentation: Platform.OS === 'ios' ? 'pageSheet' : undefined,
              contentStyle: { backgroundColor: semantics.container.base.default },
            }}
          />
          <Stack.Screen
            name={'filter_movies'}
            component={FilterMovies}
            options={{
              presentation: Platform.OS === 'ios' ? 'pageSheet' : undefined,
              contentStyle: { backgroundColor: semantics.container.base.default },
            }}
          />
          <Stack.Screen
            name={'movie'}
            component={Movie}
            options={{
              presentation: Platform.OS === 'ios' ? 'pageSheet' : undefined,
              contentStyle: { backgroundColor: semantics.container.base.default },
            }}
          />
          <Stack.Screen
            name={'awards'}
            component={Awards}
          />

          <Stack.Screen
            name={'select_edition'}
            component={SelectEdition}
            options={{
              presentation: 'formSheet',
              sheetAllowedDetents: [0.5],
              contentStyle: { backgroundColor: semantics.container.base.default },
            }}
          />
          <Stack.Screen
            name={'search'}
            component={Search}
            options={{
              presentation: Platform.OS === 'ios' ? 'formSheet' : undefined,
              sheetAllowedDetents: 'fitToContents',
              contentStyle: { backgroundColor: semantics.container.base.default },
            }}
          />
          <Stack.Screen
            name={'search_friends'}
            component={SearchFriends}
            options={{
              presentation: Platform.OS === 'ios' ? 'formSheet' : undefined,
              sheetAllowedDetents: 'fitToContents',
              contentStyle: { backgroundColor: semantics.container.base.default },
            }}
          />

          <Stack.Screen
            name={'category'}
            component={Category}
            options={{
              presentation: Platform.OS === 'ios' ? 'pageSheet' : undefined,
              sheetAllowedDetents: 'fitToContents',
              contentStyle: { backgroundColor: semantics.container.base.default },
            }}
          />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  )
}

export default Router
