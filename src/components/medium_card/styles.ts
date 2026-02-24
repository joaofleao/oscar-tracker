import { ImageStyle, StyleSheet, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  root: ViewStyle
  spoiler: ViewStyle
  image: ImageStyle
  winner: ViewStyle
  container: ViewStyle
}

const useStyles = (): StylesReturn => {
  const { semantics } = useTheme()

  return StyleSheet.create({
    root: {
      borderRadius: 4,
      width: 90,
    },
    container: {
      width: 90,
      aspectRatio: 2 / 3,
      borderWidth: 1,
      borderColor: semantics.container.stroke.default,
      backgroundColor: semantics.container.base.tint,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    winner: {
      position: 'absolute',
      top: 4,
      right: 4,
    },
    spoiler: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: semantics.background.base.tint,
    },
  })
}

export default useStyles
