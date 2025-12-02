import React from 'react'
import { FlatList, Linking, Text } from 'react-native'

import useStyles from './styles'
import Button from '@components/Button'
import Global from '@components/Global'
import Modal from '@components/Modal'
import { useAnnouncements } from '@providers/announcements'
import packageJson from '@package.json'

const NewVersionModal = (): JSX.Element => {
  const { announcements } = useAnnouncements()
  const styles = useStyles()

  const update = announcements[0]

  const [modal, setModal] = React.useState<boolean>(false)

  React.useEffect(() => {
    if (announcements.length > 0 && announcements[0].version !== packageJson.version) setModal(true)
  }, [announcements])

  const renderItem = (object): JSX.Element => {
    return <Text style={styles.updateItem}>● {object.item}</Text>
  }

  return (
    <Modal.Root visible={modal}>
      <Modal.Section>
        <Modal.Title>{update?.title}</Modal.Title>
        <Modal.Description>{update?.description}</Modal.Description>
      </Modal.Section>

      <Modal.Section>
        <FlatList
          style={styles.content}
          data={update?.updates}
          renderItem={renderItem}
          ItemSeparatorComponent={Global.SmallSeparator}
        />
      </Modal.Section>

      <Modal.Section>
        <Button
          style={styles.confirmationButton}
          label={'Update to '.concat(update?.version)}
          variant="secondary"
          onPress={(): void => {
            Linking.openURL(update?.url)
          }}
        />
      </Modal.Section>
    </Modal.Root>
  )
}

export default NewVersionModal
