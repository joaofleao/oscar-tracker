import { Platform, StyleSheet, ViewStyle } from 'react-native'

import { SemanticsType, useTheme } from '@providers/theme'

type StylesReturn = {
  root: ViewStyle
  smallRoot: ViewStyle
  content: ViewStyle
  smallContent: ViewStyle
  title: ViewStyle
  smallTitle: ViewStyle
  loading: ViewStyle

  ghost: ViewStyle
  hide: ViewStyle
  tooltip: ViewStyle
}

type StylesProps = {
  variant: keyof SemanticsType
}

const useStyles = ({ variant }: StylesProps): StylesReturn => {
  const { semantics } = useTheme()

  return StyleSheet.create({
    root: {
      position: 'relative',
      paddingHorizontal: 8,
      paddingVertical: 8,

      borderRadius: 12,
      borderWidth: 1,
      backgroundColor: semantics[variant].base.default,
      borderColor: semantics[variant].stroke.default,
      alignItems: 'center',
      justifyContent: 'center',
    },
    smallRoot: {
      paddingHorizontal: 4,
      paddingVertical: 4,
      borderRadius: 8,
    },
    title: {
      paddingHorizontal: 8,
    },
    smallTitle: {
      paddingHorizontal: 4,
    },

    content: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 24,
      minWidth: 24,
    },
    loading: {
      minHeight: 24,
      minWidth: 24,
      opacity: 1,
      position: 'absolute',
      transform: [{ scale: 0.8 }],
      justifyContent: 'center',
      alignSelf: 'center',
    },

    smallContent: {
      minHeight: 16,
      minWidth: 16,
      gap: 4,
    },

    ghost: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    },
    hide: {
      opacity: 0,
    },

    tooltip: {
      overflow: 'hidden',
      padding: 12,
      backgroundColor: semantics.background.base[Platform.OS === 'ios' ? 'tint' : 'darken'],
      borderWidth: 1,
      borderColor: semantics.background.stroke.default,
      borderRadius: 8,
      alignSelf: 'center',
      position: 'absolute',
    },
  })
}

export default useStyles
