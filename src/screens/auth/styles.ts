import { StyleSheet, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type StylesReturn = {
  root: ViewStyle
  content: ViewStyle
  buttons: ViewStyle
  logo: ViewStyle
}

const useStyles = (): StylesReturn => {
  const { bottom, right, left } = useSafeAreaInsets()

  return StyleSheet.create({
    root: {
      paddingBottom: bottom,
      paddingTop: 40,
      paddingRight: right + 20,
      paddingLeft: left + 20,
      alignItems: 'center',
      gap: 20,
    },

    content: {
      gap: 20,
      minWidth: '80%',
    },
    logo: {
      alignItems: 'center',
      gap: 8,
      paddingVertical: 20,
    },

    buttons: {
      paddingTop: 40,
      gap: 12,
      alignItems: 'center',
    },

    footer: {
      justifyContent: 'center',
      alignItems: 'center',
      gap: 12,
    },
  })
}

export default useStyles
