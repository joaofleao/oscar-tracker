import { StyleSheet, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type StylesReturn = {
  container: ViewStyle
  topBlur: ViewStyle
  bottomBlur: ViewStyle
}

const useStyles = (): StylesReturn => {
  const { top, bottom } = useSafeAreaInsets()
  return StyleSheet.create({
    container: {
      backgroundColor: 'red',
      flex: 1,
    },
    topBlur: {
      pointerEvents: 'none',
      position: 'absolute',
      top: 0,
      height: top * 2,
      width: '100%',
    },
    bottomBlur: {
      pointerEvents: 'none',
      position: 'absolute',
      bottom: 0,
      height: bottom * 2,
      width: '100%',
    },
  })
}

export default useStyles
