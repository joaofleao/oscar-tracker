import { StyleSheet, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  root: ViewStyle
  android: ViewStyle
  blur: ViewStyle
}

const useStyles = (): StylesReturn => {
  const { semantics } = useTheme()

  return StyleSheet.create({
    root: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,

      opacity: 0,
      backgroundColor: semantics.background.base.tint,
    },
    android: {
      backgroundColor: semantics.background.base.darken,
    },
    blur: {
      width: '100%',
      height: '100%',
    },
  })
}

export default useStyles
