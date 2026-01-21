import { StyleSheet, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  root: ViewStyle
  placeholder: ViewStyle
  progress: ViewStyle
}

type StylesProps = {
  percentage: number
}

const useStyles = ({ percentage }: StylesProps): StylesReturn => {
  const { semantics } = useTheme()
  return StyleSheet.create({
    root: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 4,
      alignItems: 'center',
      gap: 8,
      width: '100%',
    },
    placeholder: {
      height: 4,
      flex: 1,
      backgroundColor: semantics.accent.stroke.default,
    },
    progress: {
      height: '100%',
      width: `${percentage}%`,
      backgroundColor: semantics.brand.foreground.light,
      borderRadius: 2,
    },
  })
}

export default useStyles
