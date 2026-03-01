import { ConfigContext, ExpoConfig } from 'expo/config'

const IS_DEV = process.env.APP_VARIANT === 'development'

export default ({ config }: ConfigContext): ExpoConfig => {
  return {
    ...config,
    name: IS_DEV ? 'Academy Dev' : process.env.APP_NAME || 'Academy Tracker',
    slug: process.env.APP_SLUG || 'oscar-tracker',
    scheme: process.env.APP_SLUG || 'oscar-tracker',
    version: '5.1',
    orientation: 'portrait',
    icon: './src/assets/app/icon.png',
    plugins: [
      '@react-native-community/datetimepicker',
      'expo-font',
      'expo-apple-authentication',
      'expo-web-browser',
      'expo-secure-store',
      ['expo-image-picker', { photosPermission: 'The app accesses your photos to let you share them with your friends.' }],
      [
        'expo-splash-screen',
        {
          backgroundColor: '#0D0D0D',
          image: './src/assets/app/splash-icon.png',
          dark: {
            image: './src/assets/app//splash-icon-dark.png',
            backgroundColor: '#0D0D0D',
          },
          imageWidth: 440,
          resizeMode: 'contain',
        },
      ],
    ],
    ios: {
      usesAppleSignIn: true,
      supportsTablet: true,
      bundleIdentifier: IS_DEV ? 'com.joaofleao.oscar-tracker.dev' : 'com.joaofleao.oscar-tracker',

      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
        CFBundleURLTypes: [
          {
            CFBundleURLSchemes: ['com.googleusercontent.apps.674386239678-bnrobvq969mockak51tqpbgpjb0lu1qq'],
          },
        ],
      },
      icon: {
        light: './src/assets/app/icon.png',
        dark: './src/assets/app/icon-dark.png',
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './src/assets/app/adaptive-icon.png',
        backgroundColor: '#0D0D0D',
      },
      package: IS_DEV ? 'com.joaofleao.oscar_tracker.dev' : 'com.joaofleao.oscar_tracker',
    },
    web: {
      favicon: './src/assets/app/favicon.png',
    },
    extra: {
      eas: {
        projectId: '9ef1512c-10df-409b-ac04-04c8ebfa96d2',
      },
    },
  }
}
