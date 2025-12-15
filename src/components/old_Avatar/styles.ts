import { ImageStyle, StyleSheet, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesProps = {
  width?: number
  height?: number
}

type StylesReturn = {
  root: ViewStyle
  image: ImageStyle
}

const useStyles = ({ width, height }: StylesProps): StylesReturn => {
  const { colors } = useTheme()

  return StyleSheet.create({
    root: {
      height,
      width,
      backgroundColor: colors.background.container,
      alignItems: 'center',
      justifyContenMt: 'center',
      borderRadius: 12,
      overflow: 'hidden',
    },
    image: {
      height: '100%',
      width: '100%',
    },
  })
}

export default useStyles
