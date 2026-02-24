import { ImageProps } from 'react-native'

export interface PosterProps extends ImageProps {
  placeholder?: string
  spoiler?: boolean
  toggleSpoiler?: (spoiler: string) => void
}
