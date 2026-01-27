import { StyleSheet, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  root: ViewStyle
}

const useStyles = (): StylesReturn => {
  const { semantics } = useTheme()

  return StyleSheet.create({
    root: {
      // borderRadius: 12,
      // borderWidth: 1,
      // borderColor: semantics.container.stroke.default,
      // backgroundColor: semantics.container.base.default,
      // flexDirection: 'row',
      // overflow: 'hidden',
      // width: 96,
      // height: 96,
      // justifyContent: 'center',
      // alignItems: 'center',
    },
  })
}

export default useStyles
