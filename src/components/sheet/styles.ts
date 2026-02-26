import { Platform, StyleSheet, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type StylesReturn = {
  headerCompensation: ViewStyle
  footerCompensation: ViewStyle
  root: ViewStyle
  content: ViewStyle
  headerBlur: ViewStyle
  header: ViewStyle
  footer: ViewStyle
  gap: ViewStyle
  fullscreen: ViewStyle
}

type UseStylesProps = {
  reordable?: boolean
  fullscreen?: boolean
}

const useStyles = ({ reordable, fullscreen }: UseStylesProps): StylesReturn => {
  const { bottom, top } = useSafeAreaInsets()
  return StyleSheet.create({
    fullscreen: {
      paddingTop: top + 20,
    },
    headerCompensation: {
      height: 60,
    },
    footerCompensation: {
      height: bottom,
    },
    root: {
      overflow: 'visible',
    },
    content: {
      paddingHorizontal: 20,
      gap: !reordable ? 12 : 0,
    },
    gap: {
      height: 12,
    },
    headerBlur: {
      zIndex: 1,
    },
    header: {
      zIndex: 1,
      padding: 20,
      justifyContent: 'center',
      alignContent: 'center',
      flexDirection: 'row',
      gap: 12,
    },
    footer: {
      padding: 20,
      paddingBottom: Platform.OS === 'android' ? bottom + 20 : bottom,
      justifyContent: 'center',
      alignContent: 'center',
      flexDirection: 'row',
      gap: 12,
    },
  })
}

export default useStyles
