/**
 * Icon mappings for different ideological themes.
 * Each icon set is carefully chosen to align with the values and messaging
 * of its corresponding political lens.
 *
 * All icons are from lucide-react for consistency.
 */

import {
  // Security Set (far-right)
  Shield,
  Flag,
  Lock,
  Eye,
  AlertTriangle,
  ShieldCheck,
  UserCheck,

  // Business Set (center-right)
  Scale,
  Handshake,
  TrendingUp,
  DollarSign,
  Building,
  Briefcase,
  LineChart,

  // Community Set (center-left)
  Users,
  Home,
  Heart,
  Sparkles,
  Gift,
  HandHeart,
  UsersRound,

  // Justice Set (far-left)
  Megaphone,
  Equal,
  Award,
  Compass,
  Scale as ScaleJustice,
  Gavel,
  Zap,

  // Common/Shared Icons
  CheckCircle,
  XCircle,
  Info,
  ArrowRight,
  ChevronRight,
  Star,
  type LucideIcon,
} from 'lucide-react'

/**
 * Icon set type definition
 */
export type IconSet = 'security' | 'business' | 'community' | 'justice'

/**
 * Action categories that need icons
 */
export type ActionCategory =
  | 'primary' // Main action icon
  | 'secondary' // Secondary action icon
  | 'alert' // Warning or attention
  | 'success' // Positive outcome
  | 'info' // Information
  | 'navigation' // Direction/movement
  | 'value' // Core value representation
  | 'outcome' // Result/achievement

/**
 * Comprehensive icon mappings for each ideological theme set.
 */
export const iconMappings: Record<IconSet, Record<ActionCategory, LucideIcon>> = {
  security: {
    primary: Shield,
    secondary: Flag,
    alert: AlertTriangle,
    success: ShieldCheck,
    info: Eye,
    navigation: ArrowRight,
    value: Lock,
    outcome: UserCheck,
  },

  business: {
    primary: TrendingUp,
    secondary: Briefcase,
    alert: AlertTriangle,
    success: CheckCircle,
    info: Info,
    navigation: ChevronRight,
    value: Scale,
    outcome: LineChart,
  },

  community: {
    primary: Users,
    secondary: Home,
    alert: Info,
    success: Heart,
    info: Sparkles,
    navigation: ArrowRight,
    value: HandHeart,
    outcome: Gift,
  },

  justice: {
    primary: Megaphone,
    secondary: Gavel,
    alert: AlertTriangle,
    success: Award,
    info: Compass,
    navigation: Zap,
    value: Equal,
    outcome: ScaleJustice,
  },
}

/**
 * Get an icon component for a specific action and icon set.
 * Returns the appropriate lucide-react icon component.
 *
 * @param actionCategory - The type of action needing an icon
 * @param iconSet - The ideological icon set to use
 * @returns LucideIcon component
 */
export function getIconForAction(
  actionCategory: ActionCategory,
  iconSet: IconSet
): LucideIcon {
  return iconMappings[iconSet][actionCategory]
}

/**
 * Specific icon mappings for common UI elements.
 * These provide semantic meaning across all themes.
 */
export const commonIcons = {
  // Answer types
  yes: CheckCircle,
  no: XCircle,
  maybe: Info,

  // Navigation
  forward: ArrowRight,
  next: ChevronRight,

  // Feedback
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,

  // Values
  star: Star,
}

/**
 * Get icon for answer type (yes/no/maybe).
 * This is consistent across all themes for clarity.
 *
 * @param answer - The answer type
 * @returns LucideIcon component
 */
export function getAnswerIcon(answer: 'yes' | 'no' | 'maybe'): LucideIcon {
  return commonIcons[answer]
}

/**
 * Icon size presets for consistent sizing across the application.
 */
export const iconSizes = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8',
  '2xl': 'w-10 h-10',
  '3xl': 'w-12 h-12',
} as const

export type IconSize = keyof typeof iconSizes

/**
 * Get the CSS class string for an icon size.
 *
 * @param size - The desired icon size
 * @returns Tailwind CSS class string
 */
export function getIconSize(size: IconSize = 'md'): string {
  return iconSizes[size]
}

/**
 * Specialized icon sets for different content types.
 * These map to specific use cases in the application.
 */
export const contentIconSets = {
  // Question topics
  topics: {
    security: Shield,
    economy: DollarSign,
    social: Users,
    governance: Building,
    justice: ScaleJustice,
    community: Home,
    environment: Sparkles,
    rights: Equal,
  },

  // Result types
  results: {
    revenue: DollarSign,
    economic: TrendingUp,
    security: Shield,
    demographic: Users,
  },

  // Theme indicators (for theme selection UI)
  themes: {
    'far-right': Shield,
    'center-right': Briefcase,
    'center-left': Users,
    'far-left': Megaphone,
  },
}

/**
 * Get an icon for a specific topic.
 * Falls back to Info icon if topic not found.
 *
 * @param topic - The topic identifier
 * @returns LucideIcon component
 */
export function getTopicIcon(topic: string): LucideIcon {
  const normalizedTopic = topic.toLowerCase().replace(/\s+/g, '')

  // Try to find a matching topic icon
  for (const [key, icon] of Object.entries(contentIconSets.topics)) {
    if (normalizedTopic.includes(key.toLowerCase())) {
      return icon
    }
  }

  // Fallback
  return Info
}

/**
 * Get an icon for a result type.
 *
 * @param resultType - The result type identifier
 * @returns LucideIcon component
 */
export function getResultIcon(resultType: 'revenue' | 'economic' | 'security' | 'demographic'): LucideIcon {
  return contentIconSets.results[resultType]
}

/**
 * Get an icon for a theme (for theme selection UI).
 *
 * @param theme - The theme identifier
 * @returns LucideIcon component
 */
export function getThemeIcon(theme: 'far-right' | 'center-right' | 'center-left' | 'far-left'): LucideIcon {
  return contentIconSets.themes[theme]
}
