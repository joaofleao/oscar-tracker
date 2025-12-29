import { StyleSheet, ViewStyle } from 'react-native'

type StylesReturn = {
  root: ViewStyle
  content: ViewStyle
}

const useStyles = (): StylesReturn => {
  return StyleSheet.create({
    root: {
      minHeight: 300,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 20,
    },
    content: {
      alignItems: 'center',
    },
  })
}

export default useStyles
