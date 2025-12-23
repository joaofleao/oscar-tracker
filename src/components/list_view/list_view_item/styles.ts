import { ImageStyle, StyleSheet, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  root: ViewStyle
  hasButtons: ViewStyle
  image: ImageStyle
  imagePlaceholder: ViewStyle
  details: ViewStyle

  button: ViewStyle
  top: ViewStyle
  bottom: ViewStyle
  buttonContent: ViewStyle
  loading: ViewStyle
  hide: ViewStyle
  spoiler: ViewStyle
}

const useStyles = (): StylesReturn => {
  const theme = useTheme()
  return StyleSheet.create({
    root: {
      flex: 1,
      padding: 8,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.semantics.container.stroke.default,
      backgroundColor: theme.semantics.container.base.default,
      flexDirection: 'row',
      gap: 16,
    },
    hasButtons: {
      borderRightWidth: 0,
      borderBottomEndRadius: 0,
      borderTopEndRadius: 0,
    },
    image: {
      width: 60,
      aspectRatio: 2 / 3,
      borderRadius: 4,
    },
    imagePlaceholder: {
      width: 60,
      aspectRatio: 2 / 3,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: theme.semantics.container.stroke.default,
      backgroundColor: theme.semantics.container.base.default,
    },
    details: {
      flex: 1,
      gap: 8,
    },

    button: {
      position: 'relative',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 12,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',

      backgroundColor: theme.semantics.container.base.default,
      borderColor: theme.semantics.container.stroke.default,
      flex: 1,
    },
    top: {
      borderBottomStartRadius: 0,
      borderTopStartRadius: 0,
      // borderBottomEndRadius: 0,
    },
    bottom: {
      borderBottomStartRadius: 0,
      borderTopStartRadius: 0,
      borderTopEndRadius: 0,
      borderTopWidth: 0,
    },
    buttonContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
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
    spoiler: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
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
