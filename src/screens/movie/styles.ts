import { ImageStyle, Platform, StyleSheet, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type StylesReturn = {
  scroll: ViewStyle
  scrollContent: ViewStyle

  content: ViewStyle
  posterContainer: ViewStyle
  header: ViewStyle
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
  const { bottom, right, left, top } = useSafeAreaInsets()

  return StyleSheet.create({
    scroll: {
      overflow: 'visible',
      flex: 1,
    },
    scrollContent: {
      paddingLeft: left + 20,
      paddingRight: right + 20,
      paddingTop: Platform.OS === 'android' ? top + 20 : 40,
      gap: 16,
      paddingBottom: bottom + 20,
    },
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
      // marginHorizontal: -20,
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
    header: {
      position: 'absolute',
      top: top,
      right: right + 20,
      left: left + 20,

      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',

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
