import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import useTheme from '@providers/theme/useTheme'

type StylesReturn = {
  root: ViewStyle
  scrollContent: ViewStyle
  content: ViewStyle
  buttons: ViewStyle
  logo: ViewStyle
  logoText: TextStyle
}

const useStyles = (): StylesReturn => {
  const { bottom, right, left } = useSafeAreaInsets()
  const { fonts } = useTheme()

  return StyleSheet.create({
    root: {
      paddingBottom: bottom,
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
      minWidth: '80%',
    },
    logo: {
      alignItems: 'center',
      gap: 8,
      paddingVertical: 20,
    },
    logoText: {
      fontFamily: fonts.quaternary.light,
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
