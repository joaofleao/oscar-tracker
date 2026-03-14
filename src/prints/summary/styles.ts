import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  root: ViewStyle
  container: ViewStyle
  highlight: TextStyle
  image: ImageStyle
  item: ViewStyle
  bigNumber: ViewStyle
  images: ViewStyle
  text: ViewStyle
  imageContainer: ViewStyle
  imageOverlay: ViewStyle
}

const useStyles = (): StylesReturn => {
  const { semantics } = useTheme()

  return StyleSheet.create({
    root: {
      // alignContent: 'center',
      // justifyContent: 'center',
      // transform: [{ scale: 0.85 }],

      opacity: 0,
      position: 'absolute',
      top: -500,
      // borderWidth: 2,
      // borderColor: semantics.container.stroke.default,
      width: 400,
      aspectRatio: 1080 / 1920,
    },
    container: {
      alignSelf: 'center',
      justifyContent: 'space-between',
      width: 400,
      aspectRatio: 1080 / 1920,
      paddingHorizontal: 20,
      paddingBottom: 40,
      paddingTop: 40,
      // gap: 20,
      backgroundColor: semantics.container.base.default,
      overflow: 'hidden',
    },
    highlight: {
      color: semantics.accent.base.default,
    },
    bigNumber: {
      // color: semantics.accent.base.default,
    },
    item: {
      width: '50%',

      // backgroundColor: 'red'
      // flex: 1,
      // width: (400 - 40 - 8 * (8 - 1)) / 8,
      // aspectRatio: 2 / 3,
      // position: 'relative',
    },
    image: {
      width: 40,
      aspectRatio: 2 / 3,
      // height: '100%',
      // borderWidth: 0.5,
      // borderColor: semantics.container.stroke.default,
    },
    text: {
      flex: 1,
      padding: 4,
    },
    images: {},
    imageContainer: {},
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
