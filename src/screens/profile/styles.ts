import { ImageStyle, StyleSheet, ViewStyle } from 'react-native'

type StylesReturn = {
  root: ViewStyle
  avatar: ImageStyle
  userInfo: ViewStyle
  list: ViewStyle
  content: ViewStyle
  gradient: ViewStyle
}

const useStyles = (): StylesReturn => {
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

    list: {
      paddingRight: 20,
      paddingLeft: 20,
      overflow: 'visible',
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
