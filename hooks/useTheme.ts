'use client'

import { useEffect, useMemo } from 'react'
import { useFormStore } from '@/lib/formStore'
import { getThemeForLens, getThemeClassName, type ThemeConfig } from '@/lib/themes'
import type { Theme } from '@/types/form'

/**
 * Custom hook for managing ideology-based theming.
 *
 * This hook:
 * - Reads the current political lens from the form store
 * - Returns the appropriate theme configuration
 * - Applies the theme class to the document root for CSS variable application
 * - Memoizes theme calculations for performance
 *
 * @returns Object containing theme config and theme metadata
 */
export function useTheme() {
  // Get the current theme/lens from the store
  const theme = useFormStore((state) => state.theme)

  // Memoize the theme configuration to avoid unnecessary recalculations
  const themeConfig = useMemo<ThemeConfig | null>(() => {
    if (!theme) return null
    return getThemeForLens(theme)
  }, [theme])

  // Apply theme class to document root for CSS variable cascade
  useEffect(() => {
    if (!theme) return

    const themeClassName = getThemeClassName(theme)
    const root = document.documentElement

    // Remove all existing theme classes
    root.classList.remove(
      'theme-far-right',
      'theme-center-right',
      'theme-center-left',
      'theme-far-left'
    )

    // Add the new theme class
    root.classList.add(themeClassName)

    // Cleanup function to remove theme class on unmount
    return () => {
      root.classList.remove(themeClassName)
    }
  }, [theme])

  return {
    /** The current political lens/theme selected by the user */
    theme,

    /** Complete theme configuration including colors, fonts, icons, and language */
    themeConfig,

    /** Icon set identifier for the current theme */
    iconSet: themeConfig?.iconSet || 'community',

    /** Emotional tone descriptor */
    emotionalTone: themeConfig?.emotionalTone || 'compassionate',

    /** Language preferences for the current theme */
    language: themeConfig?.language || {
      userPronoun: 'Citizen',
      actionVerbs: ['Act', 'Engage', 'Participate'],
      outcomeWords: ['Impact', 'Change', 'Results'],
      framing: 'Citizen-focused, emphasizing engagement and participation',
    },

    /** Whether a theme is currently active */
    isThemed: !!theme,

    /** CSS class name for the current theme */
    themeClassName: theme ? getThemeClassName(theme) : '',
  }
}

/**
 * Hook variant that requires a theme to be set.
 * Throws an error if no theme is available.
 * Use this when theme is required for the component to function.
 *
 * @throws Error if no theme is set
 * @returns Object containing theme config and theme metadata (never null)
 */
export function useRequiredTheme() {
  const themeData = useTheme()

  if (!themeData.theme || !themeData.themeConfig) {
    throw new Error(
      'useRequiredTheme must be used in a context where a theme is set. ' +
      'Use useTheme() if theme might be null, or ensure theme is set before rendering.'
    )
  }

  return {
    theme: themeData.theme as Theme,
    themeConfig: themeData.themeConfig as ThemeConfig,
    iconSet: themeData.iconSet,
    emotionalTone: themeData.emotionalTone,
    language: themeData.language,
    themeClassName: themeData.themeClassName,
  }
}

/**
 * Hook to get a specific color from the current theme.
 * Returns null if no theme is set.
 *
 * @param colorKey - The color key to retrieve from theme config
 * @returns The color value or null
 */
export function useThemeColor(colorKey: keyof ThemeConfig['colors']) {
  const { themeConfig } = useTheme()

  return useMemo(() => {
    if (!themeConfig) return null
    return themeConfig.colors[colorKey]
  }, [themeConfig, colorKey])
}

/**
 * Hook to get typography configuration from the current theme.
 * Returns default font config if no theme is set.
 *
 * @returns Font configuration object
 */
export function useThemeFonts() {
  const { themeConfig } = useTheme()

  return useMemo(() => {
    if (!themeConfig) {
      return {
        heading: 'font-semibold tracking-normal',
        body: 'font-normal leading-relaxed',
        accent: 'font-medium tracking-normal',
      }
    }
    return themeConfig.fonts
  }, [themeConfig])
}

/**
 * Hook to get language/messaging configuration from the current theme.
 * Returns default language config if no theme is set.
 *
 * @returns Language configuration object
 */
export function useThemeLanguage() {
  const { themeConfig } = useTheme()

  return useMemo(() => {
    if (!themeConfig) {
      return {
        userPronoun: 'Citizen',
        actionVerbs: ['Act', 'Engage', 'Participate'],
        outcomeWords: ['Impact', 'Change', 'Results'],
        framing: 'Citizen-focused, emphasizing engagement and participation',
      }
    }
    return themeConfig.language
  }, [themeConfig])
}
