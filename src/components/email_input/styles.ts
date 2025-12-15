import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  root: ViewStyle
  leading: ViewStyle
  trailing: ViewStyle
  input: TextStyle
}

const useStyles = (): StylesReturn => {
  const { semantics, fonts } = useTheme()

  return StyleSheet.create({
    root: {
      borderColor: semantics.container.stroke.default,
      borderWidth: 1,
      width: '100%',
      borderRadius: 12,
      backgroundColor: semantics.container.base.default,
      flexDirection: 'row',
      alignItems: 'center',
    },
    leading: {
      position: 'absolute',
      left: 8,
    },
    trailing: {
      position: 'absolute',
      right: 8,

      padding: 4,
      borderWidth: 1,
      borderColor: 'transparent',

      alignItems: 'center',
    },
    input: {
      height: 40,
      letterSpacing: 1,
      color: semantics.container.foreground.default,
      fontFamily: fonts.secondary.regular,
      padding: 8,
      paddingRight: 8 + 24 + 4,
      paddingLeft: 8 + 24 + 4,
      fontSize: 14,
      flex: 1,
    },
  })
}

export default useStyles
