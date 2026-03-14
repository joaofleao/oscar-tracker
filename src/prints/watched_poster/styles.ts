import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  gradient: ViewStyle
  root: ViewStyle
  container: ViewStyle
  highlight: TextStyle
  image: ImageStyle
  images: ViewStyle
  backgroundImage: ImageStyle
  imageContainer: ViewStyle
  imageOverlay: ViewStyle
}

const useStyles = (): StylesReturn => {
  const { semantics } = useTheme()

  return StyleSheet.create({
    gradient: {
      position: 'absolute',
      width: 400,
      aspectRatio: 1080 / 1920,
    },
    root: {
      opacity: 0,
      position: 'absolute',
      top: -500,
      width: 400,
      aspectRatio: 1080 / 1920,
    },
    backgroundImage: {
      position: 'absolute',
      width: '140%',
      height: '140%',
    },
    container: {
      width: 400,
      aspectRatio: 1080 / 1920,
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingBottom: 40,
      paddingTop: 80,
      gap: 20,

      backgroundColor: semantics.background.base.default,
      overflow: 'hidden',
    },
    highlight: {
      color: semantics.accent.base.default,
    },
    image: {
      width: '100%',
      height: '100%',
      borderWidth: 0.5,
      borderColor: semantics.container.stroke.default,
    },
    imageContainer: {
      width: (400 - 40 - 8 * (8 - 1)) / 8,
      aspectRatio: 2 / 3,
      position: 'relative',
    },
    images: {
      justifyContent: 'center',
    },
    imageOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: semantics.container.base.darken,
    },
  })
}

export default useStyles
