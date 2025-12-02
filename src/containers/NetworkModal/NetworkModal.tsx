import React from 'react'

import useStyles from './styles'
import Button from '@components/Button'
import Modal from '@components/Modal'
import { useApp } from '@providers/app'

const NetworkModal = (): JSX.Element => {
  const app = useApp()
  const [visible, setVisible] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const styles = useStyles()

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(!app.hasInternet)
    }, 5000)
    return () => {
      return clearTimeout(timer)
    }
  }, [app.hasInternet])

  const retry = async (): Promise<void> => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }

  return (
    <Modal.Root visible={visible}>
      <Modal.Section>
        <Modal.Title>Unable to connect</Modal.Title>
        <Modal.Description>
          We encountered an error while trying to connect to the internet
        </Modal.Description>
      </Modal.Section>

      <Modal.Section />

      <Modal.Section>
        <Button
          style={styles.confirmationButton}
          loading={loading}
          label="Try Again"
          variant="outlined"
          onPress={retry}
        />
      </Modal.Section>
    </Modal.Root>
  )
}

export default NetworkModal
