import { StyleSheet, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type StylesReturn = {
  root: ViewStyle
  background: ViewStyle
  blur: ViewStyle
  content: ViewStyle
  gradient: ViewStyle
}

const useStyles = (): StylesReturn => {
  const { top } = useSafeAreaInsets()
  return StyleSheet.create({
    root: {
      paddingTop: top + 16,
      flexDirection: 'row',
      paddingVertical: 16,
      paddingHorizontal: 24,
      zIndex: 20,
    },
    content: {
      flex: 1,
      alignItems: 'center',
    },
    background: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      position: 'absolute',
    },
    blur: {
      height: '100%',
      width: '100%',
    },

    gradient: {
      pointerEvents: 'none',
      position: 'absolute',
      top: 0,
      height: top + 100,
      width: '100%',
      zIndex: 10,
    },
  })
}

export default useStyles
