import 'dotenv/config'
import { ExpoConfig } from 'expo/config'

export default (): ExpoConfig => ({
  owner: 'joaofleao',
  name: 'Oscar Tracker',
  slug: 'oscartracker',
  icon: './src/assets/app/icon.png',
  newArchEnabled: true,

  plugins: [
    'expo-font',
    '@react-native-firebase/app',
    '@react-native-firebase/auth',
    [
      'expo-splash-screen',
      {
        backgroundColor: '#171C23',
        image: './src/assets/app/splash-icon-dark.png',
        dark: {
          backgroundColor: '#171C23',
          image: './src/assets/app/splash-icon-dark.png',
        },
        imageWidth: 200,
      },
    ],

    [
      'expo-build-properties',
      {
        ios: {
          useFrameworks: 'static',
        },
      },
    ],
  ],

  extra: {
    TMDB_API_KEY: process.env.TMDB_API_KEY,
    eas: {
      projectId: '8b994b96-2537-4c86-b4c9-6219f98bb639',
    },
  },

  androidStatusBar: {
    translucent: true,
    barStyle: 'light-content',
  },

  android: {
    softwareKeyboardLayoutMode: 'resize',
    adaptiveIcon: {
      foregroundImage: './src/assets/app/adaptive-icon.png',
      backgroundColor: '#171C23',
    },
    package: 'com.joaofleao.oscartracker',
    googleServicesFile: process.env.GOOGLE_SERVICES_ANDROID || './google-services.json',
  },

  ios: {
    googleServicesFile: process.env.GOOGLE_SERVICES_IOS || './GoogleService-Info.plist',
    supportsTablet: true,
    bundleIdentifier: 'com.joaofleao.oscartracker',
    bitcode: false,
  },

  web: {
    favicon: './src/assets/app/favicon.png',
  },
})
