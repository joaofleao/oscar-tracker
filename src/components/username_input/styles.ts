import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  root: ViewStyle
  leading: ViewStyle
  trailing: ViewStyle
  divider: ViewStyle
  input: TextStyle
}

const useStyles = (): StylesReturn => {
  const { semantics, fonts } = useTheme()

  return StyleSheet.create({
    root: {
      borderColor: semantics.container.stroke.default,
      backgroundColor: semantics.container.base.tint,
      borderWidth: 1,
      width: '100%',
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
    },
    leading: {
      position: 'absolute',
      left: 8,
    },
    divider: {
      backgroundColor: semantics.container.stroke.default,
      width: 1,
      borderRadius: 2,
      height: 20,
    },
    trailing: {
      right: 0,
      height: 40,
      width: 40,
      alignItems: 'center',
      justifyContent: 'center',
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
