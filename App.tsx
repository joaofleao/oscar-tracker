import { useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { getItem, setItem } from 'expo-secure-store'

import packageJson from '@package.json'
// import { AnnouncementsProvider } from '@providers/announcements'
// import { AppProvider } from '@providers/app'
// import { AuthProvider } from '@providers/auth'
// import { BallotsProvider } from '@providers/ballots'
// import { CategoriesProvider } from '@providers/categories'
// import { EditionProvider } from '@providers/edition'
// import { LoadingProvider } from '@providers/loading'
// import { MoviesProvider } from '@providers/movies'
import { ThemeProvider } from '@providers/theme'
// import { ToastProvider } from '@providers/toast'
// import { UserProvider } from '@providers/user'
// import { WatchedMoviesProvider } from '@providers/watchedMovies'
import Router from '@router/router'
import { print } from '@utils/functions'

const App = (): React.ReactElement => {
  useEffect(() => {
    // const clearAsyncStorage = async () => {
    //   try {
    //     await AsyncStorage.clear()
    //     console.log('AsyncStorage cleared successfully.')
    //   } catch (error) {
    //     console.error('Error clearing AsyncStorage:', error)
    //   }
    // }

    // const printAsyncStorageKeys = async () => {
    //   await AsyncStorage.getAllKeys().then(console.log)
    // }

    // const fetchAndPrintStorage = async () => {
    //   try {
    //     const keys = await AsyncStorage.getAllKeys()
    //     const result = await AsyncStorage.multiGet(keys)
    //     const storageObject = result.reduce(
    //       (acc, [key, value]) => {
    //         acc[key] = value
    //         return acc
    //       },
    //       {} as Record<string, string | null>,
    //     )
    //     console.log('AsyncStorage contents:')
    //     console.table(storageObject)
    //   } catch (error) {
    //     console.error('Error fetching AsyncStorage data:', error)
    //   }
    // }

    const checkAndUpdateVersion = async (): Promise<void> => {
      try {
        const storedVersion = await getItem('version')
        const currentVersion = packageJson.version

        if (storedVersion !== currentVersion) {
          // Run cleanup
          // await clear()
          print('AsyncStorage', 'Storage cleaned up due to version change', 'yellow')

          // Save the new version
          await setItem('version', currentVersion)
          print('AsyncStorage', `New version ${currentVersion} saved`, 'green')
        } else {
          print('AsyncStorage', 'Version is up to date', 'green')
        }
      } catch (error) {
        print('AsyncStorage', `Failed to check or update version: ${error}`, 'red')
      }
    }

    checkAndUpdateVersion()
    // printAsyncStorageKeys()
    // fetchAndPrintStorage()
    // clearAsyncStorage()
  }, [])

  return (
    // <AppProvider>
    <SafeAreaProvider>
      <ThemeProvider>
        {/* <LoadingProvider>
          <ToastProvider>
            <AnnouncementsProvider>
              <UserProvider>
                <AuthProvider>
                  <MoviesProvider>
                    <EditionProvider>
                      <CategoriesProvider>
                        <WatchedMoviesProvider>
                          <BallotsProvider> */}
        <Router />
        {/* </BallotsProvider>
                        </WatchedMoviesProvider>
                      </CategoriesProvider>
                    </EditionProvider>
                  </MoviesProvider>
                </AuthProvider>
              </UserProvider>
            </AnnouncementsProvider>
          </ToastProvider>
        </LoadingProvider> */}
      </ThemeProvider>
    </SafeAreaProvider>
    // </AppProvider>
  )
}

export default App
