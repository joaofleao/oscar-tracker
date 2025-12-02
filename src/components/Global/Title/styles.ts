import { StyleSheet, TextStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  title: TextStyle
}

const useStyles = (): StylesReturn => {
  const { colors, fonts } = useTheme()

  return StyleSheet.create({
    title: {
      fontFamily: fonts.primary.bold,
      fontSize: 22,
      lineHeight: 32,
      color: colors.text.default,
      letterSpacing: 1.5,
    },
  })
}

export default useStyles
