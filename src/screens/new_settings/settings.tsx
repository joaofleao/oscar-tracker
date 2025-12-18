import { useState } from 'react'
import { View } from 'react-native'
import { useAction } from 'convex/react'
import { api } from 'convex_api'
import { setItem } from 'expo-secure-store'
import { useTranslation } from 'react-i18next'
import useConvexErrorHandler from 'src/hooks/useConvexErrorHandler'

import useStyles from './styles'
import Button from '@components/button'
import { IconDoor, IconLanguages } from '@components/icon'
import Modal from '@components/modal'
import Row from '@components/row'
import { useAuthActions } from '@convex-dev/auth/react'
import { ScreenType } from '@router/types'

const Settings: ScreenType<'settings'> = ({ navigation, route }) => {
  const styles = useStyles()
  const { t, i18n } = useTranslation()

  const { signOut } = useAuthActions()

  const [loadingDelete, setLoadingDelete] = useState<boolean>(false)
  const [loadingSignOut, setLoadingSignOut] = useState<boolean>(false)
  const [deleteModal, setDeleteModal] = useState<boolean>(false)
  const [deletedModal, setDeletedModal] = useState<boolean>(false)
  const deleteAccount = useAction(api.user.deleteAccount)
  const catchConvexError = useConvexErrorHandler()

  const handleDelete = async (): Promise<void> => {
    setLoadingDelete(true)
    void deleteAccount()
      .catch(catchConvexError)
      .then(() => {
        setDeleteModal(false)
        setDeletedModal(true)
      })
      .finally(() => setLoadingDelete(false))
  }

  const handleSignOut = async (): Promise<void> => {
    setLoadingSignOut(true)
    void signOut()
      .catch(catchConvexError)
      .then(() => {
        navigation.pop()
      })
      .finally(() => setLoadingSignOut(false))
  }

  const handleSwitchLanguage = async (): Promise<void> => {
    i18n.changeLanguage(i18n.language === 'en_US' ? 'pt_BR' : 'en_US')
    setItem('language', i18n.language)
  }

  return (
    <>
      <View style={styles.root}>
        <View style={styles.header}>
          <Button
            onPress={handleSwitchLanguage}
            title={i18n.language === 'en_US' ? t('settings:switch_to_ptbr') : t('settings:switch_to_enus')}
            icon={<IconLanguages />}
          />
          <Button
            loading={loadingSignOut}
            onPress={handleSignOut}
            title={t('settings:sign_out')}
            icon={<IconDoor />}
          />
          <Button
            variant="negative"
            onPress={() => setDeleteModal(true)}
            title={t('settings:delete_account')}
            icon={<IconDoor />}
          />
        </View>
      </View>

      <Modal
        setVisible={setDeleteModal}
        visible={deleteModal}
        label={t('settings:delete_account_title')}
        description={t('settings:delete_account_message')}
      >
        <Row center>
          <Button
            onPress={() => setDeleteModal(false)}
            title={t('settings:delete_account_deny')}
          />
          <Button
            loading={loadingDelete}
            onPress={handleDelete}
            variant="negative"
            title={t('settings:delete_account_confirm')}
          />
        </Row>
      </Modal>
      <Modal
        onClose={handleSignOut}
        setVisible={setDeletedModal}
        visible={deletedModal}
        label={t('settings:deleted_account_title')}
        description={t('settings:deleted_account_message')}
      >
        <Row center>
          <Button
            onPress={handleSignOut}
            variant="negative"
            title={t('settings:deleted_account_confirm')}
          />
        </Row>
      </Modal>
    </>
  )
}

export default Settings
