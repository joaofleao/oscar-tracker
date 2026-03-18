import { StyleSheet, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  root: ViewStyle
  position: ViewStyle
}

const useStyles = (): StylesReturn => {
  const { semantics } = useTheme()
  return StyleSheet.create({
    root: {
      position: 'relative',
    },
    position: {
      position: 'absolute',
      right: -8,
      top: -8,

      backgroundColor: semantics.container.foreground.default,
      minWidth: 26,
      minHeight: 26,
      borderRadius: 200,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: semantics.accent.foreground.default,
    },
  })
}

export default useStyles
