import { ConfigContext, ExpoConfig } from 'expo/config'

export default ({ config }: ConfigContext): ExpoConfig => {
  return {
    ...config,
    name: 'Oscar Tracker',
    slug: 'oscar-tracker',
    scheme: 'oscar-tracker',
    version: '5.0',
    orientation: 'portrait',
    icon: './src/assets/app/icon.png',
    newArchEnabled: true,
    plugins: [
      'expo-apple-authentication',
      'expo-web-browser',
      'expo-secure-store',

      [
        '@react-native-google-signin/google-signin',
        {
          iosUrlScheme: 'com.googleusercontent.apps.674386239678-bnrobvq969mockak51tqpbgpjb0lu1qq',
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
      bundleIdentifier: 'com.joaofleao.oscar-tracker',

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
      edgeToEdgeEnabled: true,
      package: 'com.joaofleao.oscar-tracker',
    },
    web: {
      favicon: './src/assets/app/favicon.png',
    },
    extra: {
      eas: {
        projectId: 'f469e399-cb7d-475c-a9e7-d4a1a675cfbf',
      },
    },
  }
}
