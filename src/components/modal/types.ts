export interface ModalProps {
  children: React.ReactElement | React.ReactElement[]
  label?: string
  description?: string
  visible?: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  onClose?: () => void
}
