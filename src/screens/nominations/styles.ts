import { StyleSheet, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type StylesReturn = {
  flatlists: ViewStyle
}

const useStyles = (): StylesReturn => {
  const { top, bottom, right, left } = useSafeAreaInsets()

  return StyleSheet.create({
    flatlists: {
      gap: 16,
      paddingTop: top + 20,
      paddingBottom: bottom + 88,
      paddingRight: right,
      paddingLeft: left,
    },
  })
}

export default useStyles
