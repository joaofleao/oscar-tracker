import { StyleSheet, ViewStyle } from 'react-native'

type StylesReturn = {
  root: ViewStyle
  list: ViewStyle
  gallery: ViewStyle
}

type StylesProps = {
  width: number
}

const useStyles = ({ width }: StylesProps): StylesReturn => {
  return StyleSheet.create({
    root: {
      position: 'relative',
    },
    item: {
      width: width ?? '100%',
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
