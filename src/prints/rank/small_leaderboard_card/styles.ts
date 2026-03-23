import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { SemanticsType, useTheme } from '@providers/theme'

type StylesReturn = {
  root: ViewStyle
  placeContainer: ViewStyle
  place: TextStyle
  content: ViewStyle
  badge: ViewStyle

  imageContainer: ViewStyle
  image: ImageStyle
}

type StyleProps = {
  variant: keyof SemanticsType
}

const useStyles = ({ variant }: StyleProps): StylesReturn => {
  const { fonts, semantics } = useTheme()

  return StyleSheet.create({
    badge: {
      position: 'absolute',
      top: -8,
      left: -8,
    },
    root: {
      borderRadius: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: semantics[variant].stroke.default,
      backgroundColor: semantics[variant].base.tint,
    },
    placeContainer: {
      alignItems: 'flex-end',
    },
    place: {
      fontSize: 16,
      fontFamily: fonts.quaternary.regular,
      color: semantics[variant].foreground.default,
    },
    content: {
      flex: 1,
    },
    imageContainer: {
      width: 32,
      height: 32,
      borderRadius: 40,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: semantics[variant].stroke.default,
      backgroundColor: semantics[variant].base.tint,
    },
    image: {
      width: '100%',
      height: '100%',
    },
  })
}

export default useStyles
