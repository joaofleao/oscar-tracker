import { Platform, StyleSheet, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type StylesReturn = {
  header: ViewStyle
  contentHeader: ViewStyle
  root: ViewStyle
  content: ViewStyle

  gap: ViewStyle
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
    },
    root: {
      overflow: 'visible',
      paddingTop: 8,
      paddingRight: right + 20,
      paddingLeft: left + 20,
    },
    content: {
      paddingBottom: bottom + 20 + 40 + 20,
    },

    gap: {
      height: 16,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 20,
      position: 'absolute',
      bottom: bottom + 20,
      right: right,
      left: left,
      alignItems: 'center',
    },
  })
}

export default useStyles
