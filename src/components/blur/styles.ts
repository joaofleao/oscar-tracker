import { StyleSheet, ViewStyle } from 'react-native'

import { SemanticsType, useTheme } from '@providers/theme'

type StylesReturn = {
  root: ViewStyle
  blur: ViewStyle
  background: ViewStyle
  android: ViewStyle
  apple: ViewStyle
}

type StylesProps = {
  variant: keyof SemanticsType
}

const useStyles = ({ variant }: StylesProps): StylesReturn => {
  const { semantics } = useTheme()

  return StyleSheet.create({
    root: {
      overflow: 'hidden',
    },
    background: {
      position: 'absolute',
      width: '100%',
      height: '100%',
    },
    apple: {
      backgroundColor: semantics[variant].base.tint,
    },
    android: {
      backgroundColor: semantics[variant].base.darken,
    },
    blur: {
      width: '100%',
      height: '100%',
    },
  })
}

export default useStyles
