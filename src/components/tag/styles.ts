import { StyleSheet, ViewStyle } from 'react-native'

import { SemanticsType, useTheme } from '@providers/theme'

type StylesReturn = {
  root: ViewStyle
  hasTitle: ViewStyle
}

type StylesProps = {
  variant: keyof SemanticsType
}

const useStyles = ({ variant }: StylesProps): StylesReturn => {
  const { semantics } = useTheme()

  return StyleSheet.create({
    root: {
      position: 'relative',
      paddingHorizontal: 4,
      paddingVertical: 4,
      borderRadius: 8,
      borderWidth: 1,
      backgroundColor: semantics[variant].base.default,
      borderColor: semantics[variant].stroke.default,
      alignItems: 'center',
      flexDirection: 'row',
      gap: 8,
    },
    hasTitle: {
      paddingHorizontal: 8,
    },
  })
}

export default useStyles
