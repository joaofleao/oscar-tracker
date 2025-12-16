import { StyleSheet, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  header: ViewStyle
  footer: ViewStyle
}

const useStyles = (): StylesReturn => {
  const { semantics } = useTheme()
  const { bottom, top, right } = useSafeAreaInsets()
  return StyleSheet.create({
    footer: {
      flexDirection: 'row',
      alignSelf: 'center',
      borderWidth: 1,
      borderColor: semantics.container.stroke.default,
      backgroundColor: semantics.container.base.default,
      borderRadius: 30,
      position: 'absolute',
      overflow: 'hidden',
      zIndex: 10,
      bottom: bottom + 20,
    },
    header: {
      position: 'absolute',
      zIndex: 10,
      top: top + 20,
      right: right + 20,
    },
  })
}

export default useStyles
