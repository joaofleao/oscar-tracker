import { ImageStyle, StyleSheet, ViewStyle } from 'react-native'

type StylesReturn = {
  backgroundContainer: ViewStyle
  backgroundImage: ImageStyle
  backgroundImageActive: ImageStyle
  backgroundImageInactive: ImageStyle
  gradientTop: ViewStyle
  gradientBottom: ViewStyle
  container: ViewStyle
  contentWrapper: ViewStyle
  list: ViewStyle
  listContent: ViewStyle
  infoContainer: ViewStyle
  infoTextContainer: ViewStyle
}

type StyleParams = {
  sidePadding: number
  height: number
  cardSpacing: number
}

const useStyles = ({ sidePadding, height, cardSpacing }: StyleParams): StylesReturn => {
  return StyleSheet.create({
    backgroundContainer: {
      zIndex: -1,
      position: 'absolute',
      top: -150,
      width: '120%',
      aspectRatio: 2 / 3,
      alignSelf: 'center',
    },

    backgroundImage: {
      position: 'absolute',
      width: '100%',
      height: '100%',
    },

    backgroundImageActive: {
      opacity: 0.4,
    },

    backgroundImageInactive: {
      opacity: 0,
    },

    gradientTop: {
      pointerEvents: 'none',
      position: 'absolute',
      top: 0,
      height: 300,
      width: '100%',
    },

    gradientBottom: {
      pointerEvents: 'none',
      position: 'absolute',
      bottom: 0,
      height: 500,
      width: '100%',
    },

    container: {
      paddingBottom: 20,
      marginHorizontal: -20,
    },

    contentWrapper: {
      gap: 40,
    },

    list: {
      overflow: 'visible',
    },

    listContent: {
      gap: cardSpacing,
      paddingHorizontal: sidePadding,
    },

    infoContainer: {
      alignItems: 'center',
      gap: 8,
      paddingHorizontal: 16,
      // minHeight: 200,
    },

    infoTextContainer: {
      alignItems: 'center',
      gap: 8,
    },
  })
}

export default useStyles
