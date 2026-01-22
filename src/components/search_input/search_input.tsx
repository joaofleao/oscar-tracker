import React, { useRef } from 'react'
import { Pressable, TextInput, View } from 'react-native'

import useStyles from './styles'
import { SearchInputProps } from './types'
import { IconMagnifyingGlass, IconX } from '@components/icon'
import { useStrings } from '@providers/strings'
import { useTheme } from '@providers/theme'

const SearchInput = ({ debounce = 0, value, onChangeText, onDebouncedText, onClear, style, ...props }: SearchInputProps): React.ReactElement => {
  const inputRef = useRef<TextInput>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const styles = useStyles()
  const { semantics } = useTheme()
  const { search } = useStrings()

  const debouncer = (text: string): void => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      onDebouncedText?.(text)
    }, debounce)
  }

  const handleChangeText = (text: string): void => {
    onChangeText?.(text)
    debouncer(text)
  }

  const handleClear = (): void => {
    inputRef.current?.clear()
    onClear?.()
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  return (
    <View style={[styles.root, style]}>
      <Pressable
        onPress={() => inputRef.current?.focus()}
        style={styles.leading}
      >
        <IconMagnifyingGlass
          color={semantics.container.foreground.light}
          size={16}
        />
      </Pressable>
      <TextInput
        ref={inputRef}
        placeholder={search.placeholder}
        placeholderTextColor={semantics.container.foreground.light}
        selectionColor={semantics.container.foreground.light}
        cursorColor={semantics.container.foreground.default}
        style={styles.input}
        onChangeText={handleChangeText}
        value={value}
        {...props}
      />

      <View style={styles.divider} />
      <Pressable
        onPress={handleClear}
        style={styles.trailing}
      >
        <IconX
          color={semantics.container.foreground.default}
          size={16}
        />
      </Pressable>
    </View>
  )
}

export default SearchInput
