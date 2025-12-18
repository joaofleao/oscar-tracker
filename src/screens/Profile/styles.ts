import { ImageStyle, StyleSheet, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  root: ViewStyle
  header: ViewStyle
  avatar: ImageStyle
  avatarPlaceholder: ViewStyle
  profile: ViewStyle
  floatingHeader: ViewStyle
}

const useStyles = (): StylesReturn => {
  const { bottom, right, left, top } = useSafeAreaInsets()
  const { semantics } = useTheme()

  return StyleSheet.create({
    root: {
      paddingBottom: bottom,
      paddingTop: top + 20,
      paddingRight: right + 20,
      paddingLeft: left + 20,
      justifyContent: 'center',
      gap: 24,
      alignItems: 'center',
    },

    header: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      gap: 16,
    },
    profile: {
      alignItems: 'center',
    },

    avatar: {
      backgroundColor: semantics.container.base.default,
      borderWidth: 1,
      borderColor: semantics.container.stroke.default,
      width: 120,
      height: 120,
      borderRadius: 60,
    },
    avatarPlaceholder: {
      backgroundColor: semantics.container.base.default,
      borderWidth: 1,
      borderColor: semantics.container.stroke.default,
      width: 120,
      height: 120,
      borderRadius: 60,
    },

    floatingHeader: {
      position: 'absolute',
      top: top + 20,
      right: right + 20,
    },
  })
}

export default useStyles
