import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { KeyboardProvider } from 'react-native-keyboard-controller'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ConvexProvider, ConvexReactClient } from 'convex/react'
import * as SecureStore from 'expo-secure-store'

import { ConvexAuthProvider } from '@convex-dev/auth/react'
import EditionProvider from '@providers/edition/provider'
import { StringsProvider } from '@providers/strings'
import { ThemeProvider } from '@providers/theme'
import UserProvider from '@providers/user/provider'
import Router from '@router/router'

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
})

const secureStorage = {
  getItem: SecureStore.getItemAsync,
  setItem: SecureStore.setItemAsync,
  removeItem: SecureStore.deleteItemAsync,
}

export default function App(): React.ReactElement {
  return (
    <GestureHandlerRootView>
      <KeyboardProvider>
        <ThemeProvider>
          <SafeAreaProvider>
            <ConvexAuthProvider
              client={convex}
              storage={secureStorage}
            >
              <ConvexProvider client={convex}>
                <EditionProvider>
                  <UserProvider>
                    <StringsProvider>
                      <Router />
                    </StringsProvider>
                  </UserProvider>
                </EditionProvider>
              </ConvexProvider>
            </ConvexAuthProvider>
          </SafeAreaProvider>
        </ThemeProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  )
}
