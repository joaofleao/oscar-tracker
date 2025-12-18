import { useState } from 'react'
import { Alert, Linking, View } from 'react-native'
import { useTranslation } from 'react-i18next'

import useStyles from './styles'
import Button from '@components/button'
import EmailInput from '@components/email_input'
import { TextLogo, TriangleLogo } from '@components/logo'
import OTPInput from '@components/otp_input'
import PasswordInput from '@components/password_input'
import Row from '@components/row'
import SegmentedControl from '@components/segmented_control'
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

  const [loading, setLoading] = useState<'email'>()
  const [email, setEmail] = useState<string>('')
  const [code, setCode] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const catchConvexError = useConvexErrorHandler()

  const flows = {
    signIn: t('auth:sign_in'),
    signUp: t('auth:sign_up'),
  } as const

  const [flow, setFlow] = useState('signIn')

  const handleSignUp = async (): Promise<void> => {
    setLoading('email')
    void signIn('password', {
      flow,
      email,
      password,
    })
      .then(() => {
        setFlow('email-verification')
      })
      .catch(catchConvexError)
      .finally(() => setLoading(undefined))
  }

  const handleSignIn = async (): Promise<void> => {
    setLoading('email')
    void signIn('password', {
      flow,
      email,
      password,
    })
      .then(() => {
        navigation.pop()
      })
      .catch(catchConvexError)
      .finally(() => setLoading(undefined))
  }

  const handleVerify = async (): Promise<void> => {
    setLoading('email')
    void signIn('password', {
      flow,
      email,
      code,
    })
      .catch(catchConvexError)
      .then(() => {
        navigation.pop()
      })
      .finally(() => setLoading(undefined))
  }

  const signInContent = (
    <>
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
            title={t('auth:forgot_password')}
            onPress={() => {
              Alert.alert(t('overall:not_implemented'), t('overall:feature_not_implemented'))
            }}
          />

          <Button
            disabled={email.length === 0 || password.length === 0}
            loading={loading === 'email'}
            title={t('auth:sign_in')}
            onPress={handleSignIn}
          />
        </View>
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
          loading={loading === 'email'}
          title={t('auth:sign_in')}
          variant="accent"
          onPress={handleVerify}
        />
      </Row>
    </View>
  )

  const signUpContent = (
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
          disabled={email.length === 0 || password.length === 0 || password !== confirmPassword}
          loading={loading === 'email'}
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
  )

  return (
    <View style={styles.root}>
      <TriangleLogo
        color={semantics.accent.base.default}
        opacity={0.3}
      />

      <View style={styles.logo}>
        <TextLogo size={140} />
        <Typography>tracker</Typography>
      </View>

      <SegmentedControl
        selected={flow}
        onChange={setFlow}
        options={flows}
      />

      {flow === 'signIn' && signInContent}
      {flow === 'signUp' && signUpContent}
      {flow === 'email-verification' && verificationContent}
    </View>
  )
}

export default Auth
