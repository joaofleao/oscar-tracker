import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  container: ViewStyle
  description: TextStyle
}

const useStyles = (): StylesReturn => {
  const { colors, fonts } = useTheme()

  return StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      backgroundColor: colors.background.default,
    },
    description: {
      color: colors.text.default,
      fontFamily: fonts.secondary.bold,
      fontSize: 20,
      marginTop: 8,
    },
  })
}

export default useStyles
