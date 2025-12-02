import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  container: ViewStyle
  winnerCover: ViewStyle
  winnerTitle: TextStyle
  winnerDescription: TextStyle
  iconContainer: ViewStyle
  cover: ViewStyle
  coverWinner: ViewStyle
  image: ImageStyle
}

type StylesProps = {
  width: number | '100%'
  height: number | '100%'
  isWinner: boolean
  large: boolean
  isWatched?: boolean
  size: 'small' | 'full' | 'large'
}

const useStyles = ({
  width,
  height,
  isWinner,
  large,
  size,
  isWatched,
}: StylesProps): StylesReturn => {
  const { fonts, colors } = useTheme()

  return StyleSheet.create({
    container: {
      width: width,
      height: height,
      alignItems: isWinner ? 'flex-end' : 'center',
      justifyContent: isWinner ? 'flex-end' : 'center',
      borderRadius: 12,
      backgroundColor: colors.background.container,

      aspectRatio: 0.67,
    },
    winnerCover: {
      borderColor: colors.primary.default,
      borderRadius: 12,
      borderWidth: 2,
      position: 'absolute',
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    winnerTitle: {
      fontFamily: fonts.secondary.bold,
      color: colors.text.default,
      fontSize: large ? 18 : 14,
    },
    winnerDescription: {
      fontFamily: fonts.secondary.bold,
      color: colors.primary.default,
      fontSize: large ? 14 : 12,
    },
    iconContainer: {
      position: 'absolute',
      bottom: size === 'large' ? 12 : 8,
      right: size === 'large' ? 12 : 8,
      backgroundColor: colors.background.container,
      padding: size === 'full' ? 16 : 8,
      borderRadius: size === 'small' ? 8 : 12,
      shadowColor: '#000',
      shadowOpacity: 0.33,
      shadowRadius: 4,
      elevation: 6,
    },
    cover: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      borderRadius: 12,
      backgroundColor: 'rgba(0,0,0,.61)',
    },
    coverWinner: {
      borderColor: colors.primary.default,
      borderWidth: 2,
      borderStyle: 'solid',
    },
    image: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      borderRadius: 12,
    },
  })
}

export default useStyles
