import { StyleSheet, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  header: ViewStyle
  headerBackground: ViewStyle
  headerBlur: ViewStyle
  headerContent: ViewStyle

  footer: ViewStyle
  footerContainer: ViewStyle
  gradientTop: ViewStyle
  gradientBottom: ViewStyle
}

const useStyles = (): StylesReturn => {
  const { semantics } = useTheme()
  const { bottom, left, right, top } = useSafeAreaInsets()
  return StyleSheet.create({
    headerContent: {
      flex: 1,
      alignItems: 'center',
    },
    header: {
      position: 'absolute',
      flexDirection: 'row',
      paddingTop: top + 20,
      top: 0,
      left: 0,
      right: 0,
      paddingVertical: 16,
      paddingHorizontal: 24,
      zIndex: 10,
    },
    headerBackground: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      position: 'absolute',
    },
    headerBlur: {
      height: '100%',
      width: '100%',
    },
    footer: {
      position: 'absolute',
      bottom: bottom,
      left: 20,
      right: 20,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
    },
    footerContainer: {
      flexDirection: 'row',

      borderWidth: 1,
      borderColor: semantics.container.stroke.default,
      borderRadius: 30,
    },

    gradientTop: {
      pointerEvents: 'none',
      position: 'absolute',
      top: 0,
      height: top + 60,
      width: '100%',
    },
    gradientBottom: {
      pointerEvents: 'none',
      position: 'absolute',
      bottom: 0,
      height: bottom + 60,
      width: '100%',
    },
  })
}

export default useStyles
