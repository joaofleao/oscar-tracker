import { StyleSheet, ViewStyle } from 'react-native'

type StylesReturn = {
  root: ViewStyle
  list: ViewStyle
  listActive: ViewStyle
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
      position: 'relative',
      height,
      paddingVertical: 20,
      overflow: 'visible',
    },
    list: {
      overflow: 'visible',
    },
    listActive: {
      marginBottom: -height,
    },
    listContent: {
      gap: spacing,
      paddingHorizontal: 40,
    },
    chevron: {
      position: 'absolute',
      left: 8,
      top: height - 12,
    },
  })
}

export default useStyles
