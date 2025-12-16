import { useState } from 'react'
import { Text, View } from 'react-native'

import useStyles from './styles'
import Button from '@components/Button'
import Select from '@components/form/Select'
import TextField from '@components/FormFields/TextField'
import Toggle from '@components/FormFields/Toggle'
import Global from '@components/Global'
import Header from '@components/Header'
import Icon from '@components/Icon'
import { useAuth } from '@providers/auth'
import { useEdition } from '@providers/edition'
import { useUser } from '@providers/user'
import packageJson from '@package.json'
import type { SettingsProps } from '@types'
import routes from '@utils/routes'

const Settings = ({ navigation }: SettingsProps): JSX.Element => {
  const auth = useAuth()
  const {
    adminMode,
    setAdminMode,
    user,
    isLogged,
    setLanguage,
    language,
    preferences,
    setPreferences,
  } = useUser()
  const { refreshEdition } = useEdition()
  const styles = useStyles()
  const [loading, setLoading] = useState<boolean>(false)

  const handleSignOut = (): void => {
    setLoading(true)
    auth
      .signOut()
      .then(() => {
        navigation.navigate(routes.home)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Global.Screen>
      <Header.Root>
        <Button
          icon={<Icon.ArrowLeft />}
          onPress={navigation.goBack}
          size="action"
          variant="secondary"
        />
        <Header.Row>
          <Header.Title>Settings</Header.Title>
        </Header.Row>
        <Header.Placeholder />
      </Header.Root>

      <Global.Body>
        {isLogged && (
          <View style={styles.section}>
            <Global.Description>Personal Information</Global.Description>

            <TextField
              editable={false}
              label="Name"
              placeholder="Walt Disney"
              value={user.displayName}
            />
            <TextField
              editable={false}
              placeholder="mickey_mouse"
              label="Nickname"
              value={user.nickname}
            />

            <TextField
              editable={false}
              label="Email"
              value={user?.email}
            />
          </View>
        )}

        <View style={styles.section}>
          <View style={styles.item}>
            <Global.Description>Spoiler Preferences</Global.Description>
            <Button
              label="Quiz"
              size="action"
              variant="secondary"
              onPress={(): void => {
                return navigation.navigate(routes.preferences)
              }}
            />
          </View>

          <Toggle
            label="Hide Posters"
            selected={!preferences.poster}
            onToggle={(): void => {
              setPreferences((old) => {
                return { ...old, poster: !preferences.poster }
              })
            }}
          />

          <Toggle
            label="Hide Plot"
            selected={!preferences.plot}
            onToggle={(): void => {
              setPreferences((old) => {
                return { ...old, plot: !preferences.plot }
              })
            }}
          />

          <Toggle
            label="Hide Cast"
            selected={!preferences.cast}
            onToggle={(): void => {
              setPreferences((old) => {
                return { ...old, cast: !preferences.cast }
              })
            }}
          />

          <Toggle
            label="Hide Ratings"
            selected={!preferences.ratings}
            onToggle={(): void => {
              setPreferences((old) => {
                return { ...old, ratings: !preferences.ratings }
              })
            }}
          />
        </View>

        <View style={styles.section}>
          <Global.Description>System Settings</Global.Description>

          {/* <Toggle
            disabled
            label="Dark Mode"
            selected={user?.settings.darkMode}
            onToggle={(): void => {
              updateUser({
                settings: {
                  ...user?.settings,
                  darkMode: !user?.settings.darkMode,
                },
              })
            }}
          /> */}

          <Text
            style={styles.label}
            numberOfLines={1}
          >
            Language
          </Text>
          <Select
            data={[
              { id: 'pt-BR' as const, name: 'Português' },
              { id: 'en-US' as const, name: 'Inglês' },
            ]}
            placeholder="Português"
            selected={language}
            onSelect={setLanguage}
          />
        </View>
        {user.admin && (
          <Toggle
            label="Admin Mode"
            selected={adminMode}
            onToggle={(): void => {
              setAdminMode((old) => {
                return !old
              })
            }}
          />
        )}
        <View style={styles.item}>
          <Global.Description>App Version</Global.Description>
          <Text style={styles.accentText}>{packageJson.version}</Text>
        </View>

        <View style={styles.bottom}>
          {isLogged && (
            <Button
              loading={loading}
              width="fixed"
              size="action"
              label="Log Out"
              variant="tertiary"
              onPress={handleSignOut}
            />
          )}

          <Button
            size="action"
            variant="tertiary"
            onPress={refreshEdition}
            label={'UPDATE'}
          />
        </View>
      </Global.Body>
    </Global.Screen>
  )
}

export default Settings
