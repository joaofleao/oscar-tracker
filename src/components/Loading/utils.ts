// import { AnimationObject } from 'lottie-react-native'

import { circle, confetti, dots, movie } from '@assets/animations'
import type { ThemeType } from '@types'

export const getAnimation = (animation: string) => {
  if (animation === 'movie') return movie
  if (animation === 'circle') return circle
  if (animation === 'confetti') return confetti
  return dots
}

export const getSpeed = (animation: string): number => {
  if (animation === 'movie') return 0.5
  if (animation === 'circle') return 1.5
  return 1
}

export const getColorPrimary = (type: string, disabled: boolean, theme: ThemeType): string => {
  if (type === 'primary') {
    if (disabled) return theme.colors.primary.shades.shade30
    else return theme.colors.primary.default
  }
  return theme.colors.text.inverse
}

export const getColorSecondary = (type: string, disabled: boolean, theme: ThemeType): string => {
  if (type === 'primary') {
    return theme.colors.text.inverse
  }
  if (disabled) return theme.colors.primary.shades.shade30
  return theme.colors.primary.default
}

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export const languageNames: Record<string, { 'pt-BR': string; 'en-US': string }> = {
  af: { 'pt-BR': 'Africâner', 'en-US': 'Afrikaans' },
  sq: { 'pt-BR': 'Albanês', 'en-US': 'Albanian' },
  am: { 'pt-BR': 'Amárico', 'en-US': 'Amharic' },
  ar: { 'pt-BR': 'Árabe', 'en-US': 'Arabic' },
  hy: { 'pt-BR': 'Armênio', 'en-US': 'Armenian' },
  az: { 'pt-BR': 'Azerbaijano', 'en-US': 'Azerbaijani' },
  eu: { 'pt-BR': 'Basco', 'en-US': 'Basque' },
  be: { 'pt-BR': 'Bielorrusso', 'en-US': 'Belarusian' },
  bn: { 'pt-BR': 'Bengali', 'en-US': 'Bengali' },
  bs: { 'pt-BR': 'Bósnio', 'en-US': 'Bosnian' },
  bg: { 'pt-BR': 'Búlgaro', 'en-US': 'Bulgarian' },
  my: { 'pt-BR': 'Birmanês', 'en-US': 'Burmese' },
  ca: { 'pt-BR': 'Catalão', 'en-US': 'Catalan' },
  zh: { 'pt-BR': 'Chinês', 'en-US': 'Chinese' },
  hr: { 'pt-BR': 'Croata', 'en-US': 'Croatian' },
  cs: { 'pt-BR': 'Tcheco', 'en-US': 'Czech' },
  da: { 'pt-BR': 'Dinamarquês', 'en-US': 'Danish' },
  nl: { 'pt-BR': 'Holandês', 'en-US': 'Dutch' },
  en: { 'pt-BR': 'Inglês', 'en-US': 'English' },
  et: { 'pt-BR': 'Estoniano', 'en-US': 'Estonian' },
  fi: { 'pt-BR': 'Finlandês', 'en-US': 'Finnish' },
  fr: { 'pt-BR': 'Francês', 'en-US': 'French' },
  gl: { 'pt-BR': 'Galego', 'en-US': 'Galician' },
  ka: { 'pt-BR': 'Georgiano', 'en-US': 'Georgian' },
  de: { 'pt-BR': 'Alemão', 'en-US': 'German' },
  el: { 'pt-BR': 'Grego', 'en-US': 'Greek' },
  gu: { 'pt-BR': 'Guzerate', 'en-US': 'Gujarati' },
  he: { 'pt-BR': 'Hebraico', 'en-US': 'Hebrew' },
  hi: { 'pt-BR': 'Hindi', 'en-US': 'Hindi' },
  hu: { 'pt-BR': 'Húngaro', 'en-US': 'Hungarian' },
  is: { 'pt-BR': 'Islandês', 'en-US': 'Icelandic' },
  id: { 'pt-BR': 'Indonésio', 'en-US': 'Indonesian' },
  ga: { 'pt-BR': 'Irlandês', 'en-US': 'Irish' },
  it: { 'pt-BR': 'Italiano', 'en-US': 'Italian' },
  ja: { 'pt-BR': 'Japonês', 'en-US': 'Japanese' },
  kn: { 'pt-BR': 'Canarês', 'en-US': 'Kannada' },
  kk: { 'pt-BR': 'Cazaque', 'en-US': 'Kazakh' },
  ko: { 'pt-BR': 'Coreano', 'en-US': 'Korean' },
  ky: { 'pt-BR': 'Quirguiz', 'en-US': 'Kyrgyz' },
  lo: { 'pt-BR': 'Laosiano', 'en-US': 'Lao' },
  lv: { 'pt-BR': 'Letão', 'en-US': 'Latvian' },
  lt: { 'pt-BR': 'Lituano', 'en-US': 'Lithuanian' },
  mk: { 'pt-BR': 'Macedônio', 'en-US': 'Macedonian' },
  ms: { 'pt-BR': 'Malaio', 'en-US': 'Malay' },
  ml: { 'pt-BR': 'Malaiala', 'en-US': 'Malayalam' },
  mt: { 'pt-BR': 'Maltês', 'en-US': 'Maltese' },
  mr: { 'pt-BR': 'Marata', 'en-US': 'Marathi' },
  mn: { 'pt-BR': 'Mongol', 'en-US': 'Mongolian' },
  ne: { 'pt-BR': 'Nepalês', 'en-US': 'Nepali' },
  no: { 'pt-BR': 'Norueguês', 'en-US': 'Norwegian' },
  fa: { 'pt-BR': 'Persa', 'en-US': 'Persian' },
  pl: { 'pt-BR': 'Polonês', 'en-US': 'Polish' },
  pt: { 'pt-BR': 'Português', 'en-US': 'Portuguese' },
  pa: { 'pt-BR': 'Punjabi', 'en-US': 'Punjabi' },
  ro: { 'pt-BR': 'Romeno', 'en-US': 'Romanian' },
  ru: { 'pt-BR': 'Russo', 'en-US': 'Russian' },
  sr: { 'pt-BR': 'Sérvio', 'en-US': 'Serbian' },
  si: { 'pt-BR': 'Cingalês', 'en-US': 'Sinhala' },
  sk: { 'pt-BR': 'Eslovaco', 'en-US': 'Slovak' },
  sl: { 'pt-BR': 'Esloveno', 'en-US': 'Slovenian' },
  es: { 'pt-BR': 'Espanhol', 'en-US': 'Spanish' },
  sw: { 'pt-BR': 'Suaíli', 'en-US': 'Swahili' },
  sv: { 'pt-BR': 'Sueco', 'en-US': 'Swedish' },
  ta: { 'pt-BR': 'Tâmil', 'en-US': 'Tamil' },
  te: { 'pt-BR': 'Telugu', 'en-US': 'Telugu' },
  th: { 'pt-BR': 'Tailandês', 'en-US': 'Thai' },
  tr: { 'pt-BR': 'Turco', 'en-US': 'Turkish' },
  uk: { 'pt-BR': 'Ucraniano', 'en-US': 'Ukrainian' },
  ur: { 'pt-BR': 'Urdu', 'en-US': 'Urdu' },
  uz: { 'pt-BR': 'Uzbeque', 'en-US': 'Uzbek' },
  vi: { 'pt-BR': 'Vietnamita', 'en-US': 'Vietnamese' },
  cy: { 'pt-BR': 'Galês', 'en-US': 'Welsh' },
  xh: { 'pt-BR': 'Xhosa', 'en-US': 'Xhosa' },
  zu: { 'pt-BR': 'Zulu', 'en-US': 'Zulu' },
}
