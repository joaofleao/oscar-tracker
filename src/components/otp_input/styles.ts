import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  container: ViewStyle
  codeContainer: ViewStyle
  codeText: TextStyle
  hiddenInput: ViewStyle
}

const useStyles = (): StylesReturn => {
  const { semantics, fonts } = useTheme()

  return StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 20,
    },
    codeContainer: {
      borderWidth: 1,
      borderRadius: 12,
      backgroundColor: semantics.container.base.default,
      borderColor: semantics.container.stroke.default,

      height: 60,
      width: 44,
      justifyContent: 'center',
      alignItems: 'center',
    },
    codeText: {
      fontFamily: fonts.secondary.black,
      fontSize: 28,
      color: semantics.container.foreground.default,
    },
    hiddenInput: {
      ...StyleSheet.absoluteFillObject,
      color: 'transparent',
      opacity: 0,
    },
  })
}

export default useStyles
