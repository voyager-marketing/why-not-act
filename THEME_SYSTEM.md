# WhyNotAct Ideology-Based Theme System

## Overview

The WhyNotAct platform features a comprehensive ideology-based theme system that adapts the entire user experience based on the selected political lens. This system goes beyond simple color changes to include typography, iconography, emotional tone, and even language patterns that resonate with different political perspectives.

## Architecture

### Core Files

1. **`lib/themes.ts`** - Theme configuration and utilities
2. **`lib/iconMappings.ts`** - Icon sets for each ideology
3. **`app/globals.css`** - CSS variables and theme classes
4. **`hooks/useTheme.ts`** - React hooks for theme management

## Theme Configurations

### Far-Right Theme
**Icon Set:** Security
**Emotional Tone:** Protective
**Color Palette:** Deep reds with warm undertones
**User Pronoun:** "Patriot"

**Language:**
- Action Verbs: Defend, Secure, Protect, Preserve, Enforce, Guard
- Outcome Words: Safety, Order, Strength, Security, Tradition, Sovereignty
- Framing: Protection-focused, emphasizing security and traditional values

**Colors (OKLCH):**
- Primary: `oklch(0.55 0.18 25)` - Deep red
- Secondary: `oklch(0.35 0.12 25)` - Darker red
- Accent: `oklch(0.65 0.20 25)` - Bright red
- Background: `oklch(0.98 0.005 25)` - Warm white

### Mid-Right Theme
**Icon Set:** Business
**Emotional Tone:** Pragmatic
**Color Palette:** Conservative red-orange tones
**User Pronoun:** "Taxpayer"

**Language:**
- Action Verbs: Optimize, Invest, Build, Grow, Innovate, Achieve
- Outcome Words: Prosperity, Opportunity, Growth, Efficiency, Success, Value
- Framing: Market-oriented, emphasizing economic opportunity

**Colors (OKLCH):**
- Primary: `oklch(0.50 0.14 10)` - Conservative red-orange
- Secondary: `oklch(0.40 0.10 10)` - Darker red-orange
- Accent: `oklch(0.60 0.16 10)` - Warm accent
- Background: `oklch(0.97 0.005 10)` - Neutral warm

### Mid-Left Theme
**Icon Set:** Community
**Emotional Tone:** Compassionate
**Color Palette:** Progressive blue tones
**User Pronoun:** "Neighbor"

**Language:**
- Action Verbs: Support, Empower, Include, Strengthen, Care, Unite
- Outcome Words: Well-being, Equality, Fairness, Access, Support, Community
- Framing: Community-focused, emphasizing collective well-being

**Colors (OKLCH):**
- Primary: `oklch(0.55 0.15 230)` - Progressive blue
- Secondary: `oklch(0.45 0.12 230)` - Deeper blue
- Accent: `oklch(0.65 0.18 230)` - Bright blue
- Background: `oklch(0.97 0.005 230)` - Cool white

### Far-Left Theme
**Icon Set:** Justice
**Emotional Tone:** Revolutionary
**Color Palette:** Deep progressive blue tones
**User Pronoun:** "Comrade"

**Language:**
- Action Verbs: Transform, Liberate, Organize, Mobilize, Redistribute, Democratize
- Outcome Words: Justice, Equity, Rights, Liberation, Solidarity, Power
- Framing: Justice-oriented, emphasizing systemic change

**Colors (OKLCH):**
- Primary: `oklch(0.50 0.16 260)` - Deep progressive blue
- Secondary: `oklch(0.40 0.13 260)` - Darker blue
- Accent: `oklch(0.60 0.18 260)` - Vibrant accent
- Background: `oklch(0.96 0.008 260)` - Cool background

## Icon System

### Icon Sets by Ideology

#### Security Set (Far-Right)
- Primary: Shield
- Secondary: Flag
- Alert: AlertTriangle
- Success: ShieldCheck
- Info: Eye
- Navigation: ArrowRight
- Value: Lock
- Outcome: UserCheck

#### Business Set (Mid-Right)
- Primary: TrendingUp
- Secondary: Briefcase
- Alert: AlertTriangle
- Success: CheckCircle
- Info: Info
- Navigation: ChevronRight
- Value: Scale
- Outcome: LineChart

#### Community Set (Mid-Left)
- Primary: Users
- Secondary: Home
- Alert: Info
- Success: Heart
- Info: Sparkles
- Navigation: ArrowRight
- Value: HandHeart
- Outcome: Gift

#### Justice Set (Far-Left)
- Primary: Megaphone
- Secondary: Gavel
- Alert: AlertTriangle
- Success: Award
- Info: Compass
- Navigation: Zap
- Value: Equal
- Outcome: ScaleJustice

## Usage Examples

### Basic Theme Hook Usage

```typescript
import { useTheme } from '@/hooks/useTheme'

export function MyComponent() {
  const { theme, themeConfig, iconSet, language } = useTheme()

  if (!theme) {
    return <div>Please select a political lens first</div>
  }

  return (
    <div>
      <h1>Hello, {language.userPronoun}!</h1>
      <p>Current theme: {theme}</p>
      <p>Icon set: {iconSet}</p>
    </div>
  )
}
```

### Using Required Theme Hook

```typescript
import { useRequiredTheme } from '@/hooks/useTheme'

// This component should only render when theme is set
export function ThemedContent() {
  const { theme, themeConfig, language } = useRequiredTheme()

  return (
    <div>
      <h1 className={themeConfig.fonts.heading}>
        {language.userPronoun}, let's {language.actionVerbs[0]}!
      </h1>
    </div>
  )
}
```

### Using Theme Colors

```typescript
import { useThemeColor } from '@/hooks/useTheme'

export function ColoredBox() {
  const primaryColor = useThemeColor('primary')

  return (
    <div style={{ backgroundColor: primaryColor }}>
      Themed box
    </div>
  )
}
```

### Getting Icons from Theme

```typescript
import { useTheme } from '@/hooks/useTheme'
import { getIconForAction } from '@/lib/iconMappings'

export function ActionButton() {
  const { iconSet, language } = useTheme()

  const Icon = getIconForAction('primary', iconSet)
  const actionVerb = language.actionVerbs[0]

  return (
    <button className="flex items-center gap-2">
      <Icon className="w-5 h-5" />
      {actionVerb} Now
    </button>
  )
}
```

### Using Theme Utility Functions

```typescript
import { getThemeForLens, getActionVerb, getColorForLayer } from '@/lib/themes'
import type { Theme } from '@/types/form'

// Get theme config
const theme = 'far-right' as Theme
const config = getThemeForLens(theme)

// Get a random action verb
const verb = getActionVerb(config)
console.log(verb) // "Defend", "Secure", etc.

// Get specific color
const primary = getColorForLayer('primary', config)
```

### Getting Topic or Result Icons

```typescript
import { getTopicIcon, getResultIcon, getThemeIcon } from '@/lib/iconMappings'

// Get icon for a topic
const SecurityIcon = getTopicIcon('security')

// Get icon for a result type
const RevenueIcon = getResultIcon('revenue')

// Get icon for theme selection UI
const FarRightIcon = getThemeIcon('far-right')

function TopicCard({ topic }: { topic: string }) {
  const Icon = getTopicIcon(topic)

  return (
    <div className="flex items-center gap-2">
      <Icon className="w-6 h-6" />
      <h3>{topic}</h3>
    </div>
  )
}
```

### Dynamic Icon Sizing

```typescript
import { getIconSize, type IconSize } from '@/lib/iconMappings'
import { Shield } from 'lucide-react'

function ScalableIcon({ size = 'md' }: { size?: IconSize }) {
  return <Shield className={getIconSize(size)} />
}

// Usage
<ScalableIcon size="xs" /> // w-3 h-3
<ScalableIcon size="lg" /> // w-6 h-6
<ScalableIcon size="3xl" /> // w-12 h-12
```

## CSS Variable System

All theme classes expose standard CSS variables that work with Tailwind utilities:

- `--primary` / `--primary-foreground`
- `--secondary` / `--secondary-foreground`
- `--accent` / `--accent-foreground`
- `--background` / `--foreground`
- `--muted` / `--muted-foreground`
- `--card` / `--card-foreground`
- `--border`
- `--ring`

These automatically update when theme classes are applied, enabling smooth transitions.

### Direct CSS Usage

```css
.my-themed-element {
  background-color: var(--primary);
  color: var(--primary-foreground);
  border: 1px solid var(--border);
}
```

### Tailwind Class Usage

```tsx
<div className="bg-primary text-primary-foreground border border-border">
  Automatically themed content
</div>
```

## Accessibility

All theme color combinations meet WCAG AA standards for:
- Normal text (4.5:1 contrast ratio)
- Large text (3:1 contrast ratio)
- UI components (3:1 contrast ratio)

The OKLCH color space ensures:
- Perceptually uniform color transitions
- Better gradient quality
- Consistent lightness across hues

## Dark Mode Support

Each theme has dark mode variants that maintain the ideological color identity while adapting to dark backgrounds. Dark mode is automatically applied when the `.dark` class is present on the document root.

## Best Practices

1. **Always use the theme hooks** - Don't access the form store directly for theme data
2. **Use icon mappings** - Don't hardcode icons; use the appropriate icon set
3. **Leverage language config** - Use theme-appropriate verbs and outcome words
4. **Test all themes** - Ensure components work well with all four ideologies
5. **Maintain accessibility** - Always check contrast ratios when customizing
6. **Use CSS variables** - Let the theme system handle color management

## Theme Transitions

Theme changes are smooth and animated with 300ms transitions for:
- Background colors
- Text colors
- Border colors

This is handled automatically by the CSS in `globals.css`.

## Type Safety

All theme-related code is fully typed:
- `Theme` type for lens values
- `ThemeConfig` interface for configuration
- `IconSet` type for icon families
- `ActionCategory` type for icon purposes
- `LayerType` type for color layers

## Testing Themes

To test different themes during development:

```typescript
import { useFormStore } from '@/lib/formStore'

// In a component or console
const { setTheme } = useFormStore.getState()

// Test different themes
setTheme('far-right')
setTheme('mid-right')
setTheme('mid-left')
setTheme('far-left')
```

## Future Enhancements

Potential additions to the theme system:
- User preference persistence for dark mode per theme
- Custom theme creation/mixing
- Animation preferences per ideology
- Sound effects aligned with emotional tone
- Micro-interactions tailored to each lens
