import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  root: ViewStyle
  leading: ViewStyle
  trailing: ViewStyle
  divider: ViewStyle
  input: TextStyle
  inputWithIcon: TextStyle
  inputWithButton: TextStyle
}

const useStyles = (): StylesReturn => {
  const { semantics, fonts } = useTheme()

  return StyleSheet.create({
    root: {
      borderColor: semantics.container.stroke.default,
      borderWidth: 1,
      width: '100%',
      borderRadius: 12,
      backgroundColor: semantics.container.base.tint,
      flexDirection: 'row',
      alignItems: 'center',
    },
    leading: {
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    trailing: {
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    divider: {
      backgroundColor: semantics.container.stroke.default,
      width: 1,
      height: 40,
    },
    input: {
      height: 40,
      letterSpacing: 1,
      color: semantics.container.foreground.default,
      fontFamily: fonts.secondary.regular,
      fontSize: 14,
      flex: 1,
      paddingHorizontal: 12,
    },
    inputWithIcon: {
      paddingLeft: 0,
    },
    inputWithButton: {
      paddingRight: 0,
    },
  })
}

export default useStyles
