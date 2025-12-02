import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  container: ViewStyle
  rule: TextStyle
  valid: TextStyle
}

const useStyles = (): StylesReturn => {
  const { colors, fonts } = useTheme()

  return StyleSheet.create({
    rule: {
      flex: 1,
      color: colors.text.light,
      fontFamily: fonts.secondary.bold,
      fontSize: 12,
      lineHeight: 18,
    },
    valid: {
      color: colors.positive.default,
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
  })
}

export default useStyles
