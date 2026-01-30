import { StyleSheet, ViewStyle } from 'react-native'

import { SemanticsType, useTheme } from '@providers/theme'

type StylesReturn = {
  root: ViewStyle
  android: ViewStyle
  blur: ViewStyle
  floating: ViewStyle
}
type StylesProps = {
  variant: keyof SemanticsType
}

const useStyles = ({ variant }: StylesProps): StylesReturn => {
  const { semantics } = useTheme()

  return StyleSheet.create({
    root: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,

      opacity: 1,
      backgroundColor: semantics[variant].base.tint,
    },
    android: {
      // backgroundColor: semantics.background.base.darken,
    },
    blur: {
      width: '100%',
      height: '100%',
    },
    floating: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10,
    },
  })
}

export default useStyles
