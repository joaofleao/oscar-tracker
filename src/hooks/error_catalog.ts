export const authErrorCatalog = {
  'invalid-credentials': {
    en_US: 'Invalid email or password.',
    pt_BR: 'Email ou senha inválidos.',
  },

  'password-missing-signup': {
    en_US: 'Password is required to sign up.',
    pt_BR: 'Senha é obrigatória para cadastro.',
  },
  'password-missing-signin': {
    en_US: 'Password is required to sign in.',
    pt_BR: 'Senha é obrigatória para login.',
  },
  'password-weak': {
    en_US: 'Password does not meet requirements.',
    pt_BR: 'Senha não atende aos requisitos.',
  },
  'reset-not-enabled': {
    en_US: 'Password reset is not enabled.',
    pt_BR: 'Recuperação de senha não está habilitada.',
  },
  'verify-not-enabled': {
    en_US: 'Email verification is not enabled.',
    pt_BR: 'Verificação de email não está habilitada.',
  },
  'new-password-missing': {
    en_US: 'New password is required to reset.',
    pt_BR: 'Nova senha é obrigatória para redefinir.',
  },
  'invalid-reset-code': {
    en_US: 'Invalid verification code.',
    pt_BR: 'Código de verificação inválido.',
  },
  'flow-invalid': {
    en_US: 'Missing or invalid authentication flow.',
    pt_BR: 'Fluxo de autenticação ausente ou inválido.',
  },
  'auth-generic': {
    en_US: 'Authentication failed.',
    pt_BR: 'Falha na autenticação.',
  },

  'invalid-email': {
    en_US: 'Account not found.',
    pt_BR: 'Conta não encontrada.',
  },
  'invalid-password': {
    en_US: 'Incorrect password.',
    pt_BR: 'Senha incorreta.',
  },
} as const

export type AuthErrorCode = keyof typeof authErrorCatalog

export function getAuthErrorMessage(code: AuthErrorCode, locale: 'en_US' | 'pt_BR' = 'en_US'): string {
  return authErrorCatalog[code][locale]
}
