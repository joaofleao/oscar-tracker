import { ImageStyle, StyleSheet, ViewStyle } from 'react-native'

type StylesReturn = {
  content: ViewStyle
  posterContainer: ViewStyle

  animation: ViewStyle
  bottom: ViewStyle
  backdropContainer: ViewStyle
  backdropGradient: ViewStyle
  backdropGradientTop: ViewStyle

  backdropImage: ImageStyle

  chips: ViewStyle
  footer: ViewStyle
  section: ViewStyle
  main: ViewStyle
  datepicker: ViewStyle
}

const useStyles = (): StylesReturn => {
  return StyleSheet.create({
    content: {
      gap: 16,
    },

    section: {
      gap: 8,
    },

    posterContainer: {
      justifyContent: 'space-between',
      width: '100%',
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    chips: {
      gap: 8,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    backdropContainer: {
      position: 'absolute',
    },
    backdropGradient: {
      pointerEvents: 'none',
      position: 'absolute',
      bottom: 0,
      height: 300,
      width: '100%',
    },
    backdropGradientTop: {
      top: 0,
      bottom: undefined,
    },
    backdropImage: {
      aspectRatio: 1,
      width: '100%',
      opacity: 0.7,
    },

    main: {
      gap: 24,
      alignItems: 'center',
    },
    footer: {
      justifyContent: 'center',
      alignItems: 'center',
      gap: 12,
    },
    datepicker: {
      alignSelf: 'center',
    },
    animation: {
      position: 'absolute',
      width: '130%',
      aspectRatio: 1,
      top: 0,
      alignSelf: 'center',
      pointerEvents: 'none',
    },
    bottom: {
      top: undefined,
      bottom: 0,
    },
  })
}

export default useStyles
