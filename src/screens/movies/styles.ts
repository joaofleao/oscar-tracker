import { Dimensions, ImageStyle, StyleSheet, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type StylesReturn = {
  logo: ImageStyle
  title: ViewStyle
  banner: ViewStyle
  content: ViewStyle
  gradient: ViewStyle
  gradientContainer: ViewStyle
  header: ViewStyle
  datepicker: ViewStyle
  flatlists: ViewStyle
}

const useStyles = (): StylesReturn => {
  const { width } = Dimensions.get('window')
  const { top, bottom, right, left } = useSafeAreaInsets()

  return StyleSheet.create({
    logo: {
      width: 159,
      height: 118,
    },
    datepicker: {
      alignSelf: 'center',
    },
    banner: {
      position: 'relative',
      alignItems: 'center',
      gap: 20,
      paddingTop: 60,
      paddingBottom: 20,
    },
    title: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      alignItems: 'center',
      justifyContent: 'center',
      gap: 20,
      paddingTop: 20,
    },
    gradientContainer: {
      position: 'absolute',
      alignSelf: 'center',
      top: -width / 2,
    },
    gradient: {
      height: width * 2,
      width: width,
    },

    header: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      width: '100%',
      position: 'absolute',
      top,
      paddingHorizontal: 20,
      paddingBottom: 20,
      maxWidth: '100%',
      alignSelf: 'flex-end',
    },
    flatlists: {
      paddingTop: top + 20,
      paddingBottom: bottom + 88,
      paddingRight: right + 16,
      paddingLeft: left + 16,
    },
  })
}

export default useStyles
