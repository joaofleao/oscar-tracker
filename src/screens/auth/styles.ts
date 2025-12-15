import { StyleSheet, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type StylesReturn = {
  root: ViewStyle
  header: ViewStyle
  content: ViewStyle
  footer: ViewStyle
  buttons: ViewStyle

  passwordWithForget: ViewStyle
}

const useStyles = (): StylesReturn => {
  const { bottom, right, left } = useSafeAreaInsets()

  return StyleSheet.create({
    root: {
      paddingBottom: bottom,
      paddingTop: 40,
      paddingRight: right + 20,
      paddingLeft: left + 20,
      justifyContent: 'center',
      gap: 40,
    },

    header: {
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
    },

    content: {
      gap: 20,
    },

    buttons: {
      gap: 12,
      alignItems: 'center',
    },

    footer: {
      justifyContent: 'center',
      alignItems: 'center',
      gap: 12,
    },

    passwordWithForget: {
      alignItems: 'center',
      gap: 8,
    },
  })
}

export default useStyles
