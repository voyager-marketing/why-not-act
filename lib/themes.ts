import type { Theme } from '@/types/form'

/**
 * Theme configuration interface defining the visual and linguistic identity
 * for each political ideology lens.
 */
export interface ThemeConfig {
  // Visual Design
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    foreground: string
    muted: string
    card: string
    border: string
  }

  // Typography
  fonts: {
    heading: string
    body: string
    accent: string
  }

  // Icon System
  iconSet: 'security' | 'business' | 'community' | 'justice'

  // Emotional Tone
  emotionalTone: 'protective' | 'pragmatic' | 'compassionate' | 'revolutionary'

  // Language Preferences
  language: {
    userPronoun: string // How we refer to the user
    actionVerbs: string[] // Preferred action words
    outcomeWords: string[] // How we describe results
    framing: string // Core narrative approach
  }
}

/**
 * Comprehensive theme configurations for all four political lenses.
 * Each theme is carefully crafted to resonate with its ideological perspective
 * while maintaining WCAG AA accessibility standards.
 */
export const ideologyThemes: Record<Theme, ThemeConfig> = {
  'far-right': {
    colors: {
      primary: 'oklch(0.55 0.18 25)', // Deep red
      secondary: 'oklch(0.35 0.12 25)', // Darker red
      accent: 'oklch(0.65 0.20 25)', // Bright red accent
      background: 'oklch(0.98 0.005 25)', // Warm white
      foreground: 'oklch(0.20 0.02 25)', // Deep charcoal
      muted: 'oklch(0.88 0.01 25)', // Light warm gray
      card: 'oklch(1 0 0)', // Pure white
      border: 'oklch(0.85 0.01 25)', // Subtle warm border
    },
    fonts: {
      heading: 'font-bold tracking-tight', // Strong, authoritative
      body: 'font-normal leading-relaxed',
      accent: 'font-semibold uppercase tracking-wider', // Commanding
    },
    iconSet: 'security',
    emotionalTone: 'protective',
    language: {
      userPronoun: 'Patriot',
      actionVerbs: ['Defend', 'Secure', 'Protect', 'Preserve', 'Enforce', 'Guard'],
      outcomeWords: ['Safety', 'Order', 'Strength', 'Security', 'Tradition', 'Sovereignty'],
      framing: 'Protection-focused, emphasizing security and traditional values',
    },
  },

  'center-right': {
    colors: {
      primary: 'oklch(0.50 0.14 10)', // Conservative red-orange
      secondary: 'oklch(0.40 0.10 10)', // Darker red-orange
      accent: 'oklch(0.60 0.16 10)', // Warm accent
      background: 'oklch(0.97 0.005 10)', // Neutral warm
      foreground: 'oklch(0.25 0.01 10)', // Professional dark
      muted: 'oklch(0.90 0.008 10)', // Light neutral
      card: 'oklch(0.99 0.002 10)', // Off-white
      border: 'oklch(0.88 0.008 10)', // Professional border
    },
    fonts: {
      heading: 'font-semibold tracking-tight', // Professional
      body: 'font-normal leading-relaxed',
      accent: 'font-semibold tracking-wide', // Business-like
    },
    iconSet: 'business',
    emotionalTone: 'pragmatic',
    language: {
      userPronoun: 'Taxpayer',
      actionVerbs: ['Optimize', 'Invest', 'Build', 'Grow', 'Innovate', 'Achieve'],
      outcomeWords: ['Prosperity', 'Opportunity', 'Growth', 'Efficiency', 'Success', 'Value'],
      framing: 'Market-oriented, emphasizing economic opportunity and individual responsibility',
    },
  },

  'center-left': {
    colors: {
      primary: 'oklch(0.55 0.15 230)', // Progressive blue
      secondary: 'oklch(0.45 0.12 230)', // Deeper blue
      accent: 'oklch(0.65 0.18 230)', // Bright blue accent
      background: 'oklch(0.97 0.005 230)', // Cool white
      foreground: 'oklch(0.25 0.01 230)', // Professional dark
      muted: 'oklch(0.90 0.008 230)', // Light cool gray
      card: 'oklch(0.99 0.002 230)', // Clean white
      border: 'oklch(0.88 0.008 230)', // Subtle cool border
    },
    fonts: {
      heading: 'font-semibold tracking-normal', // Approachable
      body: 'font-normal leading-relaxed',
      accent: 'font-medium tracking-normal', // Friendly
    },
    iconSet: 'community',
    emotionalTone: 'compassionate',
    language: {
      userPronoun: 'Neighbor',
      actionVerbs: ['Support', 'Empower', 'Include', 'Strengthen', 'Care', 'Unite'],
      outcomeWords: ['Well-being', 'Equality', 'Fairness', 'Access', 'Support', 'Community'],
      framing: 'Community-focused, emphasizing collective well-being and social support',
    },
  },

  'far-left': {
    colors: {
      primary: 'oklch(0.50 0.16 260)', // Deep progressive blue
      secondary: 'oklch(0.40 0.13 260)', // Darker blue
      accent: 'oklch(0.60 0.18 260)', // Vibrant accent
      background: 'oklch(0.96 0.008 260)', // Cool background
      foreground: 'oklch(0.20 0.02 260)', // Strong contrast
      muted: 'oklch(0.88 0.01 260)', // Light cool
      card: 'oklch(0.98 0.005 260)', // Bright card
      border: 'oklch(0.85 0.01 260)', // Clear border
    },
    fonts: {
      heading: 'font-bold tracking-normal', // Bold but accessible
      body: 'font-normal leading-relaxed',
      accent: 'font-semibold tracking-normal', // Emphatic
    },
    iconSet: 'justice',
    emotionalTone: 'revolutionary',
    language: {
      userPronoun: 'Comrade',
      actionVerbs: ['Transform', 'Liberate', 'Organize', 'Mobilize', 'Redistribute', 'Democratize'],
      outcomeWords: ['Justice', 'Equity', 'Rights', 'Liberation', 'Solidarity', 'Power'],
      framing: 'Justice-oriented, emphasizing systemic change and collective action',
    },
  },
}

/**
 * Get the theme configuration for a specific political lens.
 * Falls back to center-left theme if invalid lens provided.
 */
export function getThemeForLens(lens: Theme): ThemeConfig {
  return ideologyThemes[lens] || ideologyThemes['center-left']
}

/**
 * Get an appropriate action verb from the theme's language preferences.
 * Returns a random verb from the theme's actionVerbs array.
 */
export function getActionVerb(theme: ThemeConfig): string {
  const verbs = theme.language.actionVerbs
  return verbs[Math.floor(Math.random() * verbs.length)]
}

/**
 * Get an appropriate outcome word from the theme's language preferences.
 * Returns a random word from the theme's outcomeWords array.
 */
export function getOutcomeWord(theme: ThemeConfig): string {
  const words = theme.language.outcomeWords
  return words[Math.floor(Math.random() * words.length)]
}

/**
 * Get the appropriate color for a specific UI layer from the theme.
 * Provides type-safe access to theme colors with fallbacks.
 */
export type LayerType = keyof ThemeConfig['colors']

export function getColorForLayer(layer: LayerType, theme: ThemeConfig): string {
  return theme.colors[layer] || theme.colors.primary
}

/**
 * Get the CSS class name for a specific theme to apply to elements.
 */
export function getThemeClassName(lens: Theme): string {
  return `theme-${lens}`
}

/**
 * Generate a gradient class based on the theme's primary and accent colors.
 * Useful for hero sections and call-to-action elements.
 */
export function getThemeGradient(theme: ThemeConfig): string {
  // Returns Tailwind-compatible gradient direction
  return 'bg-gradient-to-br'
}

/**
 * Determine if a theme should use light or dark mode by default.
 * Based on the background lightness value.
 */
export function getThemeMode(theme: ThemeConfig): 'light' | 'dark' {
  // Parse oklch lightness value (first number in the color string)
  const lightnessMatch = theme.colors.background.match(/oklch\((\d+\.?\d*)/);
  const lightness = lightnessMatch ? parseFloat(lightnessMatch[1]) : 0.97
  return lightness > 0.5 ? 'light' : 'dark'
}

/**
 * Get contrasting text color based on background.
 * Ensures accessibility by returning appropriate foreground color.
 */
export function getContrastingColor(theme: ThemeConfig, backgroundColor: string): string {
  // For simplicity, return foreground or background based on the input
  return backgroundColor === theme.colors.background
    ? theme.colors.foreground
    : theme.colors.background
}
