import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

type StylesReturn = {
  root: ViewStyle
  text: TextStyle
}

const useStyles = (): StylesReturn => {
  return StyleSheet.create({
    root: {
      gap: 8,
    },
    text: {
      gap: 16,
      flex: 1,
    },
  })
}

export default useStyles
