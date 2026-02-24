import { Platform, StyleSheet, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type StylesReturn = {
  root: ViewStyle
  content: ViewStyle
  empty: ViewStyle
}

const HEADER_HEIGHT = 156
const FOOTER_HEIGHT = 40

const FOOTER_BOTTOM = 8
const FOOTER_TOP = 8

const useStyles = (): StylesReturn => {
  const { bottom, right, left } = useSafeAreaInsets()

  return StyleSheet.create({
    root: {
      marginTop: -HEADER_HEIGHT,
      paddingRight: right + 20,
      paddingLeft: left + 20,
    },
    content: {
      paddingTop: HEADER_HEIGHT + 20,
      paddingBottom: bottom + FOOTER_HEIGHT + FOOTER_TOP + (Platform.OS === 'android' ? FOOTER_BOTTOM : 0),
      gap: 32,
    },

    empty: {
      marginBottom: -80,
    },
  })
}

export default useStyles
