import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  root: ViewStyle
  leading: ViewStyle
  trailing: ViewStyle
  input: TextStyle
  container: TextStyle
  rule: TextStyle
  divider: ViewStyle
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

    rule: {
      flex: 1,
    },

    container: {
      flexDirection: 'row',
      gap: 8,
    },
  })
}

export default useStyles
