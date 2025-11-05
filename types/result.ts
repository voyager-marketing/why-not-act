/**
 * Type definitions for personalized results and call-to-action content
 *
 * This module defines the structure of result pages, recommended actions,
 * testimonials, and personalized content blocks based on user journey.
 */

import { PoliticalLens } from './journey'
import { UserJourney } from './userJourney'

/**
 * Result type determines which result page to show
 * Based on political lens and engagement level
 */
export type ResultType = 'revenue' | 'economic' | 'security' | 'demographic'

/**
 * Types of content blocks that can appear on result pages
 * Each block type has different visual and structural properties
 */
export type ContentBlockType =
  | 'hero-stats'
  | 'bullet-list'
  | 'data-visualization'
  | 'testimonial'
  | 'impact-story'
  | 'comparison-table'
  | 'timeline'
  | 'quote'
  | 'video'
  | 'cta-banner'

/**
 * Content block - modular component of result pages
 * Allows flexible composition of result content
 */
export interface ContentBlock {
  /** Unique identifier for this block */
  id: string

  /** Type of content block */
  type: ContentBlockType

  /** Display order (1, 2, 3...) */
  order: number

  /** Block title/heading */
  title?: string

  /** Block subtitle */
  subtitle?: string

  /** Main content - structure varies by type */
  content: ContentBlockData

  /** Visual styling options */
  styling?: {
    backgroundColor?: string
    textColor?: string
    borderColor?: string
    padding?: 'small' | 'medium' | 'large'
    alignment?: 'left' | 'center' | 'right'
  }

  /** Whether this block should be shown based on user journey */
  conditional?: {
    minPersuasionScore?: number
    maxPersuasionScore?: number
    requiredLens?: PoliticalLens[]
    requiredAnswers?: string[]
  }
}

/**
 * Content data - varies by block type
 * Uses discriminated union for type safety
 */
export type ContentBlockData =
  | HeroStatsData
  | BulletListData
  | DataVisualizationData
  | TestimonialData
  | ImpactStoryData
  | ComparisonTableData
  | TimelineData
  | QuoteData
  | VideoData
  | CTABannerData

/**
 * Hero stats - large numbers/statistics
 */
export interface HeroStatsData {
  type: 'hero-stats'
  stats: Array<{
    value: string // "11 million" or "$413B"
    label: string
    description?: string
    icon?: string
  }>
}

/**
 * Bullet list - simple text points
 */
export interface BulletListData {
  type: 'bullet-list'
  items: string[]
  bulletStyle?: 'disc' | 'check' | 'arrow' | 'number'
}

/**
 * Data visualization - charts/graphs
 */
export interface DataVisualizationData {
  type: 'data-visualization'
  visualizationType: 'bar' | 'line' | 'pie' | 'scatter' | 'map'
  dataPoints: Array<{
    label: string
    value: number
    color?: string
  }>
  xAxisLabel?: string
  yAxisLabel?: string
  source?: string
  sourceUrl?: string
}

/**
 * Testimonial data
 */
export interface TestimonialData {
  type: 'testimonial'
  quote: string
  author: string
  authorTitle?: string
  authorImage?: string
  location?: string
}

/**
 * Impact story - narrative with image
 */
export interface ImpactStoryData {
  type: 'impact-story'
  headline: string
  story: string
  imageUrl?: string
  tags?: string[]
}

/**
 * Comparison table - before/after or side-by-side
 */
export interface ComparisonTableData {
  type: 'comparison-table'
  leftColumn: {
    header: string
    items: string[]
  }
  rightColumn: {
    header: string
    items: string[]
  }
}

/**
 * Timeline data
 */
export interface TimelineData {
  type: 'timeline'
  events: Array<{
    date: string
    title: string
    description: string
  }>
}

/**
 * Quote block
 */
export interface QuoteData {
  type: 'quote'
  text: string
  attribution?: string
  emphasis?: 'normal' | 'large' | 'background'
}

/**
 * Video embed
 */
export interface VideoData {
  type: 'video'
  videoUrl: string
  thumbnail?: string
  caption?: string
  duration?: string
}

/**
 * CTA banner
 */
export interface CTABannerData {
  type: 'cta-banner'
  headline: string
  subheadline?: string
  primaryAction: RecommendedAction
  secondaryAction?: RecommendedAction
}

/**
 * Recommended action - what user should do next
 */
export interface RecommendedAction {
  /** Unique identifier */
  id: string

  /** Action type */
  actionType: 'petition' | 'contact-reps' | 'donation' | 'spread-word' | 'subscribe' | 'volunteer' | 'custom'

  /** Display title */
  title: string

  /** Description of the action */
  description: string

  /** Call-to-action button text */
  buttonText: string

  /** Where the action leads */
  actionUrl?: string

  /** Icon to display */
  icon?: string

  /** Priority/order (higher = show first) */
  priority: number

  /** Urgency level affects styling */
  urgency?: 'low' | 'medium' | 'high'

  /** Expected time commitment */
  timeCommitment?: string // "2 minutes" or "10-15 minutes"

  /** Difficulty level */
  difficulty?: 'easy' | 'moderate' | 'involved'

  /** Impact level (helps with prioritization) */
  impact?: 'small' | 'medium' | 'large'

  /** Social proof */
  socialProof?: {
    count?: number // "12,543 people have signed"
    message?: string
  }

  /** Tracking parameters */
  tracking?: {
    category: string
    label: string
    value?: number
  }
}

/**
 * Testimonial from someone who took action
 */
export interface Testimonial {
  /** Unique identifier */
  id: string

  /** The testimonial quote */
  quote: string

  /** Author name */
  author: string

  /** Author's title/role */
  authorTitle?: string

  /** Location */
  location?: string

  /** Profile image URL */
  imageUrl?: string

  /** Which political lens this resonates with */
  resonatesWithLens?: PoliticalLens[]

  /** Credibility score (affects display prominence) */
  credibilityScore?: number
}

/**
 * Complete personalized result
 * Dynamically generated based on user journey
 */
export interface PersonalizedResult {
  /** Which result type this is */
  resultType: ResultType

  /** Political lens being addressed */
  politicalLens: PoliticalLens

  /** Main page title */
  title: string

  /** Main page subtitle/tagline */
  subtitle: string

  /** Hero image or background */
  heroImage?: string

  /** Theme color for this result page */
  themeColor: string

  /** Content blocks to display */
  contentBlocks: ContentBlock[]

  /** Recommended actions */
  recommendedActions: RecommendedAction[]

  /** Testimonials to show */
  testimonials?: Testimonial[]

  /** Personalization metadata */
  personalization: {
    /** User's conviction level */
    convictionLevel: 'skeptic' | 'curious' | 'engaged' | 'champion'

    /** Key messages emphasized based on journey */
    emphasisTopics: string[]

    /** Tone to use in content */
    tone: 'cautious' | 'optimistic' | 'passionate' | 'urgent' | 'analytical'

    /** Whether to show advanced data */
    showAdvancedData: boolean
  }

  /** SEO metadata */
  metadata?: {
    pageTitle: string
    metaDescription: string
    canonicalUrl?: string
  }
}

/**
 * Result page configuration for each result type
 * Used as templates that get personalized
 */
export interface ResultPageConfig {
  resultType: ResultType
  baseTitle: string
  baseSubtitle: string
  themeColor: string
  defaultBlocks: ContentBlock[]
  defaultActions: RecommendedAction[]
  lensVariations: {
    [key in PoliticalLens]?: Partial<ResultPageConfig>
  }
}

/**
 * Helper function to generate personalized result
 * @param journey - User's journey data
 * @param resultType - Type of result to generate
 * @param config - Result page configuration
 * @returns Personalized result object
 */
export function generatePersonalizedResult(
  journey: UserJourney,
  resultType: ResultType,
  config: ResultPageConfig
): PersonalizedResult {
  // Determine conviction level
  const convictionLevel = determineConvictionLevelFromJourney(journey)

  // Determine emphasis topics
  const emphasisTopics = extractEmphasisTopics(journey)

  // Filter blocks based on conditions
  const relevantBlocks = config.defaultBlocks.filter(block => {
    if (!block.conditional) return true

    const { minPersuasionScore, maxPersuasionScore, requiredLens } = block.conditional

    if (minPersuasionScore && journey.scores.persuasionLevel < minPersuasionScore) {
      return false
    }

    if (maxPersuasionScore && journey.scores.persuasionLevel > maxPersuasionScore) {
      return false
    }

    if (requiredLens && !requiredLens.includes(journey.politicalLens)) {
      return false
    }

    return true
  })

  // Sort actions by priority
  const sortedActions = [...config.defaultActions].sort((a, b) => b.priority - a.priority)

  return {
    resultType,
    politicalLens: journey.politicalLens,
    title: config.baseTitle,
    subtitle: config.baseSubtitle,
    themeColor: config.themeColor,
    contentBlocks: relevantBlocks,
    recommendedActions: sortedActions,
    personalization: {
      convictionLevel,
      emphasisTopics,
      tone: journey.personalizationData.resonantTone || 'analytical',
      showAdvancedData: journey.scores.dataAwareness > 60
    },
    metadata: {
      pageTitle: `${config.baseTitle} | WhyNotAct`,
      metaDescription: config.baseSubtitle
    }
  }
}

/**
 * Helper function to determine conviction level from journey
 */
function determineConvictionLevelFromJourney(
  journey: UserJourney
): 'skeptic' | 'curious' | 'engaged' | 'champion' {
  const { persuasionLevel, engagementDepth } = journey.scores

  if (persuasionLevel >= 75 && engagementDepth >= 70) {
    return 'champion'
  } else if (persuasionLevel >= 50) {
    return 'engaged'
  } else if (engagementDepth >= 50) {
    return 'curious'
  } else {
    return 'skeptic'
  }
}

/**
 * Helper function to extract emphasis topics
 */
function extractEmphasisTopics(journey: UserJourney): string[] {
  return journey.personalizationData.topInterests || []
}

/**
 * Backward compatibility - old result page content structure
 * @deprecated Use PersonalizedResult and ResultPageConfig instead
 */
export interface LegacyResultPageContent {
  title: string
  color: string
  bullets: string[]
  ctas: string[]
}
