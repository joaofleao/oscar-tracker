import { StyleSheet, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  root: ViewStyle

  footer: ViewStyle
  curtain: ViewStyle
  triangle: ViewStyle
  leftCurtain: ViewStyle
  rightCurtain: ViewStyle
}

const useStyles = (): StylesReturn => {
  const { semantics } = useTheme()
  const { bottom } = useSafeAreaInsets()

  return StyleSheet.create({
    root: {
      // padding: 20,
      width: '100%',
      gap: 60,
      flex: 1,
      alignItems: 'center',
    },
    triangle: {
      marginTop: 120,
    },

    footer: {
      flex: 1,
      gap: 16,
      alignItems: 'center',
      paddingHorizontal: 20,
      position: 'absolute',
      bottom: bottom + 20,
    },
    curtain: {
      backgroundColor: semantics.container.base.original,
      width: '50%',
      position: 'absolute',
      bottom: 0,
      top: 0,
    },
    leftCurtain: {
      left: 0,
    },
    rightCurtain: {
      right: 0,
    },
  })
}

export default useStyles
