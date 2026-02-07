import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

type StylesReturn = {
  rule: TextStyle
  container: ViewStyle
}

const useStyles = (): StylesReturn => {
  return StyleSheet.create({
    rule: {
      flex: 1,
    },

    container: {
      flexDirection: 'row',
      gap: 8,
    },
  })
}

export default useStyles
