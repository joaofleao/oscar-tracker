import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  container: ViewStyle
  countdown: TextStyle
  accent: TextStyle
}

const useStyles = (): StylesReturn => {
  const { colors, fonts } = useTheme()
  const insets = useSafeAreaInsets()

  return StyleSheet.create({
    container: {
      backgroundColor: colors.background.container,
      top: insets.top,
      left: 16,
      right: 16,
      alignSelf: 'flex-end',
      borderRadius: 18,
      position: 'absolute',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      elevation: 2,

      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.25,
      shadowRadius: 1.41,

      padding: 12,
    },
    countdown: {
      color: colors.text.default,
      fontFamily: fonts.secondary.bold,
      fontSize: 16,
      lineHeight: 20,
    },
    accent: {
      color: colors.primary.default,
    },
  })
}

export default useStyles
