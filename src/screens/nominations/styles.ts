import { StyleSheet, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type StylesReturn = {
  flatlists: ViewStyle
  header: ViewStyle
  empty: ViewStyle
}

const useStyles = (): StylesReturn => {
  const { top, bottom, right, left } = useSafeAreaInsets()

  return StyleSheet.create({
    flatlists: {
      gap: 16,
      paddingTop: top + 160,
      paddingBottom: bottom + 88,
      paddingRight: right + 20,
      paddingLeft: left + 20,
    },
    header: {
      alignSelf: 'center',
      marginBottom: 80,
    },
    empty: {
      marginBottom: -80,
    },
  })
}

export default useStyles
