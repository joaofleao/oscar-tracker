import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  dynamicHeader: ViewStyle
  stickyHeader: ViewStyle
  title: TextStyle
  subTitle: TextStyle
  description: TextStyle
  accent: TextStyle
}

const useStyles = (): StylesReturn => {
  const { colors, fonts } = useTheme()

  return StyleSheet.create({
    dynamicHeader: {
      justifyContent: 'flex-end',
      overflow: 'hidden',
      gap: 16,
    },
    stickyHeader: {
      backgroundColor: colors.background.default,
      paddingHorizontal: 20,
      gap: 16,
      paddingBottom: 12,
    },
    title: {
      color: colors.text.default,
      fontSize: 24,
      lineHeight: 36,
      fontFamily: fonts.secondary.regular,
    },
    subTitle: {
      color: colors.text.default,
      fontSize: 20,
      lineHeight: 36,
      fontFamily: fonts.secondary.regular,
    },
    description: {
      color: colors.text.light,
      fontSize: 20,
      lineHeight: 36,
      fontFamily: fonts.secondary.regular,
    },
    accent: {
      color: colors.primary.default,
      fontFamily: fonts.quaternary.bold,
    },
  })
}

export default useStyles
