import { StyleSheet, ViewStyle } from 'react-native'

import { SemanticsType, useTheme } from '@providers/theme'

type StylesReturn = {
  root: ViewStyle
  placeholder: ViewStyle
}
type StylesProps = {
  variant: keyof SemanticsType
}

const useStyles = ({ variant }: StylesProps): StylesReturn => {
  const { semantics } = useTheme()

  return StyleSheet.create({
    root: {
      padding: 8,
      borderRadius: 12,
      borderWidth: 1,
      height: 40,
      width: 40,
      alignItems: 'center',
      justifyContent: 'center',

      borderColor: semantics[variant].stroke.default,
      backgroundColor: semantics[variant].base.default,
      flexDirection: 'row',
      gap: 8,
    },
    placeholder: {
      opacity: 0,
    },
  })
}

export default useStyles
