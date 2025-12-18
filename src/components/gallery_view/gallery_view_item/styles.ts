import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  root: ViewStyle
  image: ImageStyle
  title: TextStyle
}

const useStyles = (): StylesReturn => {
  const { semantics } = useTheme()

  return StyleSheet.create({
    root: {
      alignItems: 'center',
      position: 'relative',
      borderRadius: 4,
      borderWidth: 1,
      height: 40,
      backgroundColor: semantics.container.base.default,
      borderColor: semantics.container.stroke.default,
      aspectRatio: 2 / 3,
      overflow: 'hidden',
      justifyContent: 'center',
    },
    title: {
      textAlign: 'center',
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
    },
  })
}

export default useStyles
