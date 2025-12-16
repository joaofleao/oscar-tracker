import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'
import useScreenInsets from '@hooks/useScreenInsets'

type StylesReturn = {
  contentContainer: ViewStyle
  spoilerPoster: ViewStyle
  mainContent: ViewStyle
  basicData: ViewStyle
  iconInformation: ViewStyle
  iconInformationText: TextStyle
  carousselHeader: ViewStyle

  title: TextStyle
  subTitle: TextStyle
  plot: TextStyle
  list: ViewStyle
  cast: ViewStyle
  castSpoiler: ViewStyle
  castImage: ImageStyle
  castName: TextStyle
  castCharacter: TextStyle
  castImageContainer: ViewStyle
  castNoImage: TextStyle
  provider: ImageStyle
  emptyState: TextStyle
  nomination: ViewStyle
  footer: ViewStyle
  animation: ViewStyle
  nominationText: TextStyle
}

const useStyles = (): StylesReturn => {
  const { colors, fonts } = useTheme()
  const { bottom, top } = useScreenInsets()
  return StyleSheet.create({
    contentContainer: {
      paddingHorizontal: 20,
      paddingTop: top,
      paddingBottom: bottom + 68,
      gap: 20,
    },
    spoilerPoster: {
      flex: 1,
      maxWidth: '70%',
    },
    mainContent: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'space-around',
    },
    basicData: {
      alignItems: 'center',
      gap: 8,
      flexDirection: 'row',
    },
    iconInformation: {
      flexDirection: 'row',
      paddingHorizontal: 8,
      paddingVertical: 8,
      backgroundColor: colors.background.container,
      gap: 8,
      borderRadius: 6,
    },
    iconInformationText: {
      color: colors.text.default,

      fontFamily: fonts.secondary.bold,
      fontSize: 16,
    },

    carousselHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    title: {
      fontFamily: fonts.primary.bold,
      color: colors.text.default,
      fontSize: 24,
      lineHeight: 32,
    },
    subTitle: {
      fontFamily: fonts.secondary.bold,
      color: colors.text.default,
      fontSize: 16,
      lineHeight: 20,
      flex: 1,
    },

    plot: {
      color: colors.text.default,
      fontFamily: fonts.secondary.regular,
      fontSize: 14,
      lineHeight: 20,

      letterSpacing: 1,
    },

    list: {
      marginHorizontal: -20,
    },

    cast: {
      gap: 8,
      width: 106,
    },
    castSpoiler: {
      justifyContent: 'flex-start',
      alignSelf: 'flex-start',
    },

    castImage: {
      width: 106,
      height: 158,
    },

    castName: {
      color: colors.text.default,
      fontFamily: fonts.secondary.bold,
      fontSize: 16,
      width: '100%',
    },

    castCharacter: {
      color: colors.text.default,
      fontFamily: fonts.secondary.regular,
      fontSize: 14,
      textAlign: 'justify',
      paddingBottom: 4,
    },

    castImageContainer: {
      backgroundColor: colors.background.container,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
    },

    castNoImage: {
      position: 'absolute',
      fontFamily: fonts.secondary.bold,
      color: colors.text.disabled,
    },

    provider: {
      width: 50,
      height: 50,
      borderRadius: 50,
      marginBottom: 2,
      backgroundColor: colors.background.container,
    },

    emptyState: {
      fontFamily: fonts.secondary.bold,
      color: colors.text.disabled,
    },

    nomination: {
      gap: 4,
      flexDirection: 'row',
      backgroundColor: colors.background.container,
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 20,
    },

    nominationText: {
      fontFamily: fonts.tertiary.bold,
      color: colors.text.default,
    },

    footer: {
      backgroundColor: colors.background.container,
      paddingTop: 20,
      paddingHorizontal: 20,
      paddingBottom: bottom + 12,
      flexDirection: 'row',
      borderTopRightRadius: 12,
      borderTopLeftRadius: 12,
      position: 'absolute',
      bottom: 0,
      width: '100%',
      justifyContent: 'space-between',
    },
    animation: {
      width: '100%',
      height: '80%',
      position: 'absolute',
      bottom: 0,
      pointerEvents: 'none',
    },
  })
}

export default useStyles
