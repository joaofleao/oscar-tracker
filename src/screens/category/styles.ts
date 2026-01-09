import { StyleSheet, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type StylesReturn = {
  header: ViewStyle
  watched: ViewStyle
  watchedContent: ViewStyle
  unwatched: ViewStyle
  gap: ViewStyle
  footer: ViewStyle
}

const useStyles = (): StylesReturn => {
  const { bottom, right, left } = useSafeAreaInsets()

  return StyleSheet.create({
    header: {
      paddingBottom: 20,
      gap: 8,
    },
    watched: {
      paddingTop: 40,
      paddingRight: right,
      paddingLeft: left,
    },
    watchedContent: {
      paddingHorizontal: 20,
      paddingBottom: bottom + 20 + 40 + 20,
    },
    unwatched: {
      paddingTop: 20,
      gap: 20,
    },
    gap: {
      height: 20,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 20,
      position: 'absolute',
      bottom: bottom + 20,
      right: right,
      left: left,
      alignItems: 'center',
    },
  })
}

export default useStyles
