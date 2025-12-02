import { FlatList, Text, View } from 'react-native'

import NominationCard from '../NominationCard'
import useStyles from './styles'
import Button from '@components/Button'
import Global from '@components/Global'
import { useBallots } from '@providers/ballots'
import { useCategories } from '@providers/categories'
import { useEdition } from '@providers/edition'
import { useUser } from '@providers/user'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ScreenTypes } from '@types'
import routes from '@utils/routes'

interface NominationCarousselProps {
  categoryId: string
}

const NominationCaroussel = ({ categoryId }: NominationCarousselProps): JSX.Element => {
  const navigation = useNavigation<NativeStackNavigationProp<ScreenTypes>>()

  const { categories_map } = useCategories()
  const { language } = useUser()
  const { nominations, winners } = useEdition()
  const { bets } = useBallots()

  const styles = useStyles()

  const sortedData = nominations?.[categoryId]?.sort((x, y) => {
    return x.id === winners?.[x.category] ? -1 : y.id === winners?.[y.category] ? 1 : 0
  })

  const first = sortedData?.[0]?.id === bets?.[categoryId]?.first
  const second = sortedData?.[0]?.id === bets?.[categoryId]?.second

  const renderNominationCard = ({ item }): JSX.Element => {
    return (
      <NominationCard
        nomination={item}
        winnerTitle={first ? '100 points' : second ? '50 points' : '0 points'}
        winnerDescription={first ? '1st guess' : second ? '2nd guess' : undefined}
      />
    )
  }

  const handleVoteButton = (): void => {
    navigation.navigate(routes.category, { categoryId })
  }

  return (
    <View style={styles.caroussel}>
      <View style={styles.header}>
        <Text style={styles.title}>{categories_map[categoryId].name[language]}</Text>
        <Button
          label="vote"
          size="action"
          variant="secondary"
          onPress={handleVoteButton}
        />
      </View>
      <FlatList
        style={styles.list}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={sortedData}
        renderItem={renderNominationCard}
        ItemSeparatorComponent={Global.Separator}
        ListHeaderComponent={Global.Separator}
        ListFooterComponent={Global.Separator}
      />
    </View>
  )
}

export default NominationCaroussel
