import { Text } from 'react-native'

import useStyles from './styles'
import Button from '@components/Button'
import Modal from '@components/Modal'
import { useEdition } from '@providers/edition'

type WinnerModalProps = {
  newWinner: [string, string, string] | null
  setNewWinner: (value: [string, string] | null) => void
  categoryId: string
}

const WinnerModal = (props: WinnerModalProps): JSX.Element => {
  const { newWinner, setNewWinner, categoryId } = props
  const edition = useEdition()
  const styles = useStyles()

  const close = (): void => {
    setNewWinner(null)
  }

  const handleSetWinner = (): void => {
    edition.markCategoryWinner(newWinner[1], categoryId)
    close()
  }

  return (
    <Modal.Root
      visible={!!newWinner}
      onClickOutside={close}
    >
      <Modal.Title>Set Winner</Modal.Title>
      <Modal.Description>
        Are you sure you want to set
        <Text style={styles.accent}> {newWinner?.[0]} </Text> from
        <Text style={styles.accent}> {newWinner?.[2]} </Text>
        as the winner?
      </Modal.Description>

      <Modal.Row>
        <Button
          width="full"
          label="Cancel"
          variant="secondary"
          onPress={close}
        />
        <Button
          width="full"
          variant="primary"
          label="Set Winner"
          onPress={handleSetWinner}
        />
      </Modal.Row>
    </Modal.Root>
  )
}

export default WinnerModal
