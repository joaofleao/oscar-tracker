export const fonts = {
  primary: {
    black: 'Tienne-Black',
    bold: 'Tienne-Bold',
    regular: 'Tienne-Regular',
  },
  secondary: {
    black: 'Inconsolata-Black',
    bold: 'Inconsolata-Bold',
    regular: 'Inconsolata-Regular',
  },
  tertiary: {
    black: 'Inconsolata_SemiExpanded-Black',
    bold: 'Inconsolata_SemiExpanded-Bold',
    regular: 'Inconsolata_SemiExpanded-Regular',
  },
  quaternary: {
    light: 'Spartan-Light',
    bold: 'Spartan-Bold',
    regular: 'Spartan-Regular',
  },
}

export type FontsType = typeof fonts

export const fontImports = {
  'Tienne-Regular': require('@assets/fonts/Tienne-Regular.ttf'),
  'Tienne-Bold': require('@assets/fonts/Tienne-Bold.ttf'),
  'Tienne-Black': require('@assets/fonts/Tienne-Black.ttf'),

  'Inconsolata_SemiExpanded-Regular': require('@assets/fonts/Inconsolata_SemiExpanded-Regular.ttf'),
  'Inconsolata_SemiExpanded-Bold': require('@assets/fonts/Inconsolata_SemiExpanded-Bold.ttf'),
  'Inconsolata_SemiExpanded-Black': require('@assets/fonts/Inconsolata_SemiExpanded-Black.ttf'),

  'Inconsolata-Regular': require('@assets/fonts/Inconsolata-Regular.ttf'),
  'Inconsolata-Bold': require('@assets/fonts/Inconsolata-Bold.ttf'),
  'Inconsolata-Black': require('@assets/fonts/Inconsolata-Black.ttf'),

  'Spartan-Bold': require('@assets/fonts/Spartan-Bold.ttf'),
  'Spartan-Regular': require('@assets/fonts/Spartan-Regular.ttf'),
  'Spartan-Light': require('@assets/fonts/Spartan-Light.ttf'),
}
