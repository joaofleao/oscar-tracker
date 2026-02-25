import { Platform, StyleSheet, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type StylesReturn = {
  header: ViewStyle
  contentHeader: ViewStyle
  root: ViewStyle
  content: ViewStyle

  footer: ViewStyle
}

const useStyles = (): StylesReturn => {
  const { bottom, right, left, top } = useSafeAreaInsets()

  return StyleSheet.create({
    header: {
      marginTop: Platform.OS === 'android' ? 20 + top : 0,
      alignItems: 'center',
      padding: 20,
    },
    contentHeader: {
      gap: 16,
      paddingBottom: 16,
    },
    root: {
      paddingTop: 8,
      paddingRight: right + 20,
      paddingLeft: left + 20,
      paddingBottom: bottom + 40,
    },
    content: {
      gap: 16,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 20,
      position: 'absolute',
      bottom: bottom,
      right: right,
      left: left,
      alignItems: 'center',
    },
  })
}

export default useStyles
