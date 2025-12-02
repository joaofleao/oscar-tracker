import { Platform, StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  container: ViewStyle
  movingBackground: ViewStyle
  blur: ViewStyle
  title: TextStyle
}

const useStyles = (): StylesReturn => {
  const { fonts, colors } = useTheme()

  return StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      borderRadius: 12,
      overflow: 'hidden',
    },
    movingBackground: {
      height: '100%',
      width: '100%',
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
    },
    blur: {
      backgroundColor: Platform.OS === 'android' ? colors.background.container : 'transparent',
      height: '100%',
      width: '100%',
      justifyContent: 'center',
      borderRadius: 12,
      overflow: 'hidden',
    },
    title: {
      color: colors.text.default,
      fontFamily: fonts.secondary.bold,
      textAlign: 'center',
    },
  })
}

export default useStyles
