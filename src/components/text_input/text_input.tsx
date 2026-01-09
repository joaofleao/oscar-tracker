import React, { useRef } from 'react'
import { Pressable, TextInput as RNTextInput, View } from 'react-native'

import useStyles from './styles'
import { TextInputProps } from './types'
import { useStrings } from '@providers/strings'
import { useTheme } from '@providers/theme'

const TextInput = ({ value, button, debounce = 0, ...props }: TextInputProps): React.ReactElement => {
  const inputRef = useRef<RNTextInput>(null)
  const styles = useStyles()
  const { semantics } = useTheme()
  const { email } = useStrings()
  // const [error, setError] = useState<boolean>()

  return (
    <View style={styles.root}>
      <RNTextInput
        autoCapitalize="none"
        autoCorrect={false}
        ref={inputRef}
        placeholder={email.placeholder}
        placeholderTextColor={semantics.container.foreground.light}
        selectionColor={semantics.container.foreground.light}
        cursorColor={semantics.container.foreground.default}
        style={styles.input}
        value={value}
        {...props}
      />

      {button && (
        <>
          <View style={styles.divider} />
          <Pressable
            style={styles.trailing}
            onPress={button?.action}
          >
            {React.cloneElement(button?.icon, {
              color: semantics.container.foreground.default,
              size: 16,
              ...button?.icon.props,
            })}
          </Pressable>
        </>
      )}
      {/* {error !== undefined && (
        <Pressable
          onPress={inputRef.current?.focus}
          style={styles.trailing}
        >
          {error === false && (
            <IconAlert
              filled
              color={semantics.negative.foreground.default}
              size={16}
            />
          )}

          {error === true && (
            <IconCheckCircle
              filled
              color={semantics.positive.foreground.default}
              size={16}
            />
          )}
        </Pressable>
      )} */}
    </View>
  )
}

export default TextInput
