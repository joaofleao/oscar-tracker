import { useEffect, useState } from 'react'
import { Alert, ScrollView, View } from 'react-native'
import { Authenticated, Unauthenticated, useAction, useMutation, useQuery } from 'convex/react'
import { api } from 'convex_api'
import * as ImagePicker from 'expo-image-picker'
import * as SecureStore from 'expo-secure-store'
import { useTranslation } from 'react-i18next'
import useConvexErrorHandler from 'src/hooks/useConvexErrorHandler'

import packageJson from '../../../package.json'
import useStyles from './styles'
import Avatar from '@components/avatar'
import Button from '@components/button'
import { IconBroom, IconDoor, IconImages, IconTrash } from '@components/icon'
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
  const generateUploadUrl = useMutation(api.user.generateUploadUrl)

  const pickImage = async (): Promise<ImagePicker.ImagePickerAsset | undefined> => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (!permissionResult.granted) {
      Alert.alert(t('overall:permission_required'), t('overall:permission_media_library'))
      return
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.1,
    })

    if (!result.canceled) {
      return result.assets[0]
    }
  }

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

  const handleCleanCache = async (): Promise<void> => {
    await SecureStore.deleteItemAsync('language')
    await SecureStore.deleteItemAsync('currentEdition')
    await SecureStore.deleteItemAsync('hidePoster')
    await SecureStore.deleteItemAsync('hidePlot')
    await SecureStore.deleteItemAsync('hideRate')
    await SecureStore.deleteItemAsync('hideCast')
    handleSignOut()
  }

  const handleSwitchLanguage = (value: boolean): void => {
    setLanguage(value ? 'en_US' : 'pt_BR')
  }

  const handleChangeImage = async (): Promise<void> => {
    const pickedImage = await pickImage()

    if (pickedImage) {
      const postUrl = await generateUploadUrl()
      const result = await fetch(postUrl, {
        method: 'POST',
        body: pickedImage as unknown as Blob,
      })
      const { storageId } = await result.json()
      await updateUser({ image: storageId }).catch(catchConvexError)
    }
  }

  const handleRemoveImage = (): void => {
    void updateUser({ image: null }).catch(catchConvexError)
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
            <View style={styles.avatarContainer}>
              <Avatar
                name={user?.name}
                image={user?.imageURL ?? undefined}
              />
              <View style={styles.avatarButtons}>
                <Button
                  onPress={handleRemoveImage}
                  title={t('settings:remove')}
                  icon={<IconTrash />}
                />
                <Button
                  onPress={handleChangeImage}
                  title={t('settings:change')}
                  icon={<IconImages />}
                />
              </View>
            </View>
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

          <Row>
            <Unauthenticated>
              <Button
                onPress={handleCleanCache}
                title={t('settings:clean_cache')}
                icon={<IconBroom />}
              />
            </Unauthenticated>

            <Authenticated>
              <Button
                loading={loadingSignOut}
                onPress={handleSignOut}
                title={t('settings:sign_out')}
                icon={<IconDoor />}
              />
            </Authenticated>
          </Row>

          <Authenticated>
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
