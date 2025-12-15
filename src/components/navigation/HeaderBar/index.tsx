import { Timestamp } from '@react-native-firebase/firestore'
import { Text, View } from 'react-native'

import useStyles from './styles'
import Avatar from '@components/Avatar'
import Select from '@components/form/Select'
import Icon from '@components/Icon'
import Logo from '@components/Logo'
import ProgressBar from '@components/ProgressBar'
import { useBallots } from '@providers/ballots'
import { useEdition } from '@providers/edition'
import { useWatchedMovies } from '@providers/watchedMovies'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ScreenTypes } from '@types'
import routes from '@utils/routes'

// interface Props {}

const allEditions = [{ id: '97', name: '2025' }]

const HeaderBar = (): JSX.Element => {
  const styles = useStyles()
  // const { editionId } = useEdition()
  const navigation = useNavigation<NativeStackNavigationProp<ScreenTypes>>()

  const edition = useEdition()
  const ballots = useBallots()

  const oscarDate = edition.date.seconds * 1000
  const today = Timestamp.now().seconds * 1000
  const daysLeft = Math.ceil((oscarDate - today) / (1000 * 3600 * 24))

  const getHeader = (): React.ReactNode => {
    if (Object.entries(edition.winners).length === edition.categories.length)
      return (
        <Text style={styles.countdown}>
          You made <Text style={styles.accent}>{ballots.points}</Text> points!
        </Text>
      )
    if (daysLeft === 0)
      return (
        <Text style={styles.countdown}>
          It&apos;s <Text style={styles.accent}>today!</Text> Place your bets.
        </Text>
      )
    if (daysLeft > 0)
      return (
        <Text style={styles.countdown}>
          <Text style={styles.accent}>{daysLeft}</Text> days left
        </Text>
      )
  }

  return (
    <View style={[styles.container]}>
      {/* <Select
        small
        data={allEditions}
        placeholder="Choose Edition"
        selected={editionId}
      /> */}
      {/* <Logo /> */}
      {getHeader()}

      <Avatar
        onPress={(): void => {
          navigation.navigate(routes.profile)
        }}
      />
    </View>
  )
}

export default HeaderBar
