import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import useStyles from './styles'
import { SelectAnchorProps } from './types'
import { TinyArrow } from '@components/tiny_icon'
import Typography from '@components/typography'

const SelectAnchor = <T,>({ label, selectedOption, placeholder, disabled = false, visible, setVisible }: SelectAnchorProps<T>): React.ReactElement => {
  const styles = useStyles()

  return (
    <View style={[styles.container]}>
      <Typography numberOfLines={1}>{label}</Typography>
      <TouchableOpacity
        style={styles.content}
        onPress={() => setVisible?.(true)}
        disabled={disabled}
      >
        {selectedOption && (
          <Text
            style={[styles.item, disabled && styles.itemDisabled]}
            numberOfLines={1}
            disabled={disabled}
          >
            {selectedOption?.name}
          </Text>
        )}

        {!selectedOption && placeholder && (
          <Text
            style={styles.placeholder}
            numberOfLines={1}
          >
            {placeholder}
          </Text>
        )}

        <TinyArrow orientation={visible ? 'down' : 'default'} />
      </TouchableOpacity>
    </View>
  )
}

export default SelectAnchor
