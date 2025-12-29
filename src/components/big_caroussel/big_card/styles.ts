import { ImageStyle, StyleSheet, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  root: ViewStyle
  spoiler: ViewStyle
  image: ImageStyle
  overlay: ImageStyle
}

const useStyles = (): StylesReturn => {
  const { semantics } = useTheme()

  return StyleSheet.create({
    root: {
      borderRadius: 4,

      width: 200,
    },
    image: {
      width: 200,
      aspectRatio: 2 / 3,
      borderWidth: 1,
      borderColor: semantics.container.stroke.default,
      backgroundColor: semantics.container.base.default,
    },
    spoiler: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    overlay: {
      backgroundColor: '#000',
      borderRadius: 4,
    },
  })
}

export default useStyles
