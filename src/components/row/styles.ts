import { StyleSheet, ViewStyle } from 'react-native'

type StylesReturn = {
  row: ViewStyle
  wrap: ViewStyle
}
type StyleProps = {
  justify?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'
  align?: 'middle'
}

const useStyles = (props: StyleProps): StylesReturn => {
  return StyleSheet.create({
    row: {
      flexDirection: 'row',
      gap: 8,
      maxWidth: '100%',
      justifyContent: props.justify,
      alignItems: props.align === 'middle' ? 'center' : 'flex-start',
    },
    wrap: {
      flexWrap: 'wrap',
    },
  })
}

export default useStyles
