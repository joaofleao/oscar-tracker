import { ImageStyle, Platform, StyleSheet, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type StylesReturn = {
  root: ViewStyle
  avatar: ImageStyle
  userInfo: ViewStyle
  list: ViewStyle
  content: ViewStyle
  gradient: ViewStyle
}

const HEADER_HEIGHT = 156
const FOOTER_HEIGHT = 40

const FOOTER_BOTTOM = 8
const FOOTER_TOP = 8

const useStyles = (): StylesReturn => {
  const { right, left, bottom } = useSafeAreaInsets()

  return StyleSheet.create({
    root: {
      gap: 16,
    },
    userInfo: {
      flex: 1,
    },
    avatar: {
      gap: 20,
    },
    // list: {
    //   paddingTop: 20,
    //   marginBottom: bottom + 60,
    //   paddingRight: right + 20,
    //   paddingLeft: left + 20,
    // },
    // content: {
    //   gap: 16,
    // },

    list: {
      marginTop: -HEADER_HEIGHT,
      paddingRight: right + 20,
      paddingLeft: left + 20,
    },
    content: {
      paddingTop: HEADER_HEIGHT + 20,
      paddingBottom: bottom + FOOTER_HEIGHT + FOOTER_TOP + (Platform.OS === 'android' ? FOOTER_BOTTOM : 0),
      gap: 16,
    },
    gradient: {
      pointerEvents: 'none',
      height: 20,
      width: '100%',
      marginBottom: -20,
      zIndex: 1,
    },
  })
}

export default useStyles
