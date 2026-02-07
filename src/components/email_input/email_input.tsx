import React from 'react'

import { EmailInputProps } from './types'
import { IconEmail } from '@components/icon'
import TextInput from '@components/text_input'
import { useStrings } from '@providers/strings'

export const validateEmail = (value: string): boolean => {
  const emailValid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)
  return emailValid
}

const EmailInput = ({ ...props }: EmailInputProps): React.ReactElement => {
  const { email } = useStrings()

  return (
    <TextInput
      icon={<IconEmail />}
      keyboardType="email-address"
      textContentType="emailAddress"
      autoComplete="email"
      autoCapitalize="none"
      autoCorrect={false}
      placeholder={email.placeholder}
      {...props}
    />
  )
}

export default EmailInput
