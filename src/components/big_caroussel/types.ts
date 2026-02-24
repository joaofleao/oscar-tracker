export interface BigCarousselProps {
  nominations: {
    title: string
    winner?: boolean
    image: string
    spoiler?: boolean
    watched?: boolean
    onPress: () => void
  }[]

  title?: string
  extra?: string

  badge?: {
    title: string
    variant: 'brand' | 'container'
  }
  button: {
    title: string
    action: () => void
  }
}
