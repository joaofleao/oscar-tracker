export interface BigCarousselProps {
  nominations: {
    title: string
    image: string
    spoiler?: boolean
    watched?: boolean
    onPress: () => void
  }[]

  title?: string

  button: {
    title: string
    action: () => void
  }
}
