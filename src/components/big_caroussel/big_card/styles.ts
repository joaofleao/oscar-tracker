import { ImageStyle, StyleSheet, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  root: ViewStyle
  spoiler: ViewStyle
  blur: ViewStyle
  image: ImageStyle
  overlay: ImageStyle
  container: ViewStyle
  winner: ViewStyle
}

const useStyles = (): StylesReturn => {
  const { semantics } = useTheme()

  return StyleSheet.create({
    root: {
      borderRadius: 4,

      width: 200,
    },
    container: {
      aspectRatio: 2 / 3,
      width: 200,
      borderColor: semantics.container.stroke.default,
      backgroundColor: semantics.container.base.tint,
      borderWidth: 1,
    },
    winner: {
      borderColor: semantics.brand.foreground.light,
      borderWidth: 3,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    spoiler: {
      height: '100%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: semantics.background.base.tint,
    },
    blur: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    overlay: {
      backgroundColor: '#000',
      borderRadius: 4,
    },
  })
}

export default useStyles
