import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { SemanticsType, useTheme } from '@providers/theme'

type StylesReturn = {
  content: ViewStyle
  root: ViewStyle
  icon: ViewStyle

  spoiler: ViewStyle
  blur: ViewStyle
  text: TextStyle
  initials: TextStyle
  hasVisuals: TextStyle

  imageContainer: ImageStyle
}

type StylesProps = {
  variant: keyof SemanticsType
}

const useStyles = ({ variant }: StylesProps): StylesReturn => {
  const { semantics } = useTheme()

  return StyleSheet.create({
    root: {
      position: 'relative',
      borderRadius: 20,
      backgroundColor: semantics[variant].base.tint,
      borderColor: semantics[variant].stroke.default,
      borderWidth: 1,
    },
    content: {
      gap: 4,
      alignItems: 'center',
      flexDirection: 'row',
      paddingVertical: 4,
      paddingHorizontal: 4,
    },

    text: {
      paddingHorizontal: 4,
      lineHeight: 20,
    },
    icon: {
      paddingHorizontal: 8,
    },
    initials: {
      fontSize: 8,
    },
    hasVisuals: {
      lineHeight: 20,
    },
    imageContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: semantics[variant].base.tint,
      borderWidth: 1,
      borderColor: semantics[variant].stroke.default,
      borderRadius: 100,
      overflow: 'hidden',
      width: 20,
      height: 20,
    },

    spoiler: {
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      width: '100%',
      height: '100%',
      borderRadius: 20,
      overflow: 'hidden',
    },
    blur: {
      position: 'absolute',
      width: '100%',
      height: '100%',
    },
  })
}

export default useStyles
