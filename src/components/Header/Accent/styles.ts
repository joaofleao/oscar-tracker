import { StyleSheet, TextStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  root: TextStyle
}

const useStyles = (): StylesReturn => {
  const { fonts, colors } = useTheme()

  return StyleSheet.create({
    root: {
      color: colors.primary.default,
      fontFamily: fonts.quaternary.bold,
    },
  })
}

export default useStyles
