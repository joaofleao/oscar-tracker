import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  content: ViewStyle
  accent: TextStyle
  interactiveArea: ViewStyle
  card: ViewStyle
}

const useStyles = (): StylesReturn => {
  const { colors, fonts } = useTheme()
  return StyleSheet.create({
    content: {
      paddingHorizontal: 20,
      flex: 1,
    },
    accent: {
      color: colors.primary.default,
      fontFamily: fonts.secondary.bold,
    },
    interactiveArea: {
      gap: 12,
      // justifyContent: 'center',
      // flex: 1,
      flexDirection: 'row',
      // alignItems: 'flex-end',
    },
    card: {
      flexDirection: 'row',
    },
  })
}

export default useStyles
