import { Dimensions, StyleSheet, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  list: ViewStyle
  categories: ViewStyle
  content: ViewStyle
  page: ViewStyle
  container: ViewStyle
  listContainer: ViewStyle
  accent: ViewStyle
  footer: ViewStyle
  header: ViewStyle
  headerContent: ViewStyle

  leaderboard: ViewStyle
  leaderboardContent: ViewStyle
  expandLeaderboardButton: ViewStyle
  expandLeaderboardButtonInline: ViewStyle
}

const useStyles = (): StylesReturn => {
  const { semantics } = useTheme()
  const { bottom, top } = useSafeAreaInsets()
  const { height } = Dimensions.get('screen')

  return StyleSheet.create({
    list: {
      height: '100%',
      overflow: 'visible',
    },
    categories: {
      marginHorizontal: -20,
      paddingHorizontal: 20,
    },
    content: {
      backgroundColor: 'red',
    },
    accent: {
      backgroundColor: semantics.accent.base.default,
    },
    footer: {
      paddingHorizontal: 40,
      paddingTop: 20,
      bottom: bottom + 20,
    },

    page: {
      overflow: 'hidden',
      backgroundColor: semantics.container.base.default,
      height: height,
    },
    container: {
      marginHorizontal: 20,
      marginTop: top + 20,
      marginBottom: bottom + 120,
      gap: 40,
      justifyContent: 'center',
      flex: 1,
    },
    listContainer: {
      gap: 8,
      flex: 1,
      marginBottom: bottom + 20,
    },
    header: {
      zIndex: 2,
    },
    headerContent: {
      zIndex: 2,
      paddingHorizontal: 20,
      paddingTop: top + 20,
      paddingBottom: 20,
      justifyContent: 'center',
      alignContent: 'center',
      flexDirection: 'row',
      gap: 12,
    },
    leaderboard: {
      overflow: 'visible',
    },
    leaderboardContent: {
      paddingHorizontal: 20,
      gap: 16,
    },
    expandLeaderboardButton: {
      paddingHorizontal: 20,
      paddingTop: 12,
    },
    expandLeaderboardButtonInline: {
      marginTop: 16,
    },
  })
}

export default useStyles
