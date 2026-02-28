import { useState } from 'react'
import { Alert, Linking, ScrollView, View } from 'react-native'
import { useKeyboardHandler } from 'react-native-keyboard-controller'
import Animated, { FadeInUp, FadeOutUp, LinearTransition, useSharedValue } from 'react-native-reanimated'
import { useConvex, useMutation } from 'convex/react'
import { GenericId } from 'convex/values'
import { api } from 'convex_api'
import * as ImagePicker from 'expo-image-picker'
import { useTranslation } from 'react-i18next'

import useStyles from './styles'
import Avatar from '@components/avatar'
import Button from '@components/button'
import Column from '@components/column'
import EmailInput, { validateEmail } from '@components/email_input'
import { IconImages } from '@components/icon'
import KeyboardCompensation from '@components/keyboard_compensation'
import OTPInput from '@components/otp_input'
import PasswordInput, { validatePassword } from '@components/password_input'
import Row from '@components/row'
import SegmentedControl from '@components/segmented_control'
import TextInput from '@components/text_input'
import Typography from '@components/typography'
import { useAuthActions } from '@convex-dev/auth/react'
import useConvexErrorHandler from '@hooks/useConvexErrorHandler'
import { useTheme } from '@providers/theme'
import { useUser } from '@providers/user'
import { ScreenType } from '@router/types'

const Auth: ScreenType<'auth'> = ({ navigation, route }) => {
  const styles = useStyles()
  const { t } = useTranslation()
  const { signIn } = useAuthActions()
  const { semantics } = useTheme()
  const { user } = useUser()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState<string>('')
  const [code, setCode] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const catchConvexError = useConvexErrorHandler()
  const updateUser = useMutation(api.user.updateUser)
  const generateUploadUrl = useMutation(api.user.generateUploadUrl)
  const [pendingImage, setPendingImage] = useState<ImagePicker.ImagePickerAsset | null>(null)
  const [pendingName, setPendingName] = useState<string>(user?.name ?? '')
  const [pendingUsername, setPendingUsername] = useState<string>(user?.username ?? '')
  const convex = useConvex()

  const [error, setError] = useState<{
    field: 'name' | 'username' | 'email' | 'password' | 'confirm_password' | 'code'
    message: string
  }>()

  const flows = {
    signIn: t('auth:sign_in'),
    signUp: t('auth:sign_up'),
  } as const

  const [flow, setFlow] = useState((route.params?.flow as string) ?? 'signIn')

  const handleSignIn = async (): Promise<void> => {
    if (!validateEmail(email.trim())) return setError({ field: 'email', message: t('auth:invalid_email') })
    if (password.trim() === '') return setError({ field: 'password', message: t('auth:invalid_password') })
    setLoading(true)
    void signIn('password', { flow, email, password })
      .then(() => navigation.pop())
      .catch(catchConvexError)
      .finally(() => setLoading(false))
  }

  const handleSignUp = async (): Promise<void> => {
    if (!validateEmail(email.trim())) return setError({ field: 'email', message: t('auth:invalid_email') })
    if (password.trim() === '' || confirmPassword.trim() === '') return setError({ field: 'password', message: t('auth:invalid_password') })
    if (!validatePassword(password, confirmPassword).passwordValid) return setError({ field: 'password', message: t('auth:invalid_password') })
    if (!validatePassword(password, confirmPassword).match) return setError({ field: 'confirm_password', message: t('auth:invalid_confirm_password') })
    setLoading(true)
    void signIn('password', { flow, email, password })
      .then(() => setFlow('email-verification'))
      .catch(catchConvexError)
      .finally(() => setLoading(false))
  }

  const handleVerify = async (): Promise<void> => {
    if (code.trim() === '' || code.trim().length < 4) return setError({ field: 'code', message: t('auth:invalid_code') })

    setLoading(true)
    void signIn('password', { flow, email, code })
      .catch(catchConvexError)
      .then(() => setFlow('details'))
      .finally(() => setLoading(false))
  }

  const handleDetails = async (): Promise<void> => {
    if (pendingName.trim() === '' || pendingName.trim().split(' ').length < 2) return setError({ field: 'name', message: t('auth:invalid_name') })

    if (pendingUsername.trim() === '') return setError({ field: 'username', message: t('auth:invalid_username') })
    if (pendingUsername.trim().length < 3) return setError({ field: 'username', message: t('auth:invalid_username_too_short') })
    if (!/^[A-Za-z]+$/.test(pendingUsername)) return setError({ field: 'username', message: t('auth:invalid_username_characters') })

    const available = await convex.query(api.user.checkUsernameAvailability, { username: pendingUsername })
    if (!available && user?.username !== pendingUsername) return setError({ field: 'username', message: t('auth:invalid_username_taken') })

    setLoading(true)
    try {
      let storageId: string | null = null

      if (pendingImage) {
        const postUrl = await generateUploadUrl()
        const uploadFileName = pendingImage.fileName ?? `image-${Date.now()}.jpg`
        const form = new FormData()

        form.append('image', {
          uri: pendingImage.uri,
          type: pendingImage.mimeType ?? 'image/jpeg',
          name: uploadFileName,
        } as unknown as Blob)

        const image = form.get('image')

        const result = await fetch(postUrl, {
          method: 'POST',
          body: image,
        })

        if (!result.ok) {
          const message = await result.text()
          throw new Error(message || `Upload failed with status ${result.status}`)
        }

        const { storageId: uploadedId } = await result.json()
        storageId = uploadedId
      }

      await updateUser({
        name: pendingName && pendingName !== user?.name ? pendingName : undefined,
        username: pendingUsername && pendingUsername !== user?.username ? pendingUsername : undefined,
        ...(storageId && { image: storageId as GenericId<'_storage'> }),
      })

      navigation.pop()
    } catch (error) {
      catchConvexError(error)
    } finally {
      setLoading(false)
    }
  }

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

  const handleChangeImage = async (): Promise<void> => {
    const pickedImage = await pickImage()
    if (pickedImage) setPendingImage(pickedImage)
  }

  const handleRemoveImage = (): void => {
    setPendingImage(null)
  }

  const errorMessage = (
    <>
      {error !== undefined && (
        <Typography
          legend
          center
          entering={FadeInUp}
          exiting={FadeOutUp}
          color={semantics.negative.foreground.default}
        >
          {error?.message}
        </Typography>
      )}
    </>
  )

  const header = (
    <>
      <View style={styles.logo}>
        <Typography
          onboardingAccent
          style={styles.logoText}
        >
          ACADEMY
        </Typography>
        <Typography>tracker</Typography>
      </View>

      <SegmentedControl
        selected={flow}
        onChange={setFlow}
        options={flows}
      />
    </>
  )

  const signInContent = (
    <>
      {header}
      <View style={styles.content}>
        <EmailInput
          value={email}
          onChangeText={setEmail}
          error={error?.field === 'email'}
        />

        <PasswordInput
          value={password}
          onChangeText={setPassword}
          error={error?.field === 'password'}
        />

        <Column middle>
          <Button
            variant="ghost"
            small
            title={t('auth:forgot_password')}
            onPress={() => {
              Alert.alert(t('overall:not_implemented'), t('overall:feature_not_implemented'))
            }}
          />

          {errorMessage}
          <Button
            variant="brand"
            loading={loading}
            title={t('auth:sign_in')}
            onPress={handleSignIn}
          />
        </Column>
      </View>
    </>
  )

  const signUpContent = (
    <>
      {header}
      <View style={styles.content}>
        <EmailInput
          value={email}
          onChangeText={setEmail}
          error={error?.field === 'email'}
        />
        <PasswordInput
          type="new_password"
          value={password}
          onChangeText={setPassword}
          error={error?.field === 'password'}
        />
        <PasswordInput
          type="confirm_password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          passwordConfirmation={password}
          error={error?.field === 'confirm_password'}
        />
        <Column middle>
          {errorMessage}

          <Button
            variant="brand"
            loading={loading}
            title={t('auth:sign_up')}
            onPress={handleSignUp}
          />
        </Column>

        <Typography
          center
          legend
          onPress={() => Linking.openURL(`${process.env.PRIVACY_POLICY_URL}`)}
        >
          {t('auth:privacy_policy')}
        </Typography>
      </View>
    </>
  )

  const verificationContent = (
    <View style={styles.content}>
      <Typography
        title
        center
      >
        {t('auth:verify')}
      </Typography>
      <OTPInput
        value={code}
        onChangeText={setCode}
      />

      <Typography
        body
        color={semantics.background.foreground.light}
        center
      >
        {t('auth:spam')}
      </Typography>

      <Column middle>
        {errorMessage}
        <Button
          loading={loading}
          title={t('auth:fill_details')}
          variant="brand"
          onPress={handleVerify}
        />
      </Column>
    </View>
  )

  const displayImage = pendingImage ? pendingImage.uri : user?.imageURL

  const detailsContent = (
    <View style={styles.content}>
      <Typography
        title
        center
      >
        {t('auth:details')}
      </Typography>
      <Column middle>
        <Avatar
          onPress={handleChangeImage}
          name={user?.name}
          image={displayImage ?? undefined}
          icon={<IconImages />}
        />

        {displayImage && (
          <Button
            onPress={handleRemoveImage}
            title={t('auth:remove')}
            variant="ghost"
          />
        )}
      </Column>
      <Column>
        <Typography legend>{t('auth:name')}</Typography>
        <TextInput
          value={pendingName}
          onChangeText={setPendingName}
          placeholder={t('auth:name')}
          error={error?.field === 'name'}
          textContentType="name"
        />
      </Column>
      <Column>
        <Typography legend>{t('auth:username')}</Typography>
        <TextInput
          value={pendingUsername}
          onChangeText={setPendingUsername}
          placeholder={t('auth:username')}
          error={error?.field === 'username'}
          textContentType="username"
        />
      </Column>

      {errorMessage}
      <Row
        center
        layout={LinearTransition}
      >
        <Button
          title={t('auth:cancel')}
          onPress={() => navigation.pop()}
        />
        <Button
          loading={loading}
          title={t('auth:save')}
          variant="brand"
          onPress={handleDetails}
        />
      </Row>
    </View>
  )

  return (
    <>
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
      >
        {flow === 'signIn' && signInContent}
        {flow === 'signUp' && signUpContent}
        {flow === 'email-verification' && verificationContent}
        {flow === 'details' && detailsContent}
        <KeyboardCompensation />
      </ScrollView>
    </>
  )
}

export default Auth
