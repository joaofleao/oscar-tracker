import { StyleSheet, ViewStyle } from 'react-native'

type StylesReturn = {
  root: ViewStyle
  content: ViewStyle
}

const useStyles = (): StylesReturn => {
  return StyleSheet.create({
    root: {
      marginHorizontal: -20,
    },
    content: {
      gap: 8,
      paddingHorizontal: 20,
    },
  })
}

export default useStyles
