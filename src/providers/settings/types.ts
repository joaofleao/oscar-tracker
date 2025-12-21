export interface SettingsContextType {
  spoilers: {
    hidePoster: boolean
    hideCast: boolean
    hideRate: boolean
    hidePlot: boolean
  }
  setSpoilers: (name: keyof SettingsContextType['spoilers'], value: boolean) => void
}
