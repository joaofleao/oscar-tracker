import React from 'react'
import { Modal, Pressable, View } from 'react-native'

import useStyles from './styles'
import { DropdownProps } from './types'
import Typography from '@components/typography'

const Dropdown = ({ children, label, visible, setVisible }: DropdownProps): React.ReactElement => {
  const styles = useStyles()

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <Pressable
        style={styles.overlay}
        onPress={() => setVisible(false)}
      />

      <View style={styles.popover}>
        {label && <Typography>{label}</Typography>}
        {children}
      </View>
    </Modal>
  )
}

export default Dropdown
