import { Platform, StyleSheet, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type StylesReturn = {
  header: ViewStyle
  root: ViewStyle
  content: ViewStyle

  gap: ViewStyle
  footer: ViewStyle
}

const useStyles = (): StylesReturn => {
  const { bottom, right, left, top } = useSafeAreaInsets()

  return StyleSheet.create({
    header: {
      paddingTop: Platform.OS === 'android' ? top + 20 : 20,
      padding: 20,
      gap: 20,
      zIndex: 1,
    },
    root: {
      overflow: 'visible',
      paddingRight: right + 20,
      paddingLeft: left + 20,
    },
    content: {
      paddingBottom: bottom + 20 + 40 + 20,
    },

    gap: {
      height: 20,
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
