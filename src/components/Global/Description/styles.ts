import { StyleSheet, TextStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  description: TextStyle
}

const useStyles = (): StylesReturn => {
  const { colors, fonts } = useTheme()

  return StyleSheet.create({
    description: {
      fontFamily: fonts.secondary.regular,
      fontSize: 16,
      lineHeight: 24,
      color: colors.text.default,
      letterSpacing: 1,
    },
  })
}

export default useStyles
