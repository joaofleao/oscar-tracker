import { StyleSheet, TextStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  root: TextStyle
}

const useStyles = (): StylesReturn => {
  const { colors, fonts } = useTheme()

  return StyleSheet.create({
    root: {
      color: colors.text.disabled,
      fontFamily: fonts.secondary.medium,
      fontSize: 14,
      lineHeight: 20,
    },
  })
}

export default useStyles
