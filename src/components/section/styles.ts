import { ImageStyle, StyleSheet, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  root: ViewStyle
  image: ImageStyle
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
      borderRadius: 4,
    },
  })
}

export default useStyles
