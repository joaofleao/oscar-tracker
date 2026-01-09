import { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Authenticated, useAction, useMutation, useQuery } from 'convex/react'
import { api } from 'convex_api'
import { useTranslation } from 'react-i18next'
import useConvexErrorHandler from 'src/hooks/useConvexErrorHandler'

import packageJson from '../../../package.json'
import useStyles from './styles'
import Button from '@components/button'
import { IconDoor, IconTrash } from '@components/icon'
import IconButton from '@components/icon_button'
import Modal from '@components/modal'
import Question from '@components/question'
import Row from '@components/row'
import Section from '@components/section'
import TextInput from '@components/text_input'
import { TinyCheckmark, TinyChevron } from '@components/tiny_icon'
import Typography from '@components/typography'
import { useAuthActions } from '@convex-dev/auth/react'
import { useSettings } from '@providers/settings'
import { useTheme } from '@providers/theme'
import { ScreenType } from '@router/types'

const Settings: ScreenType<'settings'> = ({ navigation, route }) => {
  const styles = useStyles()
  const { t } = useTranslation()
  const { semantics } = useTheme()
  const { spoilers, setSpoilers, language, setLanguage } = useSettings()

  const { signOut } = useAuthActions()
  const user = useQuery(api.user.getCurrentUser)
  const updateUser = useMutation(api.user.updateUser)

  const [name, setName] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false)
  const [loadingSignOut, setLoadingSignOut] = useState<boolean>(false)
  const [deleteModal, setDeleteModal] = useState<boolean>(false)
  const [deletedModal, setDeletedModal] = useState<boolean>(false)
  const deleteAccount = useAction(api.user.deleteAccount)
  const catchConvexError = useConvexErrorHandler()

  useEffect(() => {
    if (!user) return
    setName(user?.name ?? '')
    setUsername(user?.username ?? '')
  }, [user])

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

  const handleSwitchLanguage = (value: boolean): void => {
    setLanguage(value ? 'en_US' : 'pt_BR')
  }

  const updateButton = {
    icon: <TinyCheckmark />,
    action: (): void => {
      updateUser({ name, username })
    },
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
            style={styles.hide}
            icon={<TinyChevron orientation="left" />}
            onPress={navigation.goBack}
          />
        </View>

        <View style={styles.content}>
          <Authenticated>
            <Section title={t('settings:account')}>
              <View style={styles.section}>
                <Typography legend>{t('settings:name')}</Typography>
                <TextInput
                  button={name !== user?.name ? updateButton : undefined}
                  value={name}
                  onChangeText={setName}
                  placeholder={t('settings:name_placeholder')}
                />
              </View>

              <View style={styles.section}>
                <Typography legend>{t('settings:username')}</Typography>
                <TextInput
                  button={username !== user?.username ? updateButton : undefined}
                  value={username}
                  onChangeText={setUsername}
                  placeholder={t('settings:username_placeholder')}
                />
              </View>
            </Section>
          </Authenticated>

          <Section title={t('settings:spoilers')}>
            <Question
              title={t('settings:poster_spoiler')}
              on={t('settings:yes')}
              off={t('settings:no')}
              selected={spoilers.hidePoster}
              setSelected={(value) => setSpoilers('hidePoster', value)}
            />
            <Question
              title={t('settings:cast_spoiler')}
              on={t('settings:yes')}
              off={t('settings:no')}
              selected={spoilers.hideCast}
              setSelected={(value) => setSpoilers('hideCast', value)}
            />
            <Question
              title={t('settings:rating_spoiler')}
              on={t('settings:yes')}
              off={t('settings:no')}
              selected={spoilers.hideRate}
              setSelected={(value) => setSpoilers('hideRate', value)}
            />
            <Question
              title={t('settings:plot_spoiler')}
              on={t('settings:yes')}
              off={t('settings:no')}
              selected={spoilers.hidePlot}
              setSelected={(value) => setSpoilers('hidePlot', value)}
            />
          </Section>
          <Question
            title={t('settings:language')}
            off={t('settings:ptbr')}
            on={t('settings:enus')}
            selected={language === 'en_US'}
            setSelected={handleSwitchLanguage}
          />
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
              icon={<IconTrash />}
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
