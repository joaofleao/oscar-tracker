export interface QuestionProps {
  title: string

  on: string
  off: string
  selected: boolean
  setSelected: (value: boolean) => void
}
