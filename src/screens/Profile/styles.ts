import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  content: ViewStyle
  mainContent: ViewStyle
  contentContainer: ViewStyle
  row: ViewStyle
  imagePlaceholder: ViewStyle

  profileInfo: ViewStyle
  name: TextStyle
  section: TextStyle
  email: TextStyle
  nickname: TextStyle

  title: TextStyle
  subtitle: TextStyle

  list: ViewStyle
  smallColumn: ViewStyle
  card: ViewStyle
  iconContainer: ViewStyle
  feature: TextStyle
  image: ImageStyle
}

const useStyles = (): StylesReturn => {
  const { colors, fonts } = useTheme()
  return StyleSheet.create({
    content: {
      paddingHorizontal: 20,
    },
    contentContainer: {
      gap: 100,
      justifyContent: 'center',
    },

    row: {
      gap: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    imagePlaceholder: {
      backgroundColor: colors.background.container,
      width: 80,
      height: 80,
      borderRadius: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    name: {
      fontFamily: fonts.secondary.bold,
      color: colors.text.default,
      fontSize: 16,
    },
    email: {
      fontFamily: fonts.secondary.bold,
      color: colors.text.light,
      fontSize: 16,
    },
    nickname: {
      fontFamily: fonts.secondary.bold,
      color: colors.text.light,
      fontSize: 16,
    },

    profileInfo: {
      gap: 20,
    },
    list: {
      paddingHorizontal: 20,
    },

    section: {
      gap: 8,
    },

    mainContent: {
      gap: 40,
    },

    title: {
      marginTop: 80,
      fontSize: 32,
      lineHeight: 44,
      fontFamily: fonts.primary.bold,
      color: colors.text.default,
      textAlign: 'center',
    },

    subtitle: {
      fontSize: 16,
      lineHeight: 24,
      fontFamily: fonts.secondary.bold,
      color: colors.text.default,
      textAlign: 'center',
    },

    smallColumn: {
      gap: 16,
      alignItems: 'center',
    },

    card: {
      flex: 1,
      alignItems: 'center',
      gap: 8,
    },

    iconContainer: {
      backgroundColor: colors.background.container,

      borderRadius: 200,

      width: 52,
      height: 52,
      alignItems: 'center',
      justifyContent: 'center',
    },

    feature: {
      fontFamily: fonts.secondary.bold,
      color: colors.text.default,
      textAlign: 'center',
    },
    image: {
      flex: 1,
      maxWidth: '30%',
      aspectRatio: 2 / 3,
      borderRadius: 12,
    },
  })
}

export default useStyles
