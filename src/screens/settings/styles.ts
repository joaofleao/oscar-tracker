import { StyleSheet, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type StylesReturn = {
  root: ViewStyle
  header: ViewStyle
  content: ViewStyle
  footer: ViewStyle
  section: ViewStyle
  hide: ViewStyle
}

const useStyles = (): StylesReturn => {
  const { bottom, right, left, top } = useSafeAreaInsets()

  return StyleSheet.create({
    root: {
      flex: 1,
      paddingBottom: bottom + 20,
      paddingTop: top + 20,
      paddingRight: right + 20,
      paddingLeft: left + 20,
      justifyContent: 'center',
      gap: 16,
    },
    section: {
      gap: 8,
    },

    header: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',

      gap: 16,
    },
    content: {
      gap: 16,
      flex: 1,
    },
    hide: {
      opacity: 0,
    },

    footer: {
      justifyContent: 'center',
      alignItems: 'center',
      gap: 12,
    },
  })
}

export default useStyles
