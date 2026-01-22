import { StyleSheet, ViewStyle } from 'react-native'

type StylesReturn = {
  column: ViewStyle
  wrap: ViewStyle
}
type StyleProps = {
  justify?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'
  align?: 'center' | 'flex-start' | 'flex-end' | 'stretch' | 'baseline'
}

const useStyles = (props: StyleProps): StylesReturn => {
  return StyleSheet.create({
    column: {
      flexDirection: 'column',
      gap: 8,
      maxWidth: '100%',
      justifyContent: props.justify,
      alignItems: props.align,
    },
    wrap: {
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
}

export default useStyles
