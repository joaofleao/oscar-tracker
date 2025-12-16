import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  content: ViewStyle
  contentContainer: ViewStyle
  section: ViewStyle
  item: ViewStyle
  bottom: ViewStyle

  accentText: TextStyle
  label: TextStyle
}

const useStyles = (): StylesReturn => {
  const { colors, fonts } = useTheme()
  return StyleSheet.create({
    content: {
      paddingHorizontal: 20,
    },
    contentContainer: {
      gap: 40,
    },
    section: {
      gap: 16,
    },
    item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    accentText: {
      color: colors.primary.default,
      fontFamily: fonts.secondary.bold,
      fontSize: 16,
      lineHeight: 24,
    },
    label: {
      color: colors.text.default,
      fontFamily: fonts.secondary.regular,
      fontSize: 16,
    },
    bottom: {
      gap: 16,
      alignItems: 'center',
    },
  })
}

export default useStyles
