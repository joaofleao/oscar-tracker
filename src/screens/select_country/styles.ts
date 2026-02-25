import { StyleSheet, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type StylesReturn = {
  scroll: ViewStyle
  content: ViewStyle
  header: ViewStyle
}

const useStyles = (): StylesReturn => {
  const { bottom, left, right } = useSafeAreaInsets()
  return StyleSheet.create({
    scroll: {},
    content: {
      paddingBottom: bottom,
      paddingRight: right + 20,
      paddingLeft: left + 20,
    },
    header: {
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
}

export default useStyles
