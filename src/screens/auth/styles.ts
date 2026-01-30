import { Dimensions, Platform, StyleSheet, TextStyle, ViewStyle } from 'react-native'
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
  const { bottom, right, left, top } = useSafeAreaInsets()
  const { fonts } = useTheme()

  return StyleSheet.create({
    scroll: {
      paddingTop: Platform.OS === 'android' ? top + 20 : 40,
      paddingRight: right + 20,
      paddingLeft: left + 20,
      paddingBottom: bottom,
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

      minHeight: Dimensions.get('window').height * 0.3,
      justifyContent: 'center',
    },
    logoText: {
      fontFamily: fonts.quaternary.light,
    },
  })
}

export default useStyles
