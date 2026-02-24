export interface DropdownProps {
  children: React.ReactElement | React.ReactElement[]
  label?: string
  visible?: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}
