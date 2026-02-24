import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { SemanticsType, useTheme } from '@providers/theme'

type StylesReturn = {
  content: ViewStyle
  root: ViewStyle

  spoiler: ViewStyle
  blur: ViewStyle
  text: TextStyle
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
      paddingHorizontal: 8,
    },

    text: {
      paddingHorizontal: 4,
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
