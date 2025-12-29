import { StyleSheet, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type StylesReturn = {
  root: ViewStyle
  data: ViewStyle
  gradient: ViewStyle
}

const useStyles = (): StylesReturn => {
  const { bottom, right, left } = useSafeAreaInsets()

  return StyleSheet.create({
    root: {
      paddingBottom: bottom,
      paddingTop: 40,
      paddingRight: right + 20,
      paddingLeft: left + 20,
      justifyContent: 'center',
      gap: 16,
    },
    data: {
      gap: 16,
      paddingTop: 40,
    },
    gradient: {
      pointerEvents: 'none',
      position: 'absolute',
      height: 40,
      width: '100%',
    },
  })
}

export default useStyles
