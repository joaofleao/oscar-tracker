import React from 'react'
import { Modal as RNModal, Pressable, View } from 'react-native'

import useStyles from './styles'
import { ModalProps } from './types'
import Typography from '@components/typography'

const Modal = ({ children, label, description, visible, onClose, setVisible }: ModalProps): React.ReactElement => {
  const styles = useStyles()

  const close = (): void => {
    setVisible(false)
    onClose?.()
  }

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
    >
      <Pressable
        style={styles.overlay}
        onPress={close}
      />

      <View style={styles.modal}>
        <View style={styles.popover}>
          <View>
            {label && <Typography>{label}</Typography>}
            {description && <Typography description>{description}</Typography>}
          </View>
          {children}
        </View>
      </View>
    </RNModal>
  )
}

export default Modal
