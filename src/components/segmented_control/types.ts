export interface SegmentedControlProps {
  selected: string
  onChange: (value: string) => void
  options: Record<string, string>
}
