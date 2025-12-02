import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  appName: TextStyle
  logo: ViewStyle
}

const useStyles = (): StylesReturn => {
  const { fonts, colors } = useTheme()

  return StyleSheet.create({
    appName: {
      color: colors.text.default,
      fontFamily: fonts.quaternary.regular,
      fontSize: 18,
    },
    logo: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  })
}

export default useStyles
