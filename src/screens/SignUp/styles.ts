import { StyleSheet, TextStyle, useWindowDimensions, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  header: ViewStyle
  content: TextStyle
  form: ViewStyle
  centeredContent: ViewStyle
  countdown: TextStyle
  helper: TextStyle
}

const useStyles = (): StylesReturn => {
  const { fonts, colors } = useTheme()
  const { width } = useWindowDimensions()

  return StyleSheet.create({
    header: {
      gap: 12,
      justifyContent: 'center',
      paddingVertical: 80,
    },
    content: {
      width: width - 40,
    },
    centeredContent: {
      gap: 24,
      alignItems: 'center',
    },
    form: {
      gap: 12,
    },
    countdown: {
      fontFamily: fonts.secondary.bold,
      color: colors.primary.default,
    },
    helper: {
      textAlign: 'center',
      fontFamily: fonts.secondary.regular,
      fontSize: 16,
      lineHeight: 24,
      color: colors.text.default,
    },
  })
}

export default useStyles
