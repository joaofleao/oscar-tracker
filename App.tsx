import { SafeAreaProvider } from 'react-native-safe-area-context'
import Router from '@routes/Router'

import { EditionProvider } from '@providers/edition'
import { CategoriesProvider } from '@providers/categories'
import { MoviesProvider } from '@providers/movies'
import { ThemeProvider } from '@providers/theme'
import { LoadingProvider } from '@providers/loading'
import { ToastProvider } from '@providers/toast'
import { UserProvider } from '@providers/user'
import { AuthProvider } from '@providers/auth'
import { AppProvider } from '@providers/app'
import { AnnouncementsProvider } from '@providers/announcements'
import { BallotsProvider } from '@providers/ballots'
import { WatchedMoviesProvider } from '@providers/watchedMovies'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect } from 'react'
import { print } from '@utils/functions'
import packageJson from '@package.json'

const App = (): JSX.Element => {
  useEffect(() => {
    const clearAsyncStorage = async () => {
      try {
        await AsyncStorage.clear()
        console.log('AsyncStorage cleared successfully.')
      } catch (error) {
        console.error('Error clearing AsyncStorage:', error)
      }
    }

    const printAsyncStorageKeys = async () => {
      await AsyncStorage.getAllKeys().then(console.log)
    }

    const fetchAndPrintStorage = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys()
        const result = await AsyncStorage.multiGet(keys)
        const storageObject = result.reduce(
          (acc, [key, value]) => {
            acc[key] = value
            return acc
          },
          {} as Record<string, string | null>,
        )
        console.log('AsyncStorage contents:')
        console.table(storageObject)
      } catch (error) {
        console.error('Error fetching AsyncStorage data:', error)
      }
    }

    const checkAndUpdateVersion = async (): Promise<void> => {
      try {
        const storedVersion = await AsyncStorage.getItem('version')
        const currentVersion = packageJson.version

        if (storedVersion !== currentVersion) {
          // Run cleanup
          await AsyncStorage.clear()
          print('AsyncStorage', 'Storage cleaned up due to version change', 'yellow')

          // Save the new version
          await AsyncStorage.setItem('version', currentVersion)
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
    <AppProvider>
      <SafeAreaProvider>
        <ThemeProvider>
          <LoadingProvider>
            <ToastProvider>
              <AnnouncementsProvider>
                <UserProvider>
                  <AuthProvider>
                    <MoviesProvider>
                      <EditionProvider>
                        <CategoriesProvider>
                          <WatchedMoviesProvider>
                            <BallotsProvider>
                              <Router />
                            </BallotsProvider>
                          </WatchedMoviesProvider>
                        </CategoriesProvider>
                      </EditionProvider>
                    </MoviesProvider>
                  </AuthProvider>
                </UserProvider>
              </AnnouncementsProvider>
            </ToastProvider>
          </LoadingProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </AppProvider>
  )
}

export default App
