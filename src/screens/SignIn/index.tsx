import { useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

import useStyles from './styles'
import Button from '@components/Button'
import PasswordField from '@components/FormFields/PasswordField'
import TextField from '@components/FormFields/TextField'
import Global from '@components/Global'
import Header from '@components/Header'
import Icon from '@components/Icon'
import { useAuth } from '@providers/auth'
import type { SignUpProps } from '@types'
import routes from '@utils/routes'

const SignUp = ({ navigation }: SignUpProps): JSX.Element => {
  const auth = useAuth()

  const styles = useStyles()

  const poster1 = require('@assets/posters/1.jpg')
  const poster2 = require('@assets/posters/2.jpg')
  const poster3 = require('@assets/posters/3.jpg')

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const formattedEmail = email.replace(/[^a-zA-Z0-9@.]/g, '')

  const signIn = (): void => {
    setLoading(true)

    auth
      .signIn(formattedEmail, password)
      .then(() => {
        navigation.goBack()
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const signUp = (): void => {
    navigation.navigate(routes.signUp)
  }

  const forgotPassword = (): void => {
    navigation.navigate(routes.forgotPassword, { email })
  }

  return (
    <Global.Screen>
      <Header.Root>
        <Button
          onPress={navigation.goBack}
          icon={<Icon.ArrowLeft />}
          size="action"
          variant="secondary"
        />

        <Header.Title>Sign In</Header.Title>

        <Header.Placeholder />
      </Header.Root>
      <Global.Body alwaysBounceVertical={false}>
        <View style={styles.posterGroup}>
          <Image
            resizeMode="contain"
            source={poster1}
            style={styles.posterLeft}
          />
          <Image
            resizeMode="contain"
            source={poster2}
            style={styles.posterCenter}
          />
          <Image
            resizeMode="contain"
            source={poster3}
            style={styles.posterRight}
          />
        </View>

        <View style={styles.content}>
          <TextField
            placeholder="oscar@email.com"
            autoComplete="email"
            label="Email"
            value={email}
            onChangeText={setEmail}
          />

          <View>
            <PasswordField
              placeholder="● ● ● ● ● ● ● ●"
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              style={styles.forgotButton}
              onPress={forgotPassword}
            >
              <Text style={styles.forgotLabel}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              loading={loading}
              label="Sign In"
              width="fixed"
              disabled={formattedEmail === '' || password === ''}
              onPress={signIn}
            />

            <Button
              label="New here?"
              size="action"
              variant="secondary"
              onPress={signUp}
            />
          </View>
        </View>
      </Global.Body>
    </Global.Screen>
  )
}

export default SignUp
