import { StyleSheet, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type StylesReturn = {
  header: ViewStyle
  watched: ViewStyle
  watchedContent: ViewStyle
  unwatched: ViewStyle
  gap: ViewStyle
}

const useStyles = (): StylesReturn => {
  const { bottom, right, left } = useSafeAreaInsets()

  return StyleSheet.create({
    header: {
      paddingBottom: 20,
    },
    watched: {
      paddingTop: 40,
      paddingRight: right,
      paddingLeft: left,
    },
    watchedContent: {
      paddingHorizontal: 20,
      paddingBottom: bottom + 20,
    },
    unwatched: {
      paddingTop: 20,
      gap: 20,
    },
    gap: {
      height: 20,
    },
  })
}

export default useStyles
