export interface SmallCarousselProps {
  nominations: {
    title: string
    image: string
    description?: string
  }[]

  title?: string

  button: {
    title: string
    action: () => void
  }
}
