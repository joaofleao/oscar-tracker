export interface SmallCarousselProps {
  nominations: {
    title: string
    image: string
    description?: string
    onPress: () => void
  }[]

  title?: string

  button: {
    title: string
    action: () => void
  }
}
