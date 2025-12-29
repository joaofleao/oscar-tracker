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
import { IconDoor } from '@components/icon'
import IconButton from '@components/icon_button'
import Modal from '@components/modal'
import Question from '@components/question'
import Row from '@components/row'
import Section from '@components/section'
import TextInput from '@components/text_input'
import { TinyChevron } from '@components/tiny_icon'
import Typography from '@components/typography'
import { useAuthActions } from '@convex-dev/auth/react'
import { useSettings } from '@providers/settings'
import { useTheme } from '@providers/theme'
import { ScreenType } from '@router/types'

const Settings: ScreenType<'settings'> = ({ navigation, route }) => {
  const styles = useStyles()
  const { t, i18n } = useTranslation()
  const { semantics } = useTheme()
  const { spoilers, setSpoilers } = useSettings()

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

  const handleSwitchLanguage = (value: boolean): void => {
    i18n.changeLanguage(value ? 'en_US' : 'pt_BR')
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
                <TextInput placeholder={t('settings:name_placeholder')} />
              </View>

              <View style={styles.section}>
                <Typography legend>{t('settings:username')}</Typography>
                <TextInput placeholder={t('settings:username_placeholder')} />
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
            selected={i18n.language === 'en_US'}
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
