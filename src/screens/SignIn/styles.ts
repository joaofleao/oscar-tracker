import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  content: TextStyle
  buttonContainer: ViewStyle
  forgotLabel: TextStyle
  forgotButton: ViewStyle

  posterGroup: ViewStyle
  posterCenter: ImageStyle
  posterLeft: ImageStyle
  posterRight: ImageStyle
}

const useStyles = (): StylesReturn => {
  const { fonts, colors } = useTheme()

  return StyleSheet.create({
    content: {
      gap: 28,
      flex: 1,
    },
    buttonContainer: {
      alignItems: 'center',
      gap: 16,
    },

    forgotLabel: {
      fontFamily: fonts.secondary.bold,
      fontSize: 12,
      color: colors.primary.default,
    },

    forgotButton: {
      padding: 12,
    },

    posterGroup: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    posterCenter: {
      zIndex: 1,
      width: '60%',
      borderRadius: 8,
      aspectRatio: 2 / 3,
      shadowColor: 'black',
    },
    posterLeft: {
      width: '50%',
      borderRadius: 8,
      aspectRatio: 2 / 3,
      marginRight: -20,
      transform: [{ rotate: '-5deg' }],
    },
    posterRight: {
      width: '50%',
      borderRadius: 8,
      aspectRatio: 2 / 3,
      marginLeft: -20,
      transform: [{ rotate: '5deg' }],
    },
  })
}

export default useStyles
