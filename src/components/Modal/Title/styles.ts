import { StyleSheet, TextStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  root: TextStyle
}

const useStyles = (): StylesReturn => {
  const { colors, fonts } = useTheme()

  return StyleSheet.create({
    root: {
      color: colors.text.default,
      fontFamily: fonts.secondary.bold,
      fontSize: 20,
      lineHeight: 24,
    },
  })
}

export default useStyles
