import { ImageStyle, StyleSheet, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  root: ViewStyle
  image: ImageStyle
  spoiler: ViewStyle
  blur: ViewStyle
}

const useStyles = (): StylesReturn => {
  const { semantics } = useTheme()

  return StyleSheet.create({
    root: {
      width: '60%',
      maxWidth: 240,
      aspectRatio: 2 / 3,
      borderWidth: 1,
      borderColor: semantics.container.stroke.default,
    },
    image: {
      width: '100%',
      height: '100%',
      backgroundColor: semantics.container.base.tint,
    },

    spoiler: {
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
    },
    blur: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: semantics.background.base.tint,
    },
  })
}

export default useStyles
