import { FlatList, Image, ScrollView, Text, View } from 'react-native'

import useStyles from './styles'
import Button from '@components/Button'
import Global from '@components/Global'
import Header from '@components/Header'
import Icon from '@components/Icon'
import { useEdition } from '@providers/edition'
import { useUser } from '@providers/user'
import { useWatchedMovies } from '@providers/watchedMovies'
import { getImage } from '@services/tmdb/api'
import type { ProfileProps } from '@types'
import routes from '@utils/routes'

const Profile = ({ navigation }: ProfileProps): JSX.Element => {
  const { user, isLogged, language } = useUser()
  const styles = useStyles()
  const { editionWatchedMovies } = useWatchedMovies()
  const { movies } = useEdition()

  const handleEdit = (): void => {
    navigation.navigate(routes.settings)
  }

  const handleSignUp = (): void => {
    navigation.navigate(routes.signUp)
  }

  const handleSignIn = (): void => {
    navigation.navigate(routes.signIn)
  }

  const unlogged = (
    <ScrollView
      alwaysBounceVertical={false}
      style={styles.content}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.mainContent}>
        <View style={styles.smallColumn}>
          <Text style={styles.title}>Keep up with the Academy Awards</Text>
          <Text style={styles.subtitle}>
            Sign in or register to have the best possible experience on the app.
          </Text>
        </View>

        <View style={styles.row}>
          <View style={styles.card}>
            <View style={styles.iconContainer}>
              <Icon.CheckCircle />
            </View>
            <Text style={styles.feature}>Register watched movies</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.iconContainer}>
              <Icon.Lighthouse />
            </View>
            <Text style={styles.feature}>Check your friends status</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.iconContainer}>
              <Icon.Star />
            </View>
            <Text style={styles.feature}>Mark your favorites</Text>
          </View>
        </View>
      </View>

      <View style={styles.smallColumn}>
        <Button
          width="fixed"
          label="Sign in"
          variant="primary"
          onPress={handleSignIn}
        />
        <Button
          width="fixed"
          label="Sign Up"
          variant="text"
          onPress={handleSignUp}
        />
      </View>
    </ScrollView>
  )

  const logged = (
    <FlatList
      style={styles.list}
      ListHeaderComponent={
        <View style={styles.profileInfo}>
          <View style={styles.imagePlaceholder}>
            <Icon.Person
              width={32}
              height={32}
            />
          </View>
          <View style={styles.section}>
            <Text style={styles.name}>{user?.displayName}</Text>
            <Text style={styles.email}>{user?.email}</Text>
            <Text style={styles.nickname}>{user?.nickname}</Text>
          </View>

          <Text style={styles.name}>My Watched Movies</Text>
          <Global.SmallSeparator />
        </View>
      }
      ItemSeparatorComponent={Global.Separator}
      columnWrapperStyle={{ gap: 20 }}
      numColumns={3}
      data={Object.values(editionWatchedMovies)}
      renderItem={({ item }) => {
        return (
          <Image
            style={styles.image}
            source={{ uri: getImage(movies[item.movie].image[language]) }}
            resizeMode="cover"
          />
        )
      }}
    />
  )
  return (
    <Global.Screen>
      <Header.Root>
        <Button
          icon={<Icon.ArrowLeft />}
          onPress={navigation.goBack}
          size="action"
          variant="secondary"
        />
        <Header.Row />
        <Button
          icon={<Icon.Settings />}
          onPress={handleEdit}
          size="action"
          variant="secondary"
        />
      </Header.Root>

      {isLogged ? logged : unlogged}
    </Global.Screen>
  )
}

export default Profile
