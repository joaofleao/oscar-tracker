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

const allEditions = [
  { id: '97', name: '2025' },
  // { id: '96', name: '2024' },
  // { id: '95', name: '2023' },
  // { id: '94', name: '2022', disabled: true },
  // { id: '93', name: '2021', disabled: true },
  // { id: '92', name: '2020', disabled: true },
  // { id: '91', name: '2019', disabled: true },
  // { id: '90', name: '2018', disabled: true },
  // { id: '89', name: '2017', disabled: true },
  // { id: '88', name: '2016', disabled: true },
  // { id: '87', name: '2015', disabled: true },
  // { id: '86', name: '2014', disabled: true },
  // { id: '85', name: '2013', disabled: true },
  // { id: '84', name: '2012', disabled: true },
  // { id: '83', name: '2011', disabled: true },
  // { id: '82', name: '2010', disabled: true },
  // { id: '81', name: '2009', disabled: true },
  // { id: '80', name: '2008', disabled: true },
  // { id: '79', name: '2007', disabled: true },
  // { id: '78', name: '2006', disabled: true },
  // { id: '77', name: '2005', disabled: true },
  // { id: '76', name: '2004', disabled: true },
  // { id: '75', name: '2003', disabled: true },
  // { id: '74', name: '2002', disabled: true },
  // { id: '73', name: '2001', disabled: true },
  // { id: '72', name: '2000', disabled: true },
  // { id: '71', name: '1999', disabled: true },
  // { id: '70', name: '1998', disabled: true },
  // { id: '69', name: '1997', disabled: true },
  // { id: '68', name: '1996', disabled: true },
  // { id: '67', name: '1995', disabled: true },
  // { id: '66', name: '1994', disabled: true },
  // { id: '65', name: '1993', disabled: true },
  // { id: '64', name: '1992', disabled: true },
  // { id: '63', name: '1991', disabled: true },
  // { id: '62', name: '1990', disabled: true },
  // { id: '61', name: '1989', disabled: true },
  // { id: '60', name: '1988', disabled: true },
  // { id: '59', name: '1987', disabled: true },
  // { id: '58', name: '1986', disabled: true },
  // { id: '57', name: '1985', disabled: true },
  // { id: '56', name: '1984', disabled: true },
  // { id: '55', name: '1983', disabled: true },
  // { id: '54', name: '1982', disabled: true },
  // { id: '53', name: '1981', disabled: true },
  // { id: '52', name: '1980', disabled: true },
  // { id: '51', name: '1979', disabled: true },
  // { id: '50', name: '1978', disabled: true },
  // { id: '49', name: '1977', disabled: true },
  // { id: '48', name: '1976', disabled: true },
  // { id: '47', name: '1975', disabled: true },
  // { id: '46', name: '1974', disabled: true },
  // { id: '45', name: '1973', disabled: true },
  // { id: '44', name: '1972', disabled: true },
  // { id: '43', name: '1971', disabled: true },
  // { id: '42', name: '1970', disabled: true },
  // { id: '41', name: '1969', disabled: true },
  // { id: '40', name: '1968', disabled: true },
  // { id: '39', name: '1967', disabled: true },
  // { id: '38', name: '1966', disabled: true },
  // { id: '37', name: '1965', disabled: true },
  // { id: '36', name: '1964', disabled: true },
  // { id: '35', name: '1963', disabled: true },
  // { id: '34', name: '1962', disabled: true },
  // { id: '33', name: '1961', disabled: true },
  // { id: '32', name: '1960', disabled: true },
  // { id: '31', name: '1959', disabled: true },
  // { id: '30', name: '1958', disabled: true },
  // { id: '29', name: '1957', disabled: true },
  // { id: '28', name: '1956', disabled: true },
  // { id: '27', name: '1955', disabled: true },
  // { id: '26', name: '1954', disabled: true },
  // { id: '25', name: '1953', disabled: true },
  // { id: '24', name: '1952', disabled: true },
  // { id: '23', name: '1951', disabled: true },
  // { id: '22', name: '1950', disabled: true },
  // { id: '21', name: '1949', disabled: true },
  // { id: '20', name: '1948', disabled: true },
  // { id: '19', name: '1947', disabled: true },
  // { id: '18', name: '1946', disabled: true },
  // { id: '17', name: '1945', disabled: true },
  // { id: '16', name: '1944', disabled: true },
  // { id: '15', name: '1943', disabled: true },
  // { id: '14', name: '1942', disabled: true },
  // { id: '13', name: '1941', disabled: true },
  // { id: '12', name: '1940', disabled: true },
  // { id: '11', name: '1939', disabled: true },
  // { id: '10', name: '1938', disabled: true },
  // { id: '9', name: '1937', disabled: true },
  // { id: '8', name: '1936', disabled: true },
  // { id: '7', name: '1935', disabled: true },
  // { id: '6', name: '1934', disabled: true },
  // { id: '5', name: '1933', disabled: true },
  // { id: '4', name: '1932', disabled: true },
  // { id: '3', name: '1931', disabled: true },
  // { id: '2', name: '1930', disabled: true },
  // { id: '1', name: '1929', disabled: true },
]

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
