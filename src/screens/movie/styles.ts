import { ImageStyle, StyleSheet, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type StylesReturn = {
  root: ViewStyle
  header: ViewStyle
  content: ViewStyle
  animation: ViewStyle
  bottom: ViewStyle
  backdropContainer: ViewStyle
  backdropGradient: ViewStyle
  backdropImage: ImageStyle

  chips: ViewStyle
  footer: ViewStyle
  section: ViewStyle
  main: ViewStyle
  datepicker: ViewStyle
}

const useStyles = (): StylesReturn => {
  const { bottom, right, left, top } = useSafeAreaInsets()

  return StyleSheet.create({
    root: {
      paddingBottom: bottom + 20,
      paddingTop: top + 20,
      paddingRight: right + 20,
      paddingLeft: left + 20,
      gap: 16,
    },
    section: {
      gap: 8,
    },
    chips: {
      gap: 8,
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
    backdropImage: {
      aspectRatio: 1,
      width: '100%',
      opacity: 0.7,
    },
    header: {
      position: 'absolute',
      top: top + 20,
      right: right + 20,
      left: left + 20,

      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',

      gap: 16,
    },
    content: {
      gap: 16,
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
