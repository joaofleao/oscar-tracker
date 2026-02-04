import { ImageStyle, StyleSheet, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type StylesReturn = {
  root: ViewStyle
  avatar: ImageStyle
  userInfo: ViewStyle
  list: ViewStyle
  content: ViewStyle
  gradient: ViewStyle
}

const useStyles = (): StylesReturn => {
  const { right, left, bottom } = useSafeAreaInsets()

  return StyleSheet.create({
    root: {
      gap: 32,
    },
    userInfo: {
      flex: 1,
    },
    avatar: {
      gap: 20,
    },
    list: {
      overflow: 'visible',
      paddingTop: 20,
      marginBottom: bottom + 60,
      paddingRight: right + 20,
      paddingLeft: left + 20,
    },
    content: {
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
