import React from 'react'
import {
  Animated,
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  Text,
  View,
  ViewStyle,
} from 'react-native'

import useStyles from './styles'
import Label from '@components/form/Label'
import Global from '@components/Global'
import Icon from '@components/Icon'
import { useTheme } from '@providers/theme'

export type SelectItem<T> = {
  name: string
  id: T
  [key: string]: unknown
  disabled?: boolean
}

export interface SelectProps<T> {
  data: SelectItem<T>[]
  onSelect?: React.Dispatch<T>
  selected?: T
  label?: string
  placeholder?: string
  disabled?: boolean
  style?: ViewStyle
  small?: boolean
}

const defaultProps: Partial<SelectProps<unknown>> = {
  disabled: false,
  small: false,
}

const Select = <T,>(props: SelectProps<T>): JSX.Element => {
  const { style, small, label, data, onSelect, selected, placeholder, disabled, ...rest } = {
    ...defaultProps,
    ...props,
  }

  const window = Dimensions.get('window')

  const [visible, setVisible] = React.useState(false)
  const animation = React.useRef(new Animated.Value(0)).current

  const styles = useStyles({ small, disabled })
  const theme = useTheme()

  const offset = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, window.height / 2],
  })

  const toggleDropdown = (): void => {
    Animated.timing(animation, {
      duration: 200,
      toValue: visible ? 1 : 0,
      useNativeDriver: true,
    }).start()

    setTimeout(
      () => {
        setVisible((prev) => {
          return !prev
        })
      },
      visible ? 200 : 0,
    )
  }

  const onItemPress = (item): void => {
    onSelect?.(item.id)
    toggleDropdown()
  }

  const renderItem = ({ item }): JSX.Element => {
    return (
      <Pressable
        disabled={item.disabled}
        style={[
          styles.itemContainer,
          selected === item.id && styles.selectedItemContainer,
          item.disabled && styles.disabledItemContainer,
        ]}
        id={item.id}
        onPress={(): void => {
          return onItemPress(item)
        }}
      >
        <Text
          style={[
            styles.item,
            selected === item.id && styles.itemSelected,
            item.disabled && styles.itemDisabled,
          ]}
        >
          {item.name}
        </Text>
      </Pressable>
    )
  }

  const renderDropdown = (): JSX.Element => {
    return (
      <Modal
        visible={visible}
        transparent
        animationType="fade"
      >
        <Pressable
          style={styles.overlay}
          onPress={toggleDropdown}
        />

        <Animated.View style={[styles.dropdown, { transform: [{ translateY: offset }] }]}>
          {label && (
            <Label
              numberOfLines={1}
              accent
            >
              {label}
            </Label>
          )}
          <FlatList
            data={data}
            ItemSeparatorComponent={Global.Separator}
            renderItem={renderItem}
          />
        </Animated.View>
      </Modal>
    )
  }

  return (
    <>
      <View
        style={[style, styles.container]}
        {...rest}
      >
        {label && (
          <Label
            numberOfLines={1}
            accent={false}
          >
            {label}
          </Label>
        )}
        <Pressable
          style={styles.content}
          onPress={toggleDropdown}
          disabled={disabled}
        >
          {selected ? (
            <Text
              style={[styles.item, disabled && styles.itemDisabled]}
              numberOfLines={1}
            >
              {
                data.find((item) => {
                  return item.id === selected
                })?.name
              }
            </Text>
          ) : (
            <Text
              style={styles.placeholder}
              numberOfLines={1}
            >
              {placeholder}
            </Text>
          )}

          <Icon.ArrowLeft
            color={disabled ? theme.colors.text.light : theme.colors.primary.default}
            style={{ transform: [{ rotate: '-90deg' }] }}
            width={16}
            height={16}
          />
        </Pressable>
      </View>
      {renderDropdown()}
    </>
  )
}

export default Select
