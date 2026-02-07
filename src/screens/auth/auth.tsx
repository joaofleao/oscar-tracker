import { useEffect, useState } from 'react'
import { Alert, Linking, Platform, ScrollView, View } from 'react-native'
import { FadeInUp, FadeOutUp, LinearTransition } from 'react-native-reanimated'
import { useConvex, useConvexAuth, useMutation } from 'convex/react'
import { GenericId } from 'convex/values'
import { api } from 'convex_api'
import * as ImagePicker from 'expo-image-picker'
import { useTranslation } from 'react-i18next'

import useStyles from './styles'
import Avatar from '@components/avatar'
import Button from '@components/button'
import Column from '@components/column'
import EmailInput from '@components/email_input'
import { IconImages } from '@components/icon'
import OTPInput from '@components/otp_input'
import PasswordInput from '@components/password_input'
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
    field: 'name' | 'username'
    message: string
  }>()

  const flows = {
    signIn: t('auth:sign_in'),
    signUp: t('auth:sign_up'),
  } as const

  const [flow, setFlow] = useState((route.params?.flow as string) ?? 'signIn')

  const handleSignUp = async (): Promise<void> => {
    setLoading(true)
    void signIn('password', {
      flow,
      email,
      password,
    })
      .then(() => {
        setFlow('email-verification')
      })
      .catch(catchConvexError)
      .finally(() => setLoading(false))
  }

  const handleSignIn = async (): Promise<void> => {
    setLoading(true)
    void signIn('password', {
      flow,
      email,
      password,
    })
      .then(() => {
        navigation.pop()
      })
      .catch(catchConvexError)
      .finally(() => setLoading(false))
  }

  const handleVerify = async (): Promise<void> => {
    setLoading(true)
    void signIn('password', {
      flow,
      email,
      code,
    })
      .catch(catchConvexError)
      .then(() => {
        setFlow('details')
      })
      .finally(() => setLoading(false))
  }

  const handleDetails = async (): Promise<void> => {
    if (pendingName.trim() === '') return setError({ field: 'name', message: t('auth:name_mandatory') })
    if (pendingName.trim().split(' ').length < 2) return setError({ field: 'name', message: t('auth:name_invalid') })

    if (pendingUsername.trim() === '') return setError({ field: 'username', message: t('auth:username_mandatory') })
    if (pendingUsername.trim().length < 3) return setError({ field: 'username', message: t('auth:username_too_short') })
    if (!/^[A-Za-z]+$/.test(pendingUsername)) return setError({ field: 'username', message: t('auth:username_invalid_chars') })

    // const useQuery(api.user.checkUsernameAvailability, { username: pendingUsername ?? undefined })
    const available = await convex.query(api.user.checkUsernameAvailability, { username: pendingUsername })
    if (!available && user?.username !== pendingUsername) return setError({ field: 'username', message: t('auth:username_taken') })

    setLoading(true)
    try {
      let storageId: string | null = null

      if (pendingImage) {
        const postUrl = await generateUploadUrl()
        const result = await fetch(postUrl, {
          method: 'POST',
          body: pendingImage as unknown as Blob,
        })
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

    if (pickedImage) {
      setPendingImage(pickedImage)
    }
  }

  const handleRemoveImage = (): void => {
    setPendingImage(null)
  }

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
        />

        <PasswordInput
          value={password}
          onChangeText={setPassword}
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

          <Button
            variant="brand"
            disabled={email.length === 0 || password.length === 0}
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
        />
        <PasswordInput
          type="new_password"
          value={password}
          onChangeText={setPassword}
        />
        <PasswordInput
          type="confirm_password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          passwordConfirmation={password}
        />
        <Row center>
          <Button
            variant="brand"
            disabled={email.length === 0 || password.length === 0 || password !== confirmPassword}
            loading={loading}
            title={t('auth:sign_up')}
            onPress={handleSignUp}
          />
        </Row>

        <Typography
          description
          center
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

      <Row center>
        <Button
          loading={loading}
          title={t('auth:fill_details')}
          variant="brand"
          onPress={handleVerify}
        />
      </Row>
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
        {Platform.OS === 'ios' && (
          <Avatar
            onPress={handleChangeImage}
            name={user?.name}
            image={displayImage ?? undefined}
            icon={<IconImages />}
          />
        )}
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
    <ScrollView
      keyboardShouldPersistTaps="always"
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
    >
      {flow === 'signIn' && signInContent}
      {flow === 'signUp' && signUpContent}
      {flow === 'email-verification' && verificationContent}
      {flow === 'details' && detailsContent}
    </ScrollView>
  )
}

export default Auth
