export interface MediumCarousselProps {
  nominations: {
    title: string
    image: string
    onPress: () => void
  }[]

  title?: string

  button: {
    title: string
    action: () => void
  }
}
