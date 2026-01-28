import { Platform, StyleSheet, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type StylesReturn = {
  root: ViewStyle
  content: ViewStyle
  empty: ViewStyle
  input: ViewStyle
  header: ViewStyle
}

const useStyles = (): StylesReturn => {
  const { bottom, top, left, right } = useSafeAreaInsets()

  return StyleSheet.create({
    root: {
      overflow: 'visible',
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingRight: right + 20,
      paddingLeft: left + 20,
      marginBottom: bottom,
    },
    content: {
      gap: 12,
    },
    empty: {
      gap: 12,
      justifyContent: 'center',
    },
    input: {
      flex: 1,
    },
    header: {
      paddingTop: Platform.OS === 'android' ? top + 20 : 20,
      padding: 20,
      gap: 20,
      zIndex: 1,
    },
  })
}

export default useStyles
