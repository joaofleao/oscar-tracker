import { StyleSheet, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type StylesReturn = {
  root: ViewStyle
  content: ViewStyle
  empty: ViewStyle
}

const useStyles = (): StylesReturn => {
  const { top, bottom, right, left } = useSafeAreaInsets()

  return StyleSheet.create({
    root: {
      overflow: 'visible',
      paddingTop: 20,
      paddingBottom: bottom + 40,
      paddingRight: right + 20,
      paddingLeft: left + 20,
    },
    content: {
      gap: 16,
    },

    empty: {
      marginBottom: -80,
    },
  })
}

export default useStyles
