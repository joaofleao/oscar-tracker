import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  content: ViewStyle
  confirmationButton: TextStyle
  updateItem: TextStyle
}

const useStyles = (): StylesReturn => {
  const { colors, fonts } = useTheme()

  return StyleSheet.create({
    content: {
      maxHeight: 200,
    },
    confirmationButton: {
      alignSelf: 'center',
    },
    updateItem: {
      fontFamily: fonts.secondary.medium,
      color: colors.text.default,
      fontSize: 14,
    },
  })
}

export default useStyles
