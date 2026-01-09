import { primitives } from './primitives'

const color = (hsl: string, alpha: number): string => {
  const hslParts = hsl.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/)
  if (!hslParts) return hsl

  const h = hslParts[1]
  const s = hslParts[2]
  const l = hslParts[3]
  return `hsla(${h}, ${s}%, ${l}%, ${alpha})`
}

const semantics = {
  background: {
    base: {
      default: '#000',
      inverse: color(primitives.neutral[95], 1),
      tint: color('hsl(0, 0%, 0%)', 0.7),
    },
    foreground: {
      default: color(primitives.neutral[95], 1),
      light: color(primitives.neutral[95], 0.5),
      inverse: color(primitives.neutral[5], 1),
    },
    stroke: {
      default: color(primitives.neutral[15], 1),
    },
  },

  container: {
    base: {
      original: color(primitives.neutral[5], 1),
      default: color(primitives.neutral[5], 0.7),
      pressed: color(primitives.neutral[15], 0.7),
    },
    foreground: {
      default: color(primitives.neutral[95], 1),
      light: color(primitives.neutral[70], 1),
      inverse: color(primitives.neutral[5], 1),
    },
    stroke: {
      default: color(primitives.neutral[20], 1),
    },
  },

  accent: {
    base: {
      default: color(primitives.brand[50], 1),
      pressed: color(primitives.brand[55], 1),
    },
    foreground: {
      default: color(primitives.neutral[5], 1),
      light: color(primitives.neutral[30], 1),
    },
    stroke: {
      default: color(primitives.brand[10], 1),
    },
  },

  brand: {
    base: {
      default: color(primitives.brand[5], 1),
      pressed: color(primitives.brand[10], 1),
    },
    foreground: {
      default: color(primitives.brand[60], 1),
      light: color(primitives.brand[40], 1),
    },
    stroke: {
      default: color(primitives.brand[20], 1),
    },
  },
  positive: {
    base: {
      default: color(primitives.vibrant.jade[5], 1),
      pressed: color(primitives.vibrant.jade[10], 1),
    },
    foreground: {
      default: color(primitives.vibrant.jade[60], 1),
      light: color(primitives.vibrant.jade[40], 1),
    },
    stroke: {
      default: color(primitives.vibrant.jade[20], 1),
    },
  },
  negative: {
    base: {
      default: color(primitives.vibrant.ruby[5], 1),
      pressed: color(primitives.vibrant.ruby[10], 1),
    },
    foreground: {
      default: color(primitives.vibrant.ruby[60], 1),
      light: color(primitives.vibrant.ruby[40], 1),
    },
    stroke: {
      default: color(primitives.vibrant.ruby[20], 1),
    },
  },
  caution: {
    base: {
      default: color(primitives.vibrant.tangerine[5], 1),
      pressed: color(primitives.vibrant.tangerine[10], 1),
    },
    foreground: {
      default: color(primitives.vibrant.tangerine[60], 1),
      light: color(primitives.vibrant.tangerine[40], 1),
    },
    stroke: {
      default: color(primitives.vibrant.tangerine[20], 1),
    },
  },
}

export { semantics }
export type SemanticsType = typeof semantics
