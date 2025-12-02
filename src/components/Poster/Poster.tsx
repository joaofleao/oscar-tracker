import { Image, Text, View } from 'react-native'

import useStyles from './styles'
import Icon from '@components/Icon'
import { useTheme } from '@providers/theme'

export interface PosterProps {
  image: string
  isWatched?: boolean
  spoiler?: boolean
  size?: 'small' | 'large' | 'full'
  winner?: boolean
  winnerTitle?: string
  winnerDescription?: string
  dimmAndLock?: boolean
}

const defaultValues: Partial<PosterProps> = {
  isWatched: false,
  spoiler: false,
  size: 'small',
  winner: false,
  dimmAndLock: false,
}

const Poster = (props: PosterProps): JSX.Element => {
  const { image, isWatched, spoiler, size, winner, winnerTitle, winnerDescription, dimmAndLock } = {
    ...defaultValues,
    ...props,
  }
  const theme = useTheme()

  const width = size === 'large' ? 158 : size === 'full' ? '100%' : 106
  const height = size === 'large' ? 236 : size === 'full' ? '100%' : 158

  const styles = useStyles({
    width,
    height,
    isWinner: winner,
    large: size === 'large',
    size,
    isWatched,
  })

  const getPoster = (
    <Image
      style={styles.image}
      blurRadius={winner || isWatched || spoiler ? 0 : 8}
      source={image ? { uri: image } : null}
      resizeMode="cover"
    />
  )
  const getCover = <View style={styles.cover} />

  const getIcon = (
    <View style={styles.iconContainer}>
      <Icon.Lock
        width={size === 'small' ? 16 : 24}
        height={size === 'small' ? 16 : 24}
        color={theme.colors.primary.default}
      />
    </View>
  )

  const getWinnerCover = (
    <View style={styles.winnerCover}>
      {winnerTitle && <Text style={styles.winnerTitle}>{winnerTitle}</Text>}
      {winnerDescription && <Text style={styles.winnerDescription}>{winnerDescription}</Text>}
    </View>
  )
  return (
    <View style={styles.container}>
      {getPoster}

      {((dimmAndLock && !isWatched) || winner) && getCover}
      {dimmAndLock && !isWatched ? getIcon : undefined}
      {winner && getWinnerCover}
    </View>
  )
}

export default Poster
