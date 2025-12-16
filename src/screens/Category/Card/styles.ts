import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  root: ViewStyle
  content: ViewStyle
  rightContainer: ViewStyle
  title: TextStyle
  subtitle: TextStyle
  description: TextStyle
}

const useStyles = (): StylesReturn => {
  const { colors, fonts } = useTheme()
  return StyleSheet.create({
    root: {
      justifyContent: 'center',
      flexDirection: 'row',
      gap: 16,
      flex: 1,
    },
    content: {
      flex: 1,

      justifyContent: 'center',
    },
    rightContainer: {
      flexDirection: 'row',
      gap: 4,
    },
    title: {
      fontSize: 18,
      lineHeight: 24,
      fontFamily: fonts.secondary.bold,
      color: colors.text.default,
      flex: 1,
    },
    subtitle: {
      fontSize: 16,
      lineHeight: 24,
      fontFamily: fonts.secondary.regular,
      color: colors.text.light,
    },
    description: {
      fontSize: 16,
      lineHeight: 24,
      fontFamily: fonts.secondary.regular,
      color: colors.text.default,
    },
  })
}

export default useStyles
