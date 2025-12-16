export interface BigCarousselProps {
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
