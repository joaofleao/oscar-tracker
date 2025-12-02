import enUS from '@translations/locales/en_US.json'

const resources = {
  ...enUS,
}

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: typeof resources
  }
  interface i18n {
    language: 'en_US' | 'pt_BR'
  }
}
