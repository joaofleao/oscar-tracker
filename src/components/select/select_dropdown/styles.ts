import { Dimensions, StyleSheet, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  options: ViewStyle
  overlay: ViewStyle
  popover: ViewStyle
  option: ViewStyle
  optionIcon: ViewStyle
  optionHighlight: ViewStyle
}

const useStyles = (): StylesReturn => {
  const { semantics } = useTheme()

  const window = Dimensions.get('window')
  const insets = useSafeAreaInsets()

  return StyleSheet.create({
    options: {
      gap: 8,
    },
    overlay: {
      position: 'absolute',
      backgroundColor: semantics.background.base.tint,
      width: '100%',
      height: '100%',
    },
    popover: {
      gap: 8,
      maxHeight: window.height / 2,
      bottom: insets.bottom + 20,
      alignSelf: 'center',
      width: window.width - 40,
      padding: 16,
      position: 'absolute',
      borderRadius: 16,
      backgroundColor: semantics.container.base.original,
      borderColor: semantics.container.stroke.default,
      borderWidth: 1,
    },

    option: {
      borderRadius: 16,
      paddingVertical: 8,
      paddingHorizontal: 16,
      backgroundColor: semantics.container.base.original,
      borderColor: semantics.container.stroke.default,
      borderWidth: 1,
      flexDirection: 'row',
      gap: 8,
      alignItems: 'center',
    },
    optionIcon: {
      paddingHorizontal: 8,
    },
    optionHighlight: {
      backgroundColor: semantics.container.foreground.default,
      borderColor: semantics.container.stroke.default,
    },
  })
}

export default useStyles
