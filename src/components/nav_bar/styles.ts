import { StyleSheet, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  header: ViewStyle
  headerBackground: ViewStyle
  headerBlur: ViewStyle
  headerContent: ViewStyle
  hide: ViewStyle
  footer: ViewStyle
  leading: ViewStyle
  trailing: ViewStyle
  gradient: ViewStyle
}

const useStyles = (): StylesReturn => {
  const { semantics } = useTheme()
  const { bottom, left, right, top } = useSafeAreaInsets()
  return StyleSheet.create({
    hide: {
      // opacity: 0,
    },
    headerContent: {
      flex: 1,
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
      backgroundColor: semantics.background.base.tint,
    },
    headerBlur: {
      height: '100%',
      width: '100%',
    },
    footer: {
      alignSelf: 'center',
      borderWidth: 1,
      borderRadius: 30,
      position: 'absolute',
      overflow: 'hidden',
      zIndex: 10,
      bottom: bottom,
      flexDirection: 'row',
      backgroundColor: semantics.background.base.tint,
      borderColor: semantics.container.stroke.default,
    },

    leading: {
      left: left + 20,
    },
    trailing: {
      right: right + 20,
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
