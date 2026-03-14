import { StyleSheet, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type StylesReturn = {
  scroll: ViewStyle
  scrollContent: ViewStyle
  content: ViewStyle
  logo: ViewStyle
}

const useStyles = (): StylesReturn => {
  const { right, left } = useSafeAreaInsets()

  return StyleSheet.create({
    scroll: {
      paddingTop: 40,
      paddingRight: right + 20,
      paddingLeft: left + 20,
    },
    scrollContent: {
      gap: 20,
      alignItems: 'center',
    },
    content: {
      gap: 20,
      width: '80%',
    },
    logo: {
      alignItems: 'center',
      paddingVertical: 20,
      gap: 8,
    },
  })
}

export default useStyles
