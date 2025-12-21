import { Dimensions, StyleSheet, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  overlay: ViewStyle
  popover: ViewStyle
}

const useStyles = (): StylesReturn => {
  const { semantics } = useTheme()

  const window = Dimensions.get('window')
  const insets = useSafeAreaInsets()

  return StyleSheet.create({
    overlay: {
      position: 'absolute',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      width: '100%',
      height: '100%',
    },
    popover: {
      gap: 8,
      maxHeight: window.height / 2,
      bottom: insets.bottom + 20,
      alignSelf: 'center',
      paddingHorizontal: 16,
      paddingBottom: 16,
      position: 'absolute',
      borderRadius: 16,
      backgroundColor: semantics.container.base.original,
      borderColor: semantics.container.stroke.default,
      borderWidth: 1,
    },
  })
}

export default useStyles
