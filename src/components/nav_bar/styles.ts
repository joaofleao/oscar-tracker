import { StyleSheet, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  header: ViewStyle
  headerContent: ViewStyle
  hide: ViewStyle
  footer: ViewStyle
  leading: ViewStyle
  trailing: ViewStyle
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
      alignItems: 'center',
    },
    header: {
      position: 'absolute',
      top: 0,
      flexDirection: 'row',
      paddingTop: top + 20,
      left: 0,
      right: 0,
      paddingVertical: 16,
      paddingHorizontal: 24,
      zIndex: 10,
      borderBottomWidth: 1,
      backgroundColor: semantics.background.base.tint,
      borderBottomColor: semantics.background.base,
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
  })
}

export default useStyles
