import { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Authenticated, useAction } from 'convex/react'
import { api } from 'convex_api'
import { setItem } from 'expo-secure-store'
import { useTranslation } from 'react-i18next'
import useConvexErrorHandler from 'src/hooks/useConvexErrorHandler'

import packageJson from '../../../package.json'
import useStyles from './styles'
import Button from '@components/button'
import { IconDoor, IconLanguages } from '@components/icon'
import IconButton from '@components/icon_button'
import Modal from '@components/modal'
import Row from '@components/row'
import TextInput from '@components/text_input'
import { TinyChevron } from '@components/tiny_icon'
import Typography from '@components/typography'
import { useAuthActions } from '@convex-dev/auth/react'
import { useTheme } from '@providers/theme'
import { ScreenType } from '@router/types'

const Settings: ScreenType<'settings'> = ({ navigation, route }) => {
  const styles = useStyles()
  const { t, i18n } = useTranslation()
  const { semantics } = useTheme()

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
        navigation.navigate('home')
      })
      .finally(() => setLoadingSignOut(false))
  }

  const handleSwitchLanguage = async (): Promise<void> => {
    i18n.changeLanguage(i18n.language === 'en_US' ? 'pt_BR' : 'en_US')
    setItem('language', i18n.language)
  }

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.root}
        alwaysBounceVertical={false}
      >
        <View style={styles.header}>
          <IconButton
            icon={<TinyChevron orientation="left" />}
            onPress={navigation.goBack}
          />
          <Typography>{t('settings:settings')}</Typography>
          <IconButton
            style={{ opacity: 0 }}
            icon={<TinyChevron orientation="left" />}
            onPress={navigation.goBack}
          />
        </View>

        <View style={styles.content}>
          <Authenticated>
            <Typography>{t('settings:account')}</Typography>
            <View style={styles.section}>
              <Typography legend>{t('settings:name')}</Typography>
              <TextInput placeholder={t('settings:name_placeholder')} />
            </View>

            <View style={styles.section}>
              <Typography legend>{t('settings:username')}</Typography>
              <TextInput placeholder={t('settings:username_placeholder')} />
            </View>
          </Authenticated>

          <Typography>{t('settings:language')}</Typography>
          <Button
            onPress={handleSwitchLanguage}
            title={i18n.language === 'en_US' ? t('settings:switch_to_ptbr') : t('settings:switch_to_enus')}
            icon={<IconLanguages />}
          />
          <Typography>{t('settings:preferences')}</Typography>
          <Row between>
            <Typography body>{t('settings:poster_spoiler')}</Typography>

            <View style={{ flexDirection: 'row', gap: 8 }}>
              <Button
                small
                title={t('settings:yes')}
                variant="ghost"
              />
              <Button
                small
                title={t('settings:no')}
                variant="accent"
              />
            </View>
          </Row>
          <Row between>
            <Typography body>{t('settings:cast_spoiler')}</Typography>

            <View style={{ flexDirection: 'row', gap: 8 }}>
              <Button
                small
                title={t('settings:yes')}
                variant="ghost"
              />
              <Button
                small
                title={t('settings:no')}
                variant="accent"
              />
            </View>
          </Row>
          <Row between>
            <Typography body>{t('settings:rating_spoiler')}</Typography>

            <View style={{ flexDirection: 'row', gap: 8 }}>
              <Button
                small
                title={t('settings:yes')}
                variant="ghost"
              />
              <Button
                small
                title={t('settings:no')}
                variant="accent"
              />
            </View>
          </Row>
          <Row between>
            <Typography body>{t('settings:plot_spoiler')}</Typography>

            <View style={{ flexDirection: 'row', gap: 8 }}>
              <Button
                small
                title={t('settings:yes')}
                variant="ghost"
              />
              <Button
                small
                title={t('settings:no')}
                variant="accent"
              />
            </View>
          </Row>
        </View>

        <View style={styles.footer}>
          <Typography legend>
            {t('settings:version')}{' '}
            <Typography
              color={semantics.accent.base.default}
              legend
            >
              {packageJson.version}
            </Typography>
          </Typography>

          <Authenticated>
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
          </Authenticated>
        </View>
      </ScrollView>

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
