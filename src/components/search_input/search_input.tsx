import React, { useRef } from 'react'
import { TextInput as RNTextInput } from 'react-native'

import { SearchInputProps } from './types'
import { IconMagnifyingGlass, IconX } from '@components/icon'
import TextInput from '@components/text_input'
import { useStrings } from '@providers/strings'

const SearchInput = ({ onClear, ...props }: SearchInputProps): React.ReactElement => {
  const inputRef = useRef<RNTextInput>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const { search } = useStrings()

  const handleClear = (): void => {
    inputRef.current?.clear()
    onClear?.()
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  return (
    <TextInput
      icon={<IconMagnifyingGlass />}
      ref={inputRef}
      placeholder={search.placeholder}
      button={{ icon: <IconX />, action: handleClear }}
      {...props}
    />
  )
}

export default SearchInput
