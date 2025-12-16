import React from 'react'
import { FlatList, ListRenderItem, Modal, Pressable, View } from 'react-native'

import useStyles from './styles'
import { SelectDropdownProps } from './types'
import { IconProps } from '@components/icon'
import Typography from '@components/typography'
import { useTheme } from '@providers/theme'

const SelectDropdown = <T,>({ label, data, onSelect, selected, visible, setVisible }: SelectDropdownProps<T>): React.ReactElement => {
  const styles = useStyles()
  const theme = useTheme()

  const renderOption: ListRenderItem<(typeof data)[number]> = ({ item }) => {
    const onItemPress = (): void => {
      onSelect(item.id)
      setVisible(false)
    }
    const highlight = selected === item.id
    return (
      <Pressable
        onPress={onItemPress}
        style={[styles.option, item.icon && styles.optionIcon, highlight && styles.optionHighlight]}
      >
        {item.icon &&
          React.cloneElement<IconProps>(item.icon, {
            color: highlight ? theme.semantics.accent.foreground.default : theme.semantics.container.foreground.default,
          })}
        <Typography
          body
          color={highlight ? theme.semantics.accent.foreground.default : theme.semantics.container.foreground.default}
        >
          {item.name}
        </Typography>
      </Pressable>
    )
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <Pressable
        style={styles.overlay}
        onPress={() => setVisible(false)}
      />

      <View style={styles.popover}>
        {label && <Typography>{label}</Typography>}
        <FlatList
          contentContainerStyle={styles.options}
          data={data}
          renderItem={renderOption}
        />
      </View>
    </Modal>
  )
}

export default SelectDropdown
