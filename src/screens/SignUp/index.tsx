import { useEffect, useRef, useState } from 'react'
import { FlatList, Text, View } from 'react-native'

import useStyles from './styles'
import Button from '@components/Button'
import EmailField, { emailValidation } from '@components/FormFields/EmailField'
import PasswordField, { passwordValidation } from '@components/FormFields/PasswordField'
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

  const [index, setIndex] = useState<number>(0)

  const scrollViewRef = useRef<FlatList>(null)

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [nickname, setNickname] = useState<string>('')
  const [buttonError, setButtonError] = useState<string>('')

  const [countdown, setCountdown] = useState(0)
  const [loading, setLoading] = useState(false)

  const formattedEmail = email.replace(/[^a-zA-Z0-9@.]/g, '')

  const { passwordValid, confirmPasswordValid } = passwordValidation(password, confirmPassword)
  const nameValid =
    name.split(' ').length >= 2 && name.split(' ')[0].length > 0 && name.split(' ')[1].length > 0
  const nicknameValid = nickname.split(' ').length === 1 && nickname.split(' ')[0].length > 0

  //pages
  // 0 = email | 1 = password | 2 = name | 3 = confirm email

  const checkVerified = (): void => {
    setLoading(true)
    auth.signOut().then(() => {
      auth.signIn(email, password).then(() => {
        setLoading(false)
      })
    })
  }

  const handleSendEmail = (): void => {
    auth.verifyEmail()
    setCountdown(60)
  }

  const checkDisabledButton = (): boolean => {
    if (index === 0) return !emailValidation(email)
    if (index === 1) return !passwordValid || !confirmPasswordValid
    if (index === 3) return !nameValid || !nicknameValid
    return false
  }

  useEffect(() => {
    scrollViewRef.current?.scrollToIndex({
      index,
      animated: true,
    })
  }, [index])

  useEffect(() => {
    if (countdown > 0) {
      setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
    }
  }, [countdown])

  const pages = [
    {
      handlePrev: navigation.goBack,
      handleNext: (): void => {
        setIndex((value) => {
          return value + 1
        })
      },
      content: (
        <View style={styles.content}>
          <View style={styles.header}>
            <Global.Title>Give us your best e-mail</Global.Title>
            <Global.Description>We will send you a verification code to confirm</Global.Description>
          </View>

          <EmailField
            placeholder="steven_spielberg@oscar.com"
            value={email}
            onChangeText={setEmail}
          />
        </View>
      ),
    },

    {
      handlePrev: (): void => {
        setIndex((value) => {
          return value - 1
        })
      },
      handleNext: (): void => {
        setIndex((value) => {
          return value + 1
        })
      },
      content: (
        <View style={styles.content}>
          <View style={styles.header}>
            <Global.Title>How about some security?</Global.Title>
            <Global.Description>Make sure to use a strong password.</Global.Description>
          </View>

          <View style={styles.form}>
            <PasswordField
              value={password}
              onChangeText={setPassword}
              type="password"
            />
            <PasswordField
              passwordConfirmation={password}
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              type="confirmPassword"
            />
          </View>
        </View>
      ),
    },

    {
      handlePrev: (): void => {
        setIndex((value) => {
          return value - 1
        })
      },
      handleNext: (): void => {
        auth.signUp(formattedEmail, password).then(() => {
          handleSendEmail()
          setIndex((value) => {
            return value + 1
          })
        })
      },
      content: (
        <View style={styles.content}>
          <View style={styles.header}>
            <Global.Title>How would you like to be called?</Global.Title>
            <Global.Description>The nickname will be shown to all your friends</Global.Description>
          </View>

          <TextField
            label="Name"
            placeholder="Greta Gerwig"
            value={name}
            onChangeText={setName}
            valid={nameValid}
            errorText={'Please provide name and last name'}
          />
          <TextField
            placeholder="LadyBird"
            label="Nickname"
            value={nickname}
            onChangeText={setNickname}
            valid={nicknameValid}
            errorText={'Please provide a single nickname'}
          />
        </View>
      ),
    },

    {
      handleNext: (): void => {
        setLoading(true)
        setButtonError('')

        auth.signIn(formattedEmail, password).then(() => {
          auth
            .addUser(name, nickname)
            .then(() => {
              navigation.navigate(routes.home)
            })
            .catch(() => {
              setButtonError('Looks like you have not confirmed your email')
              setLoading(false)
            })
        })
      },
      content: (
        <View style={styles.content}>
          <View style={styles.header}>
            <Global.Title>{"Now let's verify your email"}</Global.Title>
            <Global.Description>
              Check your inbox and spam at {email} to go to the next step
            </Global.Description>
          </View>

          <View style={styles.centeredContent}>
            <Button
              width="fixed"
              label="send again"
              variant="secondary"
              loading={countdown > 0}
              disabled={countdown > 0}
              onPress={handleSendEmail}
            />
            {countdown > 0 && (
              <Text style={styles.helper}>
                Wait<Text style={styles.countdown}> {countdown} </Text>
                seconds before trying again
              </Text>
            )}
          </View>
        </View>
      ),
    },
  ]
  return (
    <Global.Screen>
      <Header.Root>
        {index === 3 ? (
          <Header.Placeholder />
        ) : (
          <Button
            onPress={pages[index].handlePrev}
            icon={<Icon.ArrowLeft />}
            size="action"
            variant="secondary"
          />
        )}

        <Header.Title>Register</Header.Title>
        <Header.Placeholder />
      </Header.Root>

      <Global.Body>
        <FlatList
          scrollEnabled={false}
          ref={scrollViewRef}
          snapToAlignment="center"
          horizontal
          data={pages}
          renderItem={({ item }): JSX.Element => {
            return item.content
          }}
          keyExtractor={(_, i): string => {
            return `${i}`
          }}
        />
      </Global.Body>

      <Global.Footer>
        {buttonError !== '' && <Text style={styles.helper}>{buttonError}</Text>}
        <Global.Row>
          <Button
            loading={loading}
            width="fit"
            label="Next"
            disabled={checkDisabledButton()}
            onPress={pages[index].handleNext}
          />
        </Global.Row>
      </Global.Footer>
    </Global.Screen>
  )
}

export default SignUp
