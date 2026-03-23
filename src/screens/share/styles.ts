import { Dimensions, ImageStyle, StyleSheet, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  list: ViewStyle
  listContent: ViewStyle
  page: ViewStyle
  previewGradientContainer: ViewStyle
  previewImageContainer: ViewStyle
  previewImage: ImageStyle
  previewImageHidden: ImageStyle
  previewLoadingContainer: ViewStyle
}

const useStyles = (): StylesReturn => {
  const { semantics } = useTheme()
  const { width } = Dimensions.get('window')

  return StyleSheet.create({
    list: {},
    listContent: {
      gap: 20,
    },
    page: {
      width: width - 80,
      aspectRatio: 1080 / 1920,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 21,
      overflow: 'hidden',
    },

    previewGradientContainer: {
      position: 'absolute',
      width: '200%',
      height: '200%',
      transform: [{ rotate: '-60deg' }],
    },
    previewImageContainer: {
      borderRadius: 20,
      overflow: 'hidden',
      width: width - 82,
      aspectRatio: 1080 / 1920,
    },
    previewImage: {
      width: '100%',
      height: '100%',
    },
    previewImageHidden: {
      opacity: 0,
    },
    previewLoadingContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: semantics.container.base.default,
    },
  })
}

export default useStyles
