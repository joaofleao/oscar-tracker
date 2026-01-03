import { StyleSheet, ViewStyle } from 'react-native'

type StylesReturn = {
  bottomArea: ViewStyle
}

const useStyles = (): StylesReturn => {
  return StyleSheet.create({
    bottomArea: {
      gap: 8,
    },
  })
}

export default useStyles
