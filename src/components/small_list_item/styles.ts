import { StyleSheet, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  root: ViewStyle
  title: ViewStyle
  titleScroll: ViewStyle
  ghost: ViewStyle
  texts: ViewStyle
  content: ViewStyle
  contentPressed: ViewStyle
  button: ViewStyle
  buttonPressed: ViewStyle
  horizontalSeparator: ViewStyle
  verticalSeparator: ViewStyle
  buttonContent: ViewStyle
  loading: ViewStyle
  hide: ViewStyle
  secondaryActions: ViewStyle
}

const useStyles = (): StylesReturn => {
  const { semantics } = useTheme()
  return StyleSheet.create({
    root: {
      flexDirection: 'row',
      flex: 1,
      borderWidth: 1,
      borderColor: semantics.container.stroke.default,
      backgroundColor: semantics.container.base.tint,
      borderRadius: 8,
      overflow: 'hidden',
    },
    ghost: {
      opacity: 0.5,
    },
    title: {
      flex: 1,
    },
    titleScroll: {
      paddingHorizontal: 16,
      flex: 1,
    },
    texts: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      paddingRight: 8,
      justifyContent: 'center',
    },
    content: {
      flex: 1,
      flexDirection: 'row',
      minHeight: 40,
    },
    contentPressed: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: semantics.container.base.pressed,
    },

    button: {
      minWidth: 40,
      minHeight: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonPressed: {
      backgroundColor: semantics.container.base.pressed,
    },
    horizontalSeparator: {
      width: 1,
      height: '100%',
      backgroundColor: semantics.container.stroke.default,
    },
    verticalSeparator: {
      width: 1,
      height: '100%',
      backgroundColor: semantics.container.stroke.default,
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
    secondaryActions: {
      flexDirection: 'row',
    },
  })
}

export default useStyles
