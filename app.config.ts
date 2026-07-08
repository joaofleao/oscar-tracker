import { ConfigContext, ExpoConfig } from 'expo/config'

const APP_NAME = process.env.APP_NAME || 'Academy Tracker'
const IOS_BUNDLE_IDENTIFIER = process.env.IOS_BUNDLE_IDENTIFIER || 'com.joaofleao.oscar-tracker'
const ANDROID_PACKAGE = process.env.ANDROID_PACKAGE || 'com.joaofleao.oscar_tracker'

export default ({ config }: ConfigContext): ExpoConfig => {
  return {
    ...config,
    name: APP_NAME,
    slug: 'oscar-tracker',
    scheme: 'oscar-tracker',
    version: '5.2',
    orientation: 'portrait',
    icon: './src/assets/app/icon.png',
    plugins: [
      'expo-sharing',
      '@react-native-community/datetimepicker',
      'expo-font',
      'expo-secure-store',
      [
        'expo-image-picker',
        {
          photosPermission: 'The app accesses your photos to let you share them with your friends.',
        },
      ],
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
      bundleIdentifier: IOS_BUNDLE_IDENTIFIER,

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
      package: ANDROID_PACKAGE,
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
