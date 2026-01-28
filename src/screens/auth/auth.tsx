import { useEffect, useState } from 'react'
import { Alert, Linking, ScrollView, View } from 'react-native'
import { FadeInLeft, FadeOut } from 'react-native-reanimated'
import { useMutation, useQuery } from 'convex/react'
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
import { ScreenType } from '@router/types'

const Auth: ScreenType<'auth'> = ({ navigation, route }) => {
  const styles = useStyles()
  const { t } = useTranslation()
  const { signIn } = useAuthActions()
  const { semantics } = useTheme()
  const user = useQuery(api.user.getCurrentUser)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState<string>('')
  const [code, setCode] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const catchConvexError = useConvexErrorHandler()
  const updateUser = useMutation(api.user.updateUser)
  const generateUploadUrl = useMutation(api.user.generateUploadUrl)
  const [pendingName, setPendingName] = useState<string | null>(null)
  const [pendingUsername, setPendingUsername] = useState<string | null>(null)
  const [loadingUsername, setLoadingUsername] = useState(false)
  const [pendingImage, setPendingImage] = useState<ImagePicker.ImagePickerAsset | null>(null)
  const usernameAvailable = useQuery(api.user.checkUsernameAvailability, { username: pendingUsername ?? undefined })
  const usernameValid = usernameAvailable
  const nameValid = pendingName !== null ? pendingName.trim().split(' ').length >= 2 : null

  useEffect(() => {
    if (usernameAvailable !== undefined) {
      setLoadingUsername(false)
    }
  }, [usernameAvailable, pendingUsername])

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
    setLoading(true)
    try {
      let storageId: string | null = null

      // Upload image if one was selected
      if (pendingImage) {
        const postUrl = await generateUploadUrl()
        const result = await fetch(postUrl, {
          method: 'POST',
          body: pendingImage as unknown as Blob,
        })
        const { storageId: uploadedId } = await result.json()
        storageId = uploadedId
      }

      // Update user with all details
      await updateUser({
        name: pendingName ?? undefined,
        // username,
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
      <Column trailing>
        <TextInput
          defaultValue={user?.name}
          onDebouncedText={(text) => {
            if (text.trim() !== '') setPendingName(text)
          }}
          debounce={1000}
          placeholder={t('auth:name')}
          error={nameValid === false}
          success={nameValid === true}
        />

        {nameValid !== undefined && nameValid === false && (
          <Typography
            legend
            entering={FadeInLeft}
            exiting={FadeOut}
            color={semantics.negative.foreground.default}
          >
            {t('auth:name_invalid')}
          </Typography>
        )}
        {nameValid !== undefined && nameValid === true && (
          <Typography
            legend
            entering={FadeInLeft}
            exiting={FadeOut}
            color={semantics.positive.foreground.default}
          >
            {t('auth:name_valid')}
          </Typography>
        )}
      </Column>
      <Column trailing>
        <TextInput
          textContentType="username"
          defaultValue={user?.username}
          onChangeText={(text) => {
            setLoadingUsername(true)
          }}
          onDebouncedText={(text) => {
            if (text.trim() !== '') setPendingUsername(text)
          }}
          debounce={2000}
          placeholder={t('auth:username')}
          loading={loadingUsername}
          error={!loadingUsername && usernameValid === false}
          success={!loadingUsername && usernameValid === true}
        />

        {!loadingUsername && usernameValid !== undefined && usernameValid === false && (
          <Typography
            legend
            entering={FadeInLeft}
            exiting={FadeOut}
            color={semantics.negative.foreground.default}
          >
            {t('auth:username_invalid')}
          </Typography>
        )}
        {!loadingUsername && usernameValid !== undefined && usernameValid === true && (
          <Typography
            legend
            entering={FadeInLeft}
            exiting={FadeOut}
            color={semantics.positive.foreground.default}
          >
            {t('auth:username_valid')}
          </Typography>
        )}
      </Column>

      <Row center>
        <Button
          title={t('auth:cancel')}
          onPress={() => navigation.pop()}
        />
        <Button
          disabled={!(nameValid === true && usernameValid === true) && loadingUsername}
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
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
      alwaysBounceVertical={false}
    >
      {flow === 'signIn' && signInContent}
      {flow === 'signUp' && signUpContent}
      {flow === 'email-verification' && verificationContent}
      {flow === 'details' && detailsContent}
    </ScrollView>
  )
}

export default Auth
