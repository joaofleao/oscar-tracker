import { StyleSheet, TextStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  label: TextStyle
  accent: TextStyle
}

const useStyles = (): StylesReturn => {
  const { colors, fonts } = useTheme()

  return StyleSheet.create({
    label: {
      color: colors.text.light,
      fontFamily: fonts.secondary.regular,
      fontSize: 12,
      lineHeight: 18,
    },
    accent: {
      color: colors.primary.default,
    },
  })
}

export default useStyles
