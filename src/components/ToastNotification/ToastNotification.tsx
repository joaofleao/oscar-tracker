import { Animated, Text, View } from 'react-native'

import useStyles from './styles'
import Icon from '@components/Icon'
import { useTheme } from '@providers/theme'
import { useToast } from '@providers/toast'

const ToastNotification = (): JSX.Element => {
  const { title, description, type, position } = useToast()

  const theme = useTheme()

  const isSuccess = type === 'success'
  const styles = useStyles({ isSuccess })

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY: position }] }]}>
      {isSuccess ? (
        <Icon.CheckCircle color={theme.colors.text.default} />
      ) : (
        <Icon.AlertCircle color={theme.colors.text.default} />
      )}

      <View style={styles.informations}>
        <Text
          style={styles.title}
          numberOfLines={2}
        >
          {title}
        </Text>
        {description != null && <Text style={styles.description}>{description}</Text>}
      </View>
    </Animated.View>
  )
}

export default ToastNotification
