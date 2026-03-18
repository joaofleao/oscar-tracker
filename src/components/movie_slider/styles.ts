import { Platform, StyleSheet, ViewStyle } from 'react-native'

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

const useStyles = ({ height, spacing }: StyleParams): StylesReturn => {
  return StyleSheet.create({
    root: {
      marginVertical: 20,
      height: height,
      overflow: 'visible',
    },
    list: {
      overflow: 'visible',
    },
    listContent: {
      gap: spacing,

      paddingHorizontal: Platform.OS === 'ios' ? 40 : 20,
    },

    chevron: {
      position: 'absolute',
      left: 8,
      top: height / 2 - 12,
    },
  })
}

export default useStyles
