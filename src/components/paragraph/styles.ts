import { StyleSheet, ViewStyle } from 'react-native'

type StylesReturn = {
  root: ViewStyle
  spoiler: ViewStyle
  blur: ViewStyle
}

const useStyles = (): StylesReturn => {
  return StyleSheet.create({
    root: {},

    spoiler: {
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      width: '100%',
      height: '100%',
    },
    blur: {
      position: 'absolute',
      width: '100%',
      height: '100%',
    },
  })
}

export default useStyles
