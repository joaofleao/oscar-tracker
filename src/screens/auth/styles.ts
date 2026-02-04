import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import useTheme from '@providers/theme/useTheme'

type StylesReturn = {
  scroll: ViewStyle
  scrollContent: ViewStyle
  content: ViewStyle
  logo: ViewStyle
  logoText: TextStyle
}

const useStyles = (): StylesReturn => {
  const { right, left, bottom } = useSafeAreaInsets()
  const { fonts } = useTheme()

  return StyleSheet.create({
    scroll: {
      paddingTop: 40,
      paddingRight: right + 20,
      paddingLeft: left + 20,
    },
    scrollContent: {
      gap: 20,
      alignItems: 'center',
      paddingBottom: bottom,
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
    logoText: {
      fontFamily: fonts.quaternary.light,
    },
  })
}

export default useStyles
