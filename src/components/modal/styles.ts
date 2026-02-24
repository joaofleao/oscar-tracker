import { Dimensions, StyleSheet, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  modal: ViewStyle
  overlay: ViewStyle
  popover: ViewStyle
}

const useStyles = (): StylesReturn => {
  const { semantics } = useTheme()

  const window = Dimensions.get('window')

  return StyleSheet.create({
    overlay: {
      position: 'absolute',
      backgroundColor: semantics.background.base.tint,
      width: '100%',
      height: '100%',
    },
    modal: {
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
    popover: {
      gap: 24,
      maxHeight: window.height / 2,
      margin: 16,
      padding: 16,
      borderRadius: 16,
      backgroundColor: semantics.container.base.default,
      borderColor: semantics.container.stroke.default,
      borderWidth: 1,
    },
  })
}

export default useStyles
