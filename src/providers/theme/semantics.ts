import { primitives } from './primitives'

const color = (hsl: string, alpha: number): string => {
  const hslParts = hsl.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/)
  if (!hslParts) return hsl

  const h = hslParts[1]
  const s = hslParts[2]
  const l = hslParts[3]
  return `hsla(${h}, ${s}%, ${l}%, ${alpha})`
}

export const hslaToRGBa = (hsla: string): string => {
  const hslaParts = hsla.match(/hsla\((\d+),\s*(\d+)%,\s*(\d+)%,\s*([\d.]+)\)/)
  if (!hslaParts) return `rgba(0, 0, 0, 1)`

  const h = parseInt(hslaParts[1], 10) / 360
  const s = parseInt(hslaParts[2], 10) / 100
  const l = parseInt(hslaParts[3], 10) / 100
  const a = parseFloat(hslaParts[4])

  let r: number, g: number, b: number

  if (s === 0) {
    r = g = b = l
  } else {
    const hue2rgb = (p: number, q: number, t: number): number => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  return `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${a})`
}
const semantics = {
  background: {
    base: {
      default: color(primitives.neutral[0], 1),
      pressed: color(primitives.neutral[10], 1),
      tint: color(primitives.neutral[0], 0.6),
      darken: color(primitives.neutral[0], 0.8),
      gradient: [hslaToRGBa(color(primitives.neutral[0], 1)), hslaToRGBa(color(primitives.neutral[0], 0.6)), hslaToRGBa(color(primitives.neutral[0], 0.2)), hslaToRGBa(color(primitives.neutral[0], 0.0))],
    },
    foreground: {
      default: color(primitives.neutral[95], 1),
      light: color(primitives.neutral[95], 0.5),
    },
    stroke: {
      default: color(primitives.neutral[15], 1),
    },
  },

  container: {
    base: {
      default: color(primitives.neutral[5], 1),
      pressed: color(primitives.neutral[15], 1),
      tint: color(primitives.neutral[5], 0.6),
      darken: color(primitives.neutral[5], 0.8),
      gradient: [hslaToRGBa(color(primitives.neutral[5], 1)), hslaToRGBa(color(primitives.neutral[5], 0.6)), hslaToRGBa(color(primitives.neutral[5], 0.2)), hslaToRGBa(color(primitives.neutral[5], 0.0))],
    },
    foreground: {
      default: color(primitives.neutral[95], 1),
      light: color(primitives.neutral[70], 1),
    },
    stroke: {
      default: color(primitives.neutral[20], 1),
    },
  },

  accent: {
    base: {
      default: color(primitives.brand[50], 1),
      pressed: color(primitives.brand[55], 1),
      tint: color(primitives.brand[50], 0.6),
      darken: color(primitives.brand[50], 0.8),
      gradient: [hslaToRGBa(color(primitives.brand[50], 1)), hslaToRGBa(color(primitives.brand[50], 0.6)), hslaToRGBa(color(primitives.brand[50], 0.2)), hslaToRGBa(color(primitives.brand[50], 0.0))],
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
      tint: color(primitives.brand[5], 0.6),
      darken: color(primitives.brand[5], 0.8),
      gradient: [hslaToRGBa(color(primitives.brand[5], 1)), hslaToRGBa(color(primitives.brand[5], 0.6)), hslaToRGBa(color(primitives.brand[5], 0.2)), hslaToRGBa(color(primitives.brand[5], 0.0))],
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
      tint: color(primitives.vibrant.jade[5], 0.6),
      darken: color(primitives.vibrant.jade[5], 0.8),
      gradient: [hslaToRGBa(color(primitives.vibrant.jade[5], 1)), hslaToRGBa(color(primitives.vibrant.jade[5], 0.6)), hslaToRGBa(color(primitives.vibrant.jade[5], 0.2)), hslaToRGBa(color(primitives.vibrant.jade[5], 0.0))],
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
      tint: color(primitives.vibrant.ruby[5], 0.6),
      darken: color(primitives.vibrant.ruby[5], 0.8),
      gradient: [hslaToRGBa(color(primitives.vibrant.ruby[5], 1)), hslaToRGBa(color(primitives.vibrant.ruby[5], 0.6)), hslaToRGBa(color(primitives.vibrant.ruby[5], 0.2)), hslaToRGBa(color(primitives.vibrant.ruby[5], 0.0))],
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
      tint: color(primitives.vibrant.tangerine[5], 0.6),
      darken: color(primitives.vibrant.tangerine[5], 0.8),
      gradient: [hslaToRGBa(color(primitives.vibrant.tangerine[5], 1)), hslaToRGBa(color(primitives.vibrant.tangerine[5], 0.6)), hslaToRGBa(color(primitives.vibrant.tangerine[5], 0.2)), hslaToRGBa(color(primitives.vibrant.tangerine[5], 0.0))],
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
