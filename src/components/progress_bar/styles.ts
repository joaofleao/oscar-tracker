import { StyleSheet, ViewStyle } from 'react-native'

import { SemanticsType, useTheme } from '@providers/theme'

type StylesReturn = {
  root: ViewStyle
  placeholder: ViewStyle
  progress: ViewStyle
}

type StylesProps = {
  percentage: number
  thickness: number
  transparentBackground: boolean
  variant: keyof SemanticsType
}

const useStyles = ({ percentage, thickness, transparentBackground, variant }: StylesProps): StylesReturn => {
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
      height: thickness,
      flex: 1,
      backgroundColor: transparentBackground ? 'transparent' : semantics[variant].stroke.default,
      borderRadius: thickness / 2,
    },
    progress: {
      height: '100%',
      width: `${percentage}%`,
      backgroundColor: semantics[variant].base.default,
      borderRadius: thickness / 2,
    },
  })
}

export default useStyles
