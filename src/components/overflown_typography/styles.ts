import { StyleSheet, ViewStyle } from 'react-native'

type StylesReturn = {
  root: ViewStyle
  container: ViewStyle
  text: ViewStyle
}

const useStyles = (): StylesReturn => {
  return StyleSheet.create({
    root: {
      overflow: 'hidden',
    },
    container: {
      width: '300%',
      overflow: 'hidden',
    },
    text: {
      alignSelf: 'flex-start',
    },
  })
}

export default useStyles
