import { StyleSheet, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type StylesReturn = {
  root: ViewStyle
  content: ViewStyle
  empty: ViewStyle
}

const useStyles = (): StylesReturn => {
  const { right, left } = useSafeAreaInsets()

  return StyleSheet.create({
    root: {
      paddingRight: right + 20,
      paddingLeft: left + 20,
      overflow: 'visible',
    },

    content: {
      gap: 32,
    },

    empty: {
      marginBottom: -80,
    },
  })
}

export default useStyles
