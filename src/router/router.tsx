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
import Categories from '@screens/categories'
import Category from '@screens/category'
import FilterCategories from '@screens/filter_categories'
import FilterMovies from '@screens/filter_movies'
import Movie from '@screens/movie'
import Movies from '@screens/movies'
import Profile from '@screens/profile'
import Search from '@screens/search'
import SearchFriends from '@screens/search_friends'
import SelectCountry from '@screens/select_country'
import SelectEdition from '@screens/select_edition'
import Settings from '@screens/settings'
import enUS from '@translations/locales/en_US.json'
import ptBR from '@translations/locales/pt_BR.json'
import print from '@utils/print'

export const storage = createMMKV()
const Stack = createNativeStackNavigator<StackProps>()
const Tabs = createBottomTabNavigator<StackProps>()

const initI18n = async (): Promise<void> => {
  const lng = storage.getString('user.language') ?? 'pt_BR'
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
            overflow: 'visible',
          },
        }}
        tabBar={(props) => (
          <NavBar
            tabs={[
              { icon: <IconOscar />, label: t('home:categories'), id: 'categories' },
              { icon: <IconFilm />, label: t('home:movies'), id: 'movies' },
              { icon: <IconPerson />, label: t('home:profile'), id: 'profile' },
            ]}
            {...props}
          />
        )}
      >
        <Tabs.Screen
          name={'categories'}
          component={Categories}
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

          {/* uses keyboard */}
          <Stack.Group
            screenOptions={{
              presentation: 'formSheet',
              sheetAllowedDetents: Platform.OS === 'ios' ? 'fitToContents' : [0.9],
              contentStyle: {
                backgroundColor: semantics.container.base.default,
              },
            }}
          >
            <Stack.Screen
              name={'auth'}
              component={Auth}
            />
            <Stack.Screen
              name={'search'}
              component={Search}
            />
            <Stack.Screen
              name={'search_friends'}
              component={SearchFriends}
            />
          </Stack.Group>

          {/* requires footer */}
          <Stack.Group
            screenOptions={{
              presentation: Platform.OS === 'ios' ? 'pageSheet' : 'formSheet',
              sheetAllowedDetents: [0.9],
              contentStyle: {
                backgroundColor: semantics.container.base.default,
              },
            }}
          >
            <Stack.Screen
              name={'filter_categories'}
              component={FilterCategories}
            />
            <Stack.Screen
              name={'filter_movies'}
              component={FilterMovies}
            />
            <Stack.Screen
              name={'category'}
              component={Category}
            />
          </Stack.Group>

          {/* fullscreen */}
          <Stack.Group
            screenOptions={{
              presentation: Platform.OS === 'ios' ? 'pageSheet' : undefined,
              contentStyle: {
                backgroundColor: semantics.container.base.default,
              },
            }}
          >
            <Stack.Screen
              name={'settings'}
              component={Settings}
            />
            <Stack.Screen
              name={'movie'}
              component={Movie}
            />
          </Stack.Group>

          {/* selectors */}
          <Stack.Group
            screenOptions={{
              presentation: Platform.OS === 'ios' ? 'pageSheet' : 'formSheet',
              sheetAllowedDetents: [0.5, 0.9],
              contentStyle: {
                backgroundColor: semantics.container.base.default,
              },
            }}
          >
            <Stack.Screen
              name={'select_edition'}
              component={SelectEdition}
            />
            <Stack.Screen
              name={'select_country'}
              component={SelectCountry}
            />
          </Stack.Group>
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  )
}

export default Router
