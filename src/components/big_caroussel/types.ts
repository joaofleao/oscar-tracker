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

  button: {
    title: string
    action: () => void
  }
}
