import { Modal, Text, View } from 'react-native'

import useStyles from './styles'
import Loading from '@components/Loading'
import { useLoading } from '@providers/loading'

const LoadingModal = (): JSX.Element => {
  const loading = useLoading()
  const styles = useStyles()

  return (
    <Modal
      visible={loading.isActive}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.container}>
        <Loading
          animation="movie"
          size={120}
        />
        <Text style={styles.description}>{loading.text}</Text>
      </View>
    </Modal>
  )
}

export default LoadingModal
