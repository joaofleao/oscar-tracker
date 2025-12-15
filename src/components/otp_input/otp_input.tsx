import React from 'react'
import { Platform, Pressable, Text, TextInput, View } from 'react-native'

import useStyles from './styles'
import { OtpInputProps } from './types'

const OtpInput = ({ value, maxLength = 4, type = 'numeric', style, ref, ...props }: OtpInputProps): React.ReactElement => {
  const styles = useStyles()

  const inputRef = React.useRef<TextInput>(null)

  return (
    <View style={styles.container}>
      {Array(maxLength)
        .fill(0)
        .map((_, index) => {
          return (
            <Pressable
              key={index}
              style={styles.codeContainer}
              onPress={inputRef.current?.focus}
            >
              <Text style={styles.codeText}>{value?.[index]}</Text>
            </Pressable>
          )
        })}

      <TextInput
        autoFocus={true}
        value={value}
        maxLength={maxLength}
        inputMode={type === 'numeric' ? type : 'text'}
        textContentType="oneTimeCode"
        ref={inputRef}
        autoComplete={Platform.OS === 'android' ? 'sms-otp' : 'one-time-code'}
        caretHidden={Platform.OS === 'ios'}
        style={[styles.hiddenInput, style]}
        {...props}
      />
    </View>
  )
}
export default OtpInput
