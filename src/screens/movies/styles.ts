import { StyleSheet, ViewStyle } from 'react-native'

type StylesReturn = {
  bottomArea: ViewStyle
  empty: ViewStyle
}

const useStyles = (): StylesReturn => {
  return StyleSheet.create({
    bottomArea: {
      gap: 8,
    },
    empty: {
      paddingTop: 42,
    },
  })
}

export default useStyles
