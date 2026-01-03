import { ImageStyle, StyleSheet, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  root: ViewStyle
  avatar: ImageStyle
  avatarPlaceholder: ViewStyle
  profile: ViewStyle
  centerContainer: ViewStyle
  galleryListContainer: ViewStyle
  galleryColumnWrapper: ViewStyle
  gradient: ViewStyle
}

const useStyles = (): StylesReturn => {
  const { bottom, right, left, top } = useSafeAreaInsets()
  const { semantics } = useTheme()

  return StyleSheet.create({
    root: {
      paddingTop: top + 120,
      paddingBottom: bottom,
      paddingRight: right + 20,
      paddingLeft: left + 20,
      justifyContent: 'center',
      gap: 24,
      alignItems: 'center',
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
      alignItems: 'center',
      justifyContent: 'center',
    },

    centerContainer: {
      alignSelf: 'center',
    },

    galleryListContainer: {
      width: '100%',
      paddingHorizontal: 20,
    },

    galleryColumnWrapper: {
      justifyContent: 'space-between',
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
