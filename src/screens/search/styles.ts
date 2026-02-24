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
      paddingHorizontal: 20,
      paddingRight: right + 20,
      paddingLeft: left + 20,
      marginBottom: bottom,
    },
    content: {
      gap: 24,
    },
    empty: {
      paddingTop: 20,
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
    },
  })
}

export default useStyles
