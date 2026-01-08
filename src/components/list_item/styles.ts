import { ImageStyle, StyleSheet, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  root: ViewStyle
  texts: ViewStyle
  content: ViewStyle
  contentPressed: ViewStyle

  image: ImageStyle
  imagePlaceholder: ViewStyle

  imageContainer: ViewStyle
  details: ViewStyle
  button: ViewStyle
  buttonPressed: ViewStyle

  horizontalSeparator: ViewStyle
  verticalSeparator: ViewStyle
  buttonContent: ViewStyle
  loading: ViewStyle
  hide: ViewStyle
  spoiler: ViewStyle
  unwatched: ViewStyle
  hasImage: ViewStyle
}

const useStyles = (): StylesReturn => {
  const theme = useTheme()
  return StyleSheet.create({
    root: {
      flexDirection: 'row',
      flex: 1,
      borderWidth: 1,
      borderColor: theme.semantics.container.stroke.default,
      backgroundColor: theme.semantics.container.base.default,
    },
    texts: {
      flex: 1,
      gap: 4,

      paddingHorizontal: 16,
    },
    content: {
      flex: 1,
      padding: 8,
      flexDirection: 'row',
    },
    contentPressed: {
      flex: 1,
      padding: 8,
      flexDirection: 'row',
      backgroundColor: theme.semantics.container.base.pressed,
    },

    imageContainer: {
      width: 60,
      aspectRatio: 2 / 3,
      borderWidth: 1,
      borderColor: theme.semantics.container.stroke.default,
      backgroundColor: theme.semantics.container.base.default,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    imagePlaceholder: {
      width: '100%',
      height: '100%',
    },

    details: {
      flex: 1,
      gap: 8,
    },

    button: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      minWidth: 40,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    buttonPressed: {
      backgroundColor: theme.semantics.container.base.pressed,
    },
    horizontalSeparator: {
      height: 1,
      width: '100%',
      backgroundColor: theme.semantics.container.stroke.default,
    },
    verticalSeparator: {
      width: 1,
      height: '100%',
      backgroundColor: theme.semantics.container.stroke.default,
    },
    buttonContent: {
      flexDirection: 'row',
      alignItems: 'center',
      // gap: 4,
    },
    loading: {
      opacity: 1,
      position: 'absolute',
      height: 40,
      justifyContent: 'center',
      alignSelf: 'center',
    },
    hide: {
      opacity: 0,
    },
    unwatched: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    hasImage: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    spoiler: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
}

export default useStyles
