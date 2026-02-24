import { Platform, StyleSheet, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type StylesReturn = {
  root: ViewStyle
  list: ViewStyle
  listContent: ViewStyle
  chevron: ViewStyle
}

type StyleParams = {
  height: number
  spacing: number
}

const HEADER_HEIGHT = 156
const FOOTER_HEIGHT = 40

const FOOTER_BOTTOM = 8
const FOOTER_TOP = 8

const useStyles = ({ height, spacing }: StyleParams): StylesReturn => {
  const { bottom } = useSafeAreaInsets()
  return StyleSheet.create({
    root: {
      marginVertical: 20,
      height: height,
      overflow: 'visible',
    },
    list: {
      ...(Platform.OS === 'ios' && { overflow: 'visible' }),
      ...(Platform.OS === 'android' && { marginTop: -HEADER_HEIGHT }),
    },
    listContent: {
      gap: spacing,
      ...(Platform.OS === 'android' && { paddingTop: HEADER_HEIGHT + 20 }),
      paddingHorizontal: Platform.OS === 'ios' ? 40 : 20,

      paddingBottom: Platform.OS === 'ios' ? 0 : bottom + FOOTER_BOTTOM + FOOTER_TOP + FOOTER_HEIGHT,
    },

    chevron: {
      position: 'absolute',
      left: 8,
      top: height / 2 - 12,
    },
  })
}

export default useStyles
