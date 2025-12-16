import { StyleSheet, ViewStyle } from 'react-native'

type StylesReturn = {
  root: ViewStyle
  list: ViewStyle
  gallery: ViewStyle
}

const useStyles = (): StylesReturn => {
  return StyleSheet.create({
    root: {
      position: 'relative',
    },
    list: {
      gap: 16,
      justifyContent: 'space-between',
    },
    gallery: {
      justifyContent: 'space-between',
    },
  })
}

export default useStyles
