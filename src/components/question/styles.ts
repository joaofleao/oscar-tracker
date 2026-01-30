import { StyleSheet, ViewStyle } from 'react-native'

import { SemanticsType, useTheme } from '@providers/theme'

type StylesReturn = {
  root: ViewStyle
  content: ViewStyle
  loading: ViewStyle
  hide: ViewStyle
  ghost: ViewStyle
  small: ViewStyle
  smallContent: ViewStyle
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
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 12,
      borderWidth: 1,
      // height: 40,
      backgroundColor: semantics[variant].base.tint,
      borderColor: semantics[variant].stroke.default,
      alignItems: 'center',
    },
    small: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
      // height: 24,
    },
    ghost: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    smallContent: {
      gap: 4,
    },
    loading: {
      opacity: 1,
      position: 'absolute',
      height: 40,
      justifyContent: 'center',
      alignSelf: 'center',
    },
    hide: {
      opacity: 0,
    },

    tooltip: {
      padding: 12,
      backgroundColor: semantics.container.base.tint,
      borderWidth: 1,
      borderColor: semantics.container.stroke.default,
      borderRadius: 8,
      alignSelf: 'center',
      position: 'absolute',
    },
  })
}

export default useStyles
