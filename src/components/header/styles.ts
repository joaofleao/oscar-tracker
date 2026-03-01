import { StyleSheet, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type StylesReturn = {
  root: ViewStyle
  background: ViewStyle
  gradient: ViewStyle
  left: ViewStyle
  right: ViewStyle
  center: ViewStyle
}

type StylesProps = {
  minWidth: number
}

const useStyles = ({ minWidth }: StylesProps): StylesReturn => {
  const { top } = useSafeAreaInsets()
  return StyleSheet.create({
    root: {
      paddingTop: top + 16,
      paddingVertical: 16,
      paddingHorizontal: 24,
      zIndex: 20,
    },
    left: {
      minWidth,
      alignItems: 'flex-start',
    },
    right: {
      minWidth,
      alignItems: 'flex-end',
    },
    center: {
      flex: 1,
    },
    background: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      position: 'absolute',
    },

    gradient: {
      pointerEvents: 'none',
      position: 'absolute',
      top: 0,
      height: top + 100,
      width: '100%',
      zIndex: 10,
    },
  })
}

export default useStyles
