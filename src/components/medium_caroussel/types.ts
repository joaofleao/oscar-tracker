export interface MediumCarousselProps {
  nominations: {
    title: string
    image: string
  }[]

  title?: string

  button: {
    title: string
    action: () => void
  }
}
