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
      padding: 12 - 1,
      borderRadius: 12,
      borderWidth: 1,
      // height: 40,
      // width: 40,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'flex-start',

      borderColor: semantics[variant].stroke.default,
      backgroundColor: semantics[variant].base.tint,
      flexDirection: 'row',
      gap: 8,
    },
    placeholder: {
      opacity: 0,
    },
  })
}

export default useStyles
