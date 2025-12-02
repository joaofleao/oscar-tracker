import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  header: ViewStyle
  title: TextStyle
  list: ViewStyle
  caroussel: ViewStyle
}

const useStyles = (): StylesReturn => {
  const { fonts, colors } = useTheme()
  return StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      fontFamily: fonts.secondary.bold,
      color: colors.text.default,
      fontSize: 20,
      lineHeight: 28,
      flex: 1,
    },
    list: {
      marginHorizontal: -20,
    },
    caroussel: {
      marginHorizontal: 20,
      gap: 20,
    },
  })
}

export default useStyles
