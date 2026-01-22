import { useEffect, useState } from 'react'
import { Alert, Linking, View } from 'react-native'
import { FadeIn, FadeOut } from 'react-native-reanimated'
import { useMutation, useQuery } from 'convex/react'
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
import { usePreventRemove } from '@react-navigation/native'
import { ScreenType } from '@router/types'

const Auth: ScreenType<'auth'> = ({ navigation, route }) => {
  const styles = useStyles()
  const { t } = useTranslation()
  const [name, setName] = useState<string>('')
  const [username, setUsername] = useState<string>('')
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
  const usernameAvailable = useQuery(api.user.checkUsernameAvailability, { username })
  const [loadingUsername, setLoadingUsername] = useState(false)
  const [nameValid, setNameValid] = useState<boolean>()

  useEffect(() => {
    if (usernameAvailable !== undefined) {
      setLoadingUsername(false)
    }
  }, [usernameAvailable, username])

  const flows = {
    signIn: t('auth:sign_in'),
    signUp: t('auth:sign_up'),
  } as const

  const [flow, setFlow] = useState((route.params?.flow as string) ?? 'signIn')

  // usePreventRemove(flow === 'email-verification' || flow === 'details', ({ data }) => {})

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
    updateUser({ name, username })
      .then(() => {
        navigation.pop()
      })
      .catch(catchConvexError)
      .finally(() => {
        setLoading(false)
      })
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
      const postUrl = await generateUploadUrl()
      const result = await fetch(postUrl, {
        method: 'POST',
        body: pickedImage as unknown as Blob,
      })
      const { storageId } = await result.json()
      await updateUser({ image: storageId }).catch(catchConvexError)
    }
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
        <View style={styles.buttons}>
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
        </View>
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
          image={user?.imageURL ?? undefined}
          icon={<IconImages />}
        />
        {user?.imageURL && (
          <Button
            onPress={() => updateUser({ image: null }).catch(catchConvexError)}
            title={t('auth:remove')}
            variant="ghost"
          />
        )}
      </Column>

      <Column trailing>
        <TextInput
          defaultValue={user?.name}
          onChangeText={(text) => {
            if (text.trim() === '') setNameValid(undefined)
          }}
          onDebouncedText={(text) => {
            if (text.trim() === '') return setNameValid(undefined)
            const isValid = text.trim().split(' ').length >= 2
            setNameValid(isValid)
            setName(text.trim())
          }}
          debounce={1000}
          placeholder={t('auth:name')}
          error={nameValid !== undefined && nameValid === false}
          success={nameValid !== undefined && nameValid === true}
        />

        {nameValid !== undefined && (
          <Typography
            legend
            entering={FadeIn}
            exiting={FadeOut}
            color={semantics[nameValid === false ? 'negative' : 'positive'].foreground.default}
          >
            {nameValid === false ? t('auth:name_invalid') : t('auth:name_valid')}
          </Typography>
        )}
      </Column>

      <Column trailing>
        <TextInput
          defaultValue={user?.username}
          onChangeText={() => {
            setLoadingUsername(true)
          }}
          onDebouncedText={setUsername}
          debounce={2000}
          placeholder={t('auth:username')}
          loading={loadingUsername}
          error={!loadingUsername && usernameAvailable !== null && usernameAvailable === false}
          success={!loadingUsername && usernameAvailable !== null && usernameAvailable === true}
        />

        {!loadingUsername && usernameAvailable !== null && (
          <Typography
            legend
            entering={FadeIn}
            exiting={FadeOut}
            color={semantics[usernameAvailable === false ? 'negative' : 'positive'].foreground.default}
          >
            {usernameAvailable === false ? t('auth:username_invalid') : t('auth:username_valid')}
          </Typography>
        )}
      </Column>

      <Row center>
        <Button
          disabled={loadingUsername || !nameValid || usernameAvailable !== true}
          loading={loading}
          title={t('auth:save')}
          variant="brand"
          onPress={handleDetails}
        />
      </Row>
    </View>
  )

  return (
    <View style={styles.root}>
      {flow === 'signIn' && signInContent}
      {flow === 'signUp' && signUpContent}
      {flow === 'email-verification' && verificationContent}
      {flow === 'details' && detailsContent}
    </View>
  )
}

export default Auth
