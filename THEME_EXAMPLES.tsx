/**
 * THEME SYSTEM USAGE EXAMPLES
 *
 * This file contains practical examples of how to use the ideology-based
 * theme system throughout the WhyNotAct application.
 *
 * These are demonstration components showing best practices.
 */

'use client'

import { useTheme, useRequiredTheme, useThemeColor, useThemeFonts } from '@/hooks/useTheme'
import { getIconForAction, getTopicIcon, getResultIcon, getIconSize } from '@/lib/iconMappings'
import { getThemeForLens, getActionVerb, getOutcomeWord } from '@/lib/themes'
import type { Theme } from '@/types/form'

// ============================================================================
// EXAMPLE 1: Basic Theme Usage
// ============================================================================

export function BasicThemedComponent() {
  const { theme, themeConfig, iconSet, language, isThemed } = useTheme()

  if (!isThemed) {
    return (
      <div className="p-4 text-center">
        <p>Please select your political lens to continue</p>
      </div>
    )
  }

  return (
    <div className="p-6 bg-card text-card-foreground rounded-lg border border-border">
      <h2 className={themeConfig?.fonts.heading}>
        Welcome, {language.userPronoun}!
      </h2>
      <p className="mt-2">
        You are viewing through the <strong>{theme}</strong> lens
      </p>
      <p className="text-sm text-muted-foreground mt-1">
        Icon set: {iconSet}
      </p>
    </div>
  )
}

// ============================================================================
// EXAMPLE 2: Action Button with Theme-Appropriate Icon and Language
// ============================================================================

export function ThemedActionButton() {
  const { iconSet, language } = useTheme()

  // Get the primary action icon for this ideology
  const ActionIcon = getIconForAction('primary', iconSet)

  // Get a random action verb from the theme
  const actionVerb = language.actionVerbs[0]

  return (
    <button className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
      <ActionIcon className={getIconSize('md')} />
      <span className="font-semibold">{actionVerb} Now</span>
    </button>
  )
}

// ============================================================================
// EXAMPLE 3: Success Message with Theme-Appropriate Language
// ============================================================================

export function ThemedSuccessMessage() {
  const { iconSet, language } = useTheme()

  const SuccessIcon = getIconForAction('success', iconSet)
  const outcomeWord = language.outcomeWords[0]

  return (
    <div className="flex items-start gap-3 p-4 bg-accent/10 border border-accent rounded-lg">
      <SuccessIcon className={`${getIconSize('lg')} text-accent flex-shrink-0`} />
      <div>
        <h3 className="font-semibold text-accent-foreground">
          Action Taken Successfully!
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Your contribution will help achieve {outcomeWord.toLowerCase()} in your community.
        </p>
      </div>
    </div>
  )
}

// ============================================================================
// EXAMPLE 4: Topic Card with Dynamic Icon
// ============================================================================

interface TopicCardProps {
  topic: string
  description: string
}

export function ThemedTopicCard({ topic, description }: TopicCardProps) {
  const { language } = useTheme()
  const fonts = useThemeFonts()

  const TopicIcon = getTopicIcon(topic)

  return (
    <div className="p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <TopicIcon className={`${getIconSize('lg')} text-primary`} />
        </div>
        <h3 className={fonts.heading}>{topic}</h3>
      </div>
      <p className="text-muted-foreground text-sm">{description}</p>
      <div className="mt-4">
        <span className="text-xs text-primary font-medium uppercase tracking-wider">
          {language.framing}
        </span>
      </div>
    </div>
  )
}

// ============================================================================
// EXAMPLE 5: Navigation with Theme Icons
// ============================================================================

export function ThemedNavigation() {
  const { iconSet } = useTheme()

  const NavigationIcon = getIconForAction('navigation', iconSet)

  const steps = ['Select Lens', 'Answer Questions', 'View Results', 'Take Action']

  return (
    <nav className="flex items-center gap-2 text-sm">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center gap-2">
          <span className={index === 2 ? 'text-foreground font-semibold' : 'text-muted-foreground'}>
            {step}
          </span>
          {index < steps.length - 1 && (
            <NavigationIcon className={`${getIconSize('sm')} text-muted-foreground`} />
          )}
        </div>
      ))}
    </nav>
  )
}

// ============================================================================
// EXAMPLE 6: Result Card with Themed Icon and Language
// ============================================================================

interface ResultCardProps {
  resultType: 'revenue' | 'economic' | 'security' | 'demographic'
  title: string
  description: string
}

export function ThemedResultCard({ resultType, title, description }: ResultCardProps) {
  const { language } = useTheme()
  const fonts = useThemeFonts()

  const ResultIcon = getResultIcon(resultType)
  const outcomeWords = language.outcomeWords

  return (
    <article className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-primary rounded-lg">
          <ResultIcon className={`${getIconSize('xl')} text-primary-foreground`} />
        </div>
        <div className="flex-1">
          <h2 className={`${fonts.heading} text-xl mb-2`}>{title}</h2>
          <p className="text-muted-foreground mb-4">{description}</p>
          <div className="flex flex-wrap gap-2">
            {outcomeWords.slice(0, 3).map((word) => (
              <span
                key={word}
                className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium"
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}

// ============================================================================
// EXAMPLE 7: Alert with Theme-Appropriate Styling
// ============================================================================

type AlertVariant = 'info' | 'alert' | 'success'

interface ThemedAlertProps {
  variant: AlertVariant
  title: string
  message: string
}

export function ThemedAlert({ variant, title, message }: ThemedAlertProps) {
  const { iconSet } = useTheme()

  const iconMapping: Record<AlertVariant, ReturnType<typeof getIconForAction>> = {
    info: getIconForAction('info', iconSet),
    alert: getIconForAction('alert', iconSet),
    success: getIconForAction('success', iconSet),
  }

  const Icon = iconMapping[variant]

  const variantStyles = {
    info: 'bg-primary/10 border-primary/20 text-primary',
    alert: 'bg-destructive/10 border-destructive/20 text-destructive',
    success: 'bg-accent/10 border-accent/20 text-accent',
  }

  return (
    <div className={`flex gap-3 p-4 rounded-lg border ${variantStyles[variant]}`}>
      <Icon className={`${getIconSize('md')} flex-shrink-0 mt-0.5`} />
      <div>
        <h4 className="font-semibold mb-1">{title}</h4>
        <p className="text-sm opacity-90">{message}</p>
      </div>
    </div>
  )
}

// ============================================================================
// EXAMPLE 8: Theme Selector (for onboarding/settings)
// ============================================================================

import { useFormStore } from '@/lib/formStore'
import { getThemeIcon } from '@/lib/iconMappings'

const themeData: Array<{
  value: Theme
  label: string
  description: string
}> = [
  {
    value: 'far-right',
    label: 'Far Right',
    description: 'Security and tradition focused',
  },
  {
    value: 'center-right',
    label: 'Center Right',
    description: 'Market and opportunity focused',
  },
  {
    value: 'center-left',
    label: 'Center Left',
    description: 'Community and support focused',
  },
  {
    value: 'far-left',
    label: 'Far Left',
    description: 'Justice and equity focused',
  },
]

export function ThemeSelector() {
  const { theme, setTheme } = useFormStore()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {themeData.map((themeOption) => {
        const ThemeIcon = getThemeIcon(themeOption.value)
        const isSelected = theme === themeOption.value

        return (
          <button
            key={themeOption.value}
            onClick={() => setTheme(themeOption.value)}
            className={`
              p-6 rounded-lg border-2 text-left transition-all
              ${
                isSelected
                  ? 'border-primary bg-primary/5 shadow-lg scale-105'
                  : 'border-border hover:border-primary/50 hover:shadow-md'
              }
            `}
          >
            <div className="flex items-center gap-3 mb-2">
              <ThemeIcon className={getIconSize('lg')} />
              <h3 className="font-semibold text-lg">{themeOption.label}</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              {themeOption.description}
            </p>
            {isSelected && (
              <div className="mt-3 text-xs text-primary font-medium">
                Currently selected
              </div>
            )}
          </button>
        )
      })}
    </div>
  )
}

// ============================================================================
// EXAMPLE 9: Dynamic Greeting Based on Theme
// ============================================================================

export function ThemedGreeting({ userName }: { userName?: string }) {
  const { language, emotionalTone } = useTheme()

  const greetings = {
    protective: `${language.userPronoun}, your voice matters in defending our values.`,
    pragmatic: `${language.userPronoun}, let's build opportunities together.`,
    compassionate: `${language.userPronoun}, your community needs you.`,
    revolutionary: `${language.userPronoun}, together we can transform society.`,
  }

  return (
    <div className="text-center py-8">
      {userName && (
        <h1 className="text-3xl font-bold mb-2">Welcome back, {userName}</h1>
      )}
      <p className="text-lg text-muted-foreground">
        {greetings[emotionalTone]}
      </p>
    </div>
  )
}

// ============================================================================
// EXAMPLE 10: Progress Indicator with Theme Colors
// ============================================================================

interface ThemedProgressProps {
  current: number
  total: number
  label?: string
}

export function ThemedProgress({ current, total, label }: ThemedProgressProps) {
  const { language } = useTheme()
  const primaryColor = useThemeColor('primary')

  const percentage = (current / total) * 100

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex justify-between text-sm">
          <span className="font-medium">{label}</span>
          <span className="text-muted-foreground">
            {current} of {total}
          </span>
        </div>
      )}
      <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-xs text-center text-muted-foreground">
        You're making progress toward {language.outcomeWords[0].toLowerCase()}
      </p>
    </div>
  )
}
