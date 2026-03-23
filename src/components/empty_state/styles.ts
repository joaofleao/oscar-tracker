import { StyleSheet, ViewStyle } from 'react-native'

type StylesReturn = {
  root: ViewStyle
  content: ViewStyle
}

const useStyles = (): StylesReturn => {
  return StyleSheet.create({
    root: {
      justifyContent: 'center',
      alignItems: 'center',
      gap: 8,
    },
    content: {
      alignItems: 'center',
    },
  })
}

export default useStyles
