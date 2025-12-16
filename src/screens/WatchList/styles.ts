import { StyleSheet, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  header: ViewStyle
  floatingButton: ViewStyle
  progressContainer: ViewStyle
  item: ViewStyle
}

const useStyles = (): StylesReturn => {
  const { colors } = useTheme()
  return StyleSheet.create({
    item: {
      marginHorizontal: 20,
    },
    floatingButton: {
      backgroundColor: colors.background.default,
    },
    header: {
      marginHorizontal: 20,
      paddingBottom: 20,
      flexDirection: 'row',
      gap: 18,

      // flexDirection: 'row',
      // width: '100%',
      // justifyContent: 'space-between',
      // marginBottom: 12,
    },
    progressContainer: {
      marginHorizontal: 20,
      marginBottom: 20,
    },
  })
}

export default useStyles
